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
import { db, storage } from "./firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

// Lead interface
export interface Lead {
  id: string
  leadId: string
  name: string
  mobile: string
  whatsapp: string
  email: string
  company: string
  city: string
  state: string
  service: string
  source: string
  status: string
  budget: string
  followUpDate: string
  assignedTo: string
  remarks: string
  createdAt?: any
  updatedAt?: any
}

// Follow-up interface
export interface LeadFollowUp {
  id: string
  leadId: string
  followUpDate: string
  followUpTime: string
  notes: string
  status: string
  createdAt?: any
}

// Activity interface
export interface LeadActivity {
  id: string
  leadId: string
  activityType: string
  description: string
  createdAt?: any
}

// Lead attachment interface
export interface LeadAttachment {
  id: string
  leadId: string
  fileName: string
  fileUrl: string
  fileType: string
  uploadedAt?: any
}

// Dropdown options
export const SERVICE_OPTIONS = [
  "Website Development",
  "E-Commerce Website",
  "CRM Development",
  "Software Development",
  "Mobile App Development",
  "Digital Marketing",
  "SEO Services",
  "Google Ads",
  "Meta Ads",
  "Social Media Marketing",
  "Graphic Designing",
  "Other",
]

export const SOURCE_OPTIONS = [
  "Website Inquiry",
  "Google Ads",
  "Facebook Ads",
  "Instagram",
  "WhatsApp",
  "Referral",
  "Walk-In",
  "Cold Calling",
  "Other",
]

export const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Interested",
  "Quotation Sent",
  "Won",
  "Lost",
]

export const FOLLOW_UP_STATUS_OPTIONS = [
  "Pending",
  "Completed",
  "Missed",
  "Rescheduled",
]

// Generate unique lead ID
export const generateLeadId = async (): Promise<string> => {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  const leadsRef = collection(db, "leads")
  const q = query(leadsRef, orderBy("createdAt", "desc"), limit(1))
  const snapshot = await getDocs(q)
  
  let counter = 1
  if (!snapshot.empty) {
    const lastLead = snapshot.docs[0].data() as Lead
    const lastLeadId = lastLead.leadId
    const match = lastLeadId.match(/LEAD-(\d{4})(\d{2})-(\d+)/)
    if (match) {
      const lastYear = match[1]
      const lastMonth = match[2]
      const lastCounter = parseInt(match[3])
      if (lastYear === year.toString() && lastMonth === month) {
        counter = lastCounter + 1
      }
    }
  }
  
  return `LEAD-${year}${month}-${String(counter).padStart(4, '0')}`
}

// Lead CRUD Operations
export const getLeads = async (): Promise<Lead[]> => {
  const leadsRef = collection(db, "leads")
  const q = query(leadsRef, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Lead))
}

export const getLeadsRealTime = (callback: (leads: Lead[]) => void) => {
  const leadsRef = collection(db, "leads")
  const q = query(leadsRef, orderBy("createdAt", "desc"))
  return onSnapshot(q, (snapshot) => {
    const leads = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Lead))
    callback(leads)
  })
}

export const getLeadById = async (leadId: string): Promise<Lead | null> => {
  const leadsRef = collection(db, "leads")
  const q = query(leadsRef, where("leadId", "==", leadId))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as Lead
}

export const addLead = async (leadData: Omit<Lead, 'id' | 'leadId' | 'createdAt' | 'updatedAt'>) => {
  const leadId = await generateLeadId()
  const leadsRef = collection(db, "leads")
  const docRef = await addDoc(leadsRef, {
    ...leadData,
    leadId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })

  // Add activity log
  await addLeadActivity(docRef.id, "created", "Lead created")
  
  return { id: docRef.id, leadId }
}

export const updateLead = async (leadId: string, leadData: Partial<Lead>) => {
  const leadRef = doc(db, "leads", leadId)
  await updateDoc(leadRef, {
    ...leadData,
    updatedAt: Timestamp.now(),
  })
}

export const deleteLead = async (leadId: string) => {
  const leadRef = doc(db, "leads", leadId)
  await deleteDoc(leadRef)
}

// Lead Follow-up Operations
export const getLeadFollowUps = async (leadId: string): Promise<LeadFollowUp[]> => {
  const followUpsRef = collection(db, "lead_followups")
  const q = query(followUpsRef, where("leadId", "==", leadId), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LeadFollowUp))
}

export const getAllFollowUps = async (): Promise<LeadFollowUp[]> => {
  const followUpsRef = collection(db, "lead_followups")
  const q = query(followUpsRef, orderBy("followUpDate", "asc"), orderBy("followUpTime", "asc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LeadFollowUp))
}

export const addLeadFollowUp = async (followUpData: Omit<LeadFollowUp, 'id' | 'createdAt'>) => {
  const followUpsRef = collection(db, "lead_followups")
  const docRef = await addDoc(followUpsRef, {
    ...followUpData,
    createdAt: Timestamp.now(),
  })

  // Add activity log
  await addLeadActivity(followUpData.leadId, "follow_up_added", "Follow-up added")
  
  return docRef.id
}

export const updateLeadFollowUp = async (followUpId: string, followUpData: Partial<LeadFollowUp>) => {
  const followUpRef = doc(db, "lead_followups", followUpId)
  await updateDoc(followUpRef, followUpData)
}

export const deleteLeadFollowUp = async (followUpId: string) => {
  const followUpRef = doc(db, "lead_followups", followUpId)
  await deleteDoc(followUpRef)
}

// Lead Activity Operations
export const addLeadActivity = async (leadId: string, activityType: string, description: string) => {
  const activitiesRef = collection(db, "lead_activities")
  await addDoc(activitiesRef, {
    leadId,
    activityType,
    description,
    createdAt: Timestamp.now(),
  })
}

export const getLeadActivities = async (leadId: string): Promise<LeadActivity[]> => {
  const activitiesRef = collection(db, "lead_activities")
  const q = query(activitiesRef, where("leadId", "==", leadId), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LeadActivity))
}

// Lead Attachment Operations
export const uploadLeadAttachment = async (leadId: string, file: File) => {
  try {
    const storageRef = ref(storage, `lead-attachments/${leadId}/${Date.now()}-${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)

    const attachmentsRef = collection(db, "lead_attachments")
    await addDoc(attachmentsRef, {
      leadId,
      fileName: file.name,
      fileUrl: downloadURL,
      fileType: file.type,
      uploadedAt: Timestamp.now(),
    })

    return downloadURL
  } catch (error) {
    console.error("Error uploading attachment:", error)
    throw new Error("Failed to upload attachment")
  }
}

export const getLeadAttachments = async (leadId: string): Promise<LeadAttachment[]> => {
  const attachmentsRef = collection(db, "lead_attachments")
  const q = query(attachmentsRef, where("leadId", "==", leadId), orderBy("uploadedAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LeadAttachment))
}

export const deleteLeadAttachment = async (attachmentId: string, fileUrl: string) => {
  try {
    const attachmentsRef = collection(db, "lead_attachments")
    const q = query(attachmentsRef, where("fileUrl", "==", fileUrl))
    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref
      await deleteDoc(docRef)
    }

    const url = new URL(fileUrl)
    const filePath = decodeURIComponent(url.pathname.split('/').slice(-2).join('/'))
    const storageRef = ref(storage, filePath)
    await deleteObject(storageRef)

    return true
  } catch (error) {
    console.error("Error deleting attachment:", error)
    throw new Error("Failed to delete attachment")
  }
}

// Get leads by status
export const getLeadsByStatus = async (status: string): Promise<Lead[]> => {
  const leadsRef = collection(db, "leads")
  const q = query(leadsRef, where("status", "==", status), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Lead))
}

// Get today's follow-ups
export const getTodaysFollowUps = async (): Promise<LeadFollowUp[]> => {
  const today = new Date().toISOString().split('T')[0]
  const followUpsRef = collection(db, "lead_followups")
  const q = query(
    followUpsRef, 
    where("followUpDate", "==", today),
    where("status", "==", "Pending"),
    orderBy("followUpTime", "asc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LeadFollowUp))
}

// Get overdue follow-ups
export const getOverdueFollowUps = async (): Promise<LeadFollowUp[]> => {
  const today = new Date().toISOString().split('T')[0]
  const followUpsRef = collection(db, "lead_followups")
  const q = query(
    followUpsRef, 
    where("followUpDate", "<", today),
    where("status", "==", "Pending"),
    orderBy("followUpDate", "asc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LeadFollowUp))
}

// Convert contact inquiry to lead
export const convertInquiryToLead = async (inquiryId: string, inquiryData: any) => {
  // Create lead from inquiry
  const leadData = {
    name: inquiryData.name || `${inquiryData.firstName || ''} ${inquiryData.lastName || ''}`.trim(),
    mobile: inquiryData.phone || inquiryData.mobile || '',
    whatsapp: inquiryData.phone || inquiryData.whatsapp || '',
    email: inquiryData.email || '',
    company: inquiryData.company || '',
    city: inquiryData.city || '',
    state: inquiryData.state || '',
    service: inquiryData.course || inquiryData.service || 'Other',
    source: 'Website Inquiry',
    status: 'New',
    budget: '',
    followUpDate: '',
    assignedTo: '',
    remarks: inquiryData.message || '',
  }

  const { id } = await addLead(leadData)

  // Mark inquiry as converted
  const inquiryRef = doc(db, "contact_inquiries", inquiryId)
  await updateDoc(inquiryRef, { 
    status: "converted",
    convertedToLeadId: id,
    updatedAt: Timestamp.now()
  })

  return id
}

// Statistics
export const getLeadStats = async () => {
  const leads = await getLeads()
  
  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === 'New').length,
    contactedLeads: leads.filter(l => l.status === 'Contacted').length,
    interestedLeads: leads.filter(l => l.status === 'Interested').length,
    quotationSentLeads: leads.filter(l => l.status === 'Quotation Sent').length,
    wonLeads: leads.filter(l => l.status === 'Won').length,
    lostLeads: leads.filter(l => l.status === 'Lost').length,
    todaysFollowUps: (await getTodaysFollowUps()).length,
  }

  return stats
}