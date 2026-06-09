import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  onSnapshot,
  limit,
} from "firebase/firestore"
import { db } from "./firebase"

// Homepage Lead interface
export interface HomepageLead {
  id?: string
  leadType: "Student" | "Business" | "Job Seeker" | "Other"
  name: string
  mobile: string
  interest: string
  source: string
  status: string
  createdAt?: any
  updatedAt?: any
  // Optional metadata
  email?: string
  city?: string
  userAgent?: string
  referrer?: string
  // For Job Seeker flow
  jobInterest?: string
}

// Student course options
export const STUDENT_COURSES = [
  "ADCA",
  "DCA",
  "CCC",
  "O Level",
  "Full Stack Development",
  "Digital Marketing",
  "Graphic Designing",
  "Internship Program",
  "MS Office",
  "Other",
]

// Business service options
export const BUSINESS_SERVICES = [
  "Website Development",
  "E-Commerce Website",
  "CRM Development",
  "Mobile App Development",
  "Software Development",
  "SEO Services",
  "Google Ads",
  "Meta Ads",
  "Digital Marketing",
  "Social Media Marketing",
  "Other",
]

// Job Seeker options
export const JOB_SEEKER_OPTIONS = [
  "Internship",
  "Freelance Work",
  "Training",
  "Placement Assistance",
]

// User role options for step 1
export const USER_ROLES = [
  "Student",
  "Business Owner",
  "Job Seeker",
  "Other",
] as const

export type UserRole = (typeof USER_ROLES)[number]

// Save homepage lead to Firestore
export const saveHomepageLead = async (leadData: Omit<HomepageLead, "id" | "createdAt" | "updatedAt">) => {
  try {
    const leadsRef = collection(db, "homepage_leads")
    const docRef = await addDoc(leadsRef, {
      ...leadData,
      source: "Homepage Popup",
      status: leadData.status || "New Inquiry",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    })
    return { id: docRef.id, ...leadData }
  } catch (error) {
    console.error("Error saving homepage lead:", error)
    throw error
  }
}

// Get all homepage leads
export const getHomepageLeads = async (): Promise<HomepageLead[]> => {
  try {
    const leadsRef = collection(db, "homepage_leads")
    const q = query(leadsRef, orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as HomepageLead))
  } catch (error) {
    console.error("Error fetching homepage leads:", error)
    return []
  }
}

// Real-time subscription to homepage leads
export const subscribeHomepageLeads = (callback: (leads: HomepageLead[]) => void) => {
  const leadsRef = collection(db, "homepage_leads")
  const q = query(leadsRef, orderBy("createdAt", "desc"))
  return onSnapshot(
    q,
    (snapshot) => {
      const leads = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as HomepageLead))
      callback(leads)
    },
    (error) => {
      console.error("Error in homepage leads subscription:", error)
      callback([])
    }
  )
}

// Get homepage leads by type
export const getHomepageLeadsByType = async (leadType: string): Promise<HomepageLead[]> => {
  try {
    const leadsRef = collection(db, "homepage_leads")
    const q = query(
      leadsRef,
      where("leadType", "==", leadType),
      orderBy("createdAt", "desc")
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as HomepageLead))
  } catch (error) {
    console.error("Error fetching leads by type:", error)
    return []
  }
}

// Update lead status
export const updateHomepageLeadStatus = async (id: string, status: string) => {
  try {
    const leadRef = doc(db, "homepage_leads", id)
    await updateDoc(leadRef, {
      status,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error("Error updating lead status:", error)
    throw error
  }
}

// Delete homepage lead
export const deleteHomepageLead = async (id: string) => {
  try {
    const leadRef = doc(db, "homepage_leads", id)
    await deleteDoc(leadRef)
    return true
  } catch (error) {
    console.error("Error deleting homepage lead:", error)
    throw error
  }
}

// Get homepage lead statistics
export const getHomepageLeadStats = async () => {
  try {
    const leads = await getHomepageLeads()
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const sevenDaysAgo = new Date(today)
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // Student leads today
    const studentLeadsToday = leads.filter((l) => {
      const createdAt = l.createdAt?.toDate ? l.createdAt.toDate() : new Date(l.createdAt)
      return l.leadType === "Student" && createdAt >= today
    }).length

    // Business leads today
    const businessLeadsToday = leads.filter((l) => {
      const createdAt = l.createdAt?.toDate ? l.createdAt.toDate() : new Date(l.createdAt)
      return l.leadType === "Business" && createdAt >= today
    }).length

    // Total leads
    const totalLeads = leads.length

    // Today's leads
    const todaysLeads = leads.filter((l) => {
      const createdAt = l.createdAt?.toDate ? l.createdAt.toDate() : new Date(l.createdAt)
      return createdAt >= today
    }).length

    // Most requested courses
    const courseCount: Record<string, number> = {}
    leads
      .filter((l) => l.leadType === "Student")
      .forEach((l) => {
        const interest = l.interest || "Unknown"
        courseCount[interest] = (courseCount[interest] || 0) + 1
      })
    const mostRequestedCourses = Object.entries(courseCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    // Most requested services
    const serviceCount: Record<string, number> = {}
    leads
      .filter((l) => l.leadType === "Business")
      .forEach((l) => {
        const interest = l.interest || "Unknown"
        serviceCount[interest] = (serviceCount[interest] || 0) + 1
      })
    const mostRequestedServices = Object.entries(serviceCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    // Last 7 days leads
    const last7Days = leads.filter((l) => {
      const createdAt = l.createdAt?.toDate ? l.createdAt.toDate() : new Date(l.createdAt)
      return createdAt >= sevenDaysAgo
    }).length

    // Conversion rate (leads with status changed from "New Inquiry")
    const convertedLeads = leads.filter((l) => l.status !== "New Inquiry").length
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0

    return {
      totalLeads,
      todaysLeads,
      studentLeadsToday,
      businessLeadsToday,
      mostRequestedCourses,
      mostRequestedServices,
      last7Days,
      conversionRate: Math.round(conversionRate * 10) / 10,
    }
  } catch (error) {
    console.error("Error getting homepage lead stats:", error)
    return {
      totalLeads: 0,
      todaysLeads: 0,
      studentLeadsToday: 0,
      businessLeadsToday: 0,
      mostRequestedCourses: [],
      mostRequestedServices: [],
      last7Days: 0,
      conversionRate: 0,
    }
  }
}
