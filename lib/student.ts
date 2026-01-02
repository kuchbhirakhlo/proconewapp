// Toggle this to `true` if you want to auto-provision missing student docs
const AUTO_CREATE_STUDENT_DOC = true

import { collection, doc, getDocs, getDoc, query, where, orderBy, setDoc, addDoc, updateDoc, Timestamp } from "firebase/firestore"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "./firebase"

interface StudentData {
  id: string
  uid: string
  fullName: string
  email: string
  phone: string
  enrolledCourses: string[]
  assignedCourses?: string[]
  status: string
  createdAt: any
  updatedAt: any
}

interface EnrollmentData {
  id: string
  studentId: string
  courseId: string
  enrolledAt: any
  status: string
  progress: number
  approvedForCertificate?: boolean
  certificateApprovedAt?: any
  certificateId?: string
}

// Student Authentication
export const signInStudent = async (email: string, password: string) => {
  try {
    // 1. Sign in through Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const uid = userCredential.user.uid

    // 2. Try to load the matching student document
    const studentDocRef = doc(db, "students", uid)
    const studentSnap = await getDoc(studentDocRef)

    if (!studentSnap.exists()) {
      if (AUTO_CREATE_STUDENT_DOC) {
        // Auto-create a bare-bones student document so the user can continue.
        await setDoc(studentDocRef, {
          uid,
          fullName: userCredential.user.displayName ?? "Unnamed Student",
          email: userCredential.user.email,
          phone: "",
          enrolledCourses: [],
          assignedCourses: [],
          status: "active",
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        })
        console.info("[student] auto-created Firestore doc for", email)
      } else {
        // Hard stop – doc missing and auto-create disabled.
        await signOut(auth)
        throw new Error("Student account is not yet provisioned. Please contact the administration.")
      }
    }

    // 3. (Re)load the doc so we have fresh data
    const finalSnap = await getDoc(studentDocRef)
    const data = finalSnap.data()

    // 4. Basic status check
    if (data?.status !== "active") {
      await signOut(auth)
      throw new Error("Your account is currently inactive. Please contact the administration.")
    }

    return {
      user: userCredential.user,
      studentData: { id: finalSnap.id, ...data } as StudentData,
    }
  } catch (error: any) {
    // Map Firebase auth errors to nicer copy
    switch (error.code) {
      case "auth/user-not-found":
        throw new Error("No student account exists with that email.")
      case "auth/wrong-password":
        throw new Error("Incorrect password. Please try again.")
      case "auth/invalid-email":
        throw new Error("Invalid email format.")
      case "auth/too-many-requests":
        throw new Error("Too many attempts. Try again later.")
      default:
        throw error
    }
  }
}

// Get student data
export const getStudentData = async (uid: string): Promise<StudentData> => {
  try {
    const studentDoc = await getDoc(doc(db, "students", uid))
    if (!studentDoc.exists()) {
      throw new Error("Student data not found")
    }
    return { id: studentDoc.id, ...studentDoc.data() } as StudentData
  } catch (error) {
    throw error
  }
}

// Get student enrollments
export const getStudentEnrollments = async (studentId: string): Promise<EnrollmentData[]> => {
  try {
    const enrollmentsRef = collection(db, "enrollments")
    const q = query(enrollmentsRef, where("studentId", "==", studentId), orderBy("enrolledAt", "desc"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as EnrollmentData))
  } catch (error) {
    console.error("Error fetching enrollments:", error)
    return []
  }
}

// Get enrolled courses details
export const getEnrolledCourses = async (studentId: string) => {
  try {
    const enrollments = await getStudentEnrollments(studentId)
    const coursePromises = enrollments.map(async (enrollment) => {
      try {
        const courseDoc = await getDoc(doc(db, "courses", enrollment.courseId))
        return {
          ...enrollment,
          course: courseDoc.exists() ? { id: courseDoc.id, ...courseDoc.data() } : null,
        }
      } catch (error) {
        console.error("Error fetching course:", error)
        return {
          ...enrollment,
          course: null,
        }
      }
    })
    return await Promise.all(coursePromises)
  } catch (error) {
    console.error("Error fetching enrolled courses:", error)
    return []
  }
}

// Sign out student
export const signOutStudent = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

// Enroll student in a course
export const enrollInCourse = async (studentId: string, courseId: string) => {
  try {
    const enrollmentsRef = collection(db, "enrollments")
    const enrollmentDoc = await addDoc(enrollmentsRef, {
      studentId,
      courseId,
      enrolledAt: Timestamp.now(),
      status: "active",
      progress: 0,
    })

    // Update student's enrolled courses list
    const studentRef = doc(db, "students", studentId)
    const studentDoc = await getDoc(studentRef)
    if (studentDoc.exists()) {
      const studentData = studentDoc.data()
      const currentEnrolledCourses = studentData.enrolledCourses || []
      const updatedEnrolledCourses = [...new Set([...currentEnrolledCourses, courseId])]

      await updateDoc(studentRef, {
        enrolledCourses: updatedEnrolledCourses,
        updatedAt: Timestamp.now(),
      })
    }

    return enrollmentDoc
  } catch (error) {
    console.error("Error enrolling in course:", error)
    throw error
  }
}

// Get enrolled courses with certificate approval status
export const getEnrolledCoursesWithApproval = async (studentId: string) => {
  try {
    console.log("Fetching enrollments for student:", studentId)
    const enrollments = await getStudentEnrollments(studentId)
    console.log("Found enrollments:", enrollments.length)

    if (!enrollments || enrollments.length === 0) {
      return []
    }

    const coursePromises = enrollments.map(async (enrollment) => {
      try {
        const courseDoc = await getDoc(doc(db, "courses", enrollment.courseId))
        const courseData = courseDoc.exists() ? { id: courseDoc.id, ...courseDoc.data() } : null

        return {
          id: enrollment.id,
          studentId: enrollment.studentId,
          courseId: enrollment.courseId,
          enrolledAt: enrollment.enrolledAt,
          status: enrollment.status,
          progress: enrollment.progress,
          approvedForCertificate: enrollment.approvedForCertificate || false,
          certificateApprovedAt: enrollment.certificateApprovedAt,
          certificateId: enrollment.certificateId,
          course: courseData,
        }
      } catch (error) {
        console.error("Error fetching course:", error)
        return {
          id: enrollment.id,
          studentId: enrollment.studentId,
          courseId: enrollment.courseId,
          enrolledAt: enrollment.enrolledAt,
          status: enrollment.status,
          progress: enrollment.progress,
          approvedForCertificate: false,
          certificateId: undefined,
          course: null,
        }
      }
    })

    const result = await Promise.all(coursePromises)
    console.log("Returning enrollments with courses:", result.length)
    return result
  } catch (error) {
    console.error("Error fetching enrolled courses with approval:", error)
    throw new Error("Failed to fetch student enrollments")
  }
}

// Check if current user is a student
export const checkStudentStatus = async (uid: string) => {
  try {
    const studentDoc = await getDoc(doc(db, "students", uid))
    return studentDoc.exists() && studentDoc.data()?.status === "active"
  } catch (error) {
    console.error("Error checking student status:", error)
    return false
  }
}
