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
  setDoc,
} from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "./firebase"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { generateCertificateId } from "./certificate-generator"

// Student interface
export interface Student {
  id: string
  uid: string
  fullName: string
  email: string
  phone: string
  enrolledCourses: string[]
  assignedCourses: string[]
  status: string
  createdAt?: any
  updatedAt?: any
}

// Course interface
export interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: string
  price: string
  features: string[]
  category: string
  status: string
  pdfUrls?: string[]
  createdAt?: any
  updatedAt?: any
}

// Enrollment interface
export interface Enrollment {
  id: string
  studentId: string
  courseId: string
  enrolledAt?: Timestamp
  status: string
  progress: number
  approvedForCertificate?: boolean
  certificateId?: string
  certificateApprovedAt?: Timestamp
  certificateApprovedBy?: string
  createdAt?: any
  updatedAt?: any
}

// Create a separate auth instance for admin operations
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBBTMiyPuA1-zKX-2EMSmeo_G8EHgD7kcw",
  authDomain: "procotech-879c2.firebaseapp.com",
  projectId: "procotech-879c2",
  storageBucket: "procotech-879c2.firebasestorage.app",
  messagingSenderId: "895570924369",
  appId: "1:895570924369:web:aeb8c940b4605d3ca47970",
  measurementId: "G-FR9XMP4KYQ",
}

// Create secondary app for student creation
const secondaryApp = initializeApp(firebaseConfig, "secondary")
const secondaryAuth = getAuth(secondaryApp)

// Admin Authentication
export const signInAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    // Check if user is admin
    const adminDoc = await getDoc(doc(db, "admins", userCredential.user.uid))
    if (!adminDoc.exists()) {
      throw new Error("Access denied. Admin privileges required.")
    }

    return userCredential.user
  } catch (error) {
    throw error
  }
}

// Course Management
export const getCourses = async (): Promise<Course[]> => {
  const coursesRef = collection(db, "courses")
  const q = query(coursesRef, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Course))
}

export const addCourse = async (courseData: any) => {
  const coursesRef = collection(db, "courses")
  return await addDoc(coursesRef, {
    ...courseData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
}

export const updateCourse = async (courseId: string, courseData: any) => {
  const courseRef = doc(db, "courses", courseId)
  return await updateDoc(courseRef, {
    ...courseData,
    updatedAt: Timestamp.now(),
  })
}

export const deleteCourse = async (courseId: string) => {
  const courseRef = doc(db, "courses", courseId)
  return await deleteDoc(courseRef)
}

// PDF Management Functions
export const uploadCoursePDF = async (courseId: string, file: File) => {
  try {
    const storage = getStorage()
    const storageRef = ref(storage, `courses/${courseId}/pdfs/${file.name}`)

    // Upload file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)

    // Get current course data
    const courseRef = doc(db, "courses", courseId)
    const courseDoc = await getDoc(courseRef)

    if (!courseDoc.exists()) {
      throw new Error("Course not found")
    }

    const courseData = courseDoc.data()
    const currentPdfs = courseData?.pdfUrls || []

    // Update course with new PDF URL
    await updateDoc(courseRef, {
      pdfUrls: [...currentPdfs, downloadURL],
      updatedAt: Timestamp.now(),
    })

    return downloadURL
  } catch (error) {
    console.error("Error uploading PDF:", error)
    throw new Error("Failed to upload PDF")
  }
}

export const removeCoursePDF = async (courseId: string, pdfUrl: string) => {
  try {
    const storage = getStorage()

    // Extract file path from URL
    const url = new URL(pdfUrl)
    const filePath = decodeURIComponent(url.pathname.split('/').slice(-2).join('/'))

    // Delete from Storage
    const storageRef = ref(storage, filePath)
    await deleteObject(storageRef)

    // Remove from course document
    const courseRef = doc(db, "courses", courseId)
    const courseDoc = await getDoc(courseRef)

    if (!courseDoc.exists()) {
      throw new Error("Course not found")
    }

    const courseData = courseDoc.data()
    const currentPdfs = courseData?.pdfUrls || []
    const updatedPdfs = currentPdfs.filter((url: string) => url !== pdfUrl)

    await updateDoc(courseRef, {
      pdfUrls: updatedPdfs,
      updatedAt: Timestamp.now(),
    })

    return true
  } catch (error) {
    console.error("Error removing PDF:", error)
    throw new Error("Failed to remove PDF")
  }
}

// Portfolio Management
export const getPortfolioItems = async () => {
  const portfolioRef = collection(db, "portfolio")
  const q = query(portfolioRef, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const addPortfolioItem = async (portfolioData: any) => {
  const portfolioRef = collection(db, "portfolio")
  return await addDoc(portfolioRef, {
    ...portfolioData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
}

export const updatePortfolioItem = async (portfolioId: string, portfolioData: any) => {
  const portfolioRef = doc(db, "portfolio", portfolioId)
  return await updateDoc(portfolioRef, {
    ...portfolioData,
    updatedAt: Timestamp.now(),
  })
}

export const deletePortfolioItem = async (portfolioId: string) => {
  const portfolioRef = doc(db, "portfolio", portfolioId)
  return await deleteDoc(portfolioRef)
}

// Student Management
export const getStudents = async (): Promise<Student[]> => {
  const studentsRef = collection(db, "students")
  const q = query(studentsRef, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Student))
}

// Validation helper functions
export const validateStudentData = (studentData: any) => {
  const errors: string[] = []

  if (!studentData.fullName || studentData.fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters long")
  }

  if (!studentData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentData.email)) {
    errors.push("Valid email address is required")
  }

  if (!studentData.phone || studentData.phone.trim().length < 10) {
    errors.push("Valid phone number is required")
  }

  if (!studentData.password || studentData.password.length < 6) {
    errors.push("Password must be at least 6 characters long")
  }

  if (studentData.assignedCourses && studentData.assignedCourses.length > 50) {
    errors.push("Cannot assign more than 50 courses to a student")
  }

  return errors
}

// Fixed createStudent function - uses secondary auth to prevent admin logout
export const createStudent = async (studentData: any) => {
  try {
    // Validate student data
    const validationErrors = validateStudentData(studentData)
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(", ")}`)
    }

    // Check if student with this email already exists
    const studentsRef = collection(db, "students")
    const emailQuery = query(studentsRef, where("email", "==", studentData.email))
    const existingStudents = await getDocs(emailQuery)

    if (!existingStudents.empty) {
      throw new Error("A student with this email already exists")
    }

    // Create user account using secondary auth instance
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, studentData.email, studentData.password)

    // Get courses to assign (either all active courses or selected ones)
    let coursesToAssign: string[] = []

    if (studentData.autoAssignCourses) {
      // Auto-assign all active courses
      const activeCourses = await getActiveCourses()
      coursesToAssign = activeCourses.map(course => course.id)
    } else if (studentData.assignedCourses && studentData.assignedCourses.length > 0) {
      // Use manually selected courses
      coursesToAssign = studentData.assignedCourses
    }

    // Validate course assignments if any
    if (coursesToAssign.length > 0) {
      await validateCourseAssignment(coursesToAssign)
    }

    // Add student data to Firestore with the user's UID as document ID
    const studentRef = doc(db, "students", userCredential.user.uid)
    await setDoc(studentRef, {
      uid: userCredential.user.uid,
      fullName: studentData.fullName.trim(),
      email: studentData.email.toLowerCase(),
      phone: studentData.phone.trim(),
      enrolledCourses: coursesToAssign,
      assignedCourses: coursesToAssign, // Store assigned courses for reference
      status: studentData.status || "active",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    // Create enrollment records for assigned courses using helper function
    if (coursesToAssign.length > 0) {
      await assignCoursesToStudent(userCredential.user.uid, coursesToAssign)
    }

    // Sign out from secondary auth to prevent any issues
    await signOut(secondaryAuth)

    return userCredential.user
  } catch (error) {
    // Make sure to sign out from secondary auth in case of error
    try {
      await signOut(secondaryAuth)
    } catch (signOutError) {
      console.error("Error signing out from secondary auth:", signOutError)
    }

    // Re-throw with more specific error messages
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to create student account")
  }
}

export const updateStudent = async (studentId: string, studentData: any) => {
  const studentRef = doc(db, "students", studentId)
  return await updateDoc(studentRef, {
    ...studentData,
    updatedAt: Timestamp.now(),
  })
}

export const deleteStudent = async (studentId: string) => {
  const studentRef = doc(db, "students", studentId)
  return await deleteDoc(studentRef)
}

// Course Assignment Helper Functions
export const getActiveCourses = async () => {
  const coursesRef = collection(db, "courses")
  const q = query(coursesRef, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((course: any) => course.status === "active")
}

export const validateCourseAssignment = async (courseIds: string[]) => {
  if (!courseIds || courseIds.length === 0) {
    throw new Error("No courses selected for assignment")
  }

  if (courseIds.length > 50) {
    throw new Error("Cannot assign more than 50 courses at once")
  }

  // Check for duplicate course IDs
  const uniqueIds = [...new Set(courseIds)]
  if (uniqueIds.length !== courseIds.length) {
    throw new Error("Duplicate course IDs found in assignment list")
  }

  // Validate each course exists and is active
  const coursesRef = collection(db, "courses")
  const validationPromises = courseIds.map(async (courseId) => {
    const courseDoc = await getDoc(doc(coursesRef, courseId))
    if (!courseDoc.exists()) {
      throw new Error(`Course with ID ${courseId} does not exist`)
    }
    const courseData = courseDoc.data()
    if (courseData?.status !== "active") {
      throw new Error(`Course "${courseData?.title || courseId}" is not active and cannot be assigned`)
    }
    return courseDoc
  })

  await Promise.all(validationPromises)
  return true
}

export const assignCoursesToStudent = async (studentId: string, courseIds: string[]) => {
  try {
    // Validate course assignment
    await validateCourseAssignment(courseIds)

    // Check if student exists and is active
    const studentRef = doc(db, "students", studentId)
    const studentDoc = await getDoc(studentRef)
    if (!studentDoc.exists()) {
      throw new Error("Student not found")
    }

    const studentData = studentDoc.data()
    if (studentData?.status !== "active") {
      throw new Error("Cannot assign courses to inactive student")
    }

    // Create enrollment records for each course
    const enrollmentPromises = courseIds.map(courseId =>
      addDoc(collection(db, "enrollments"), {
        studentId,
        courseId,
        enrolledAt: Timestamp.now(),
        status: "active",
        progress: 0,
      })
    )

    await Promise.all(enrollmentPromises)

    // Update student's enrolled courses list
    const currentEnrolledCourses = studentData.enrolledCourses || []
    const updatedEnrolledCourses = [...new Set([...currentEnrolledCourses, ...courseIds])]

    await updateDoc(studentRef, {
      enrolledCourses: updatedEnrolledCourses,
      updatedAt: Timestamp.now(),
    })

    return {
      success: true,
      assignedCourses: courseIds.length,
      message: `Successfully assigned ${courseIds.length} course(s) to student`
    }
  } catch (error) {
    console.error("Error assigning courses to student:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to assign courses to student")
  }
}

// Enrollment Management
export const getEnrollments = async (): Promise<Enrollment[]> => {
  const enrollmentsRef = collection(db, "enrollments")
  const q = query(enrollmentsRef, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Enrollment))
}

// Certificate Approval Management
export const approveStudentCertificate = async (studentId: string, courseId: string) => {
  try {
    // Find the enrollment record for this student and course
    const enrollmentsRef = collection(db, "enrollments")
    const q = query(
      enrollmentsRef,
      where("studentId", "==", studentId),
      where("courseId", "==", courseId)
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      throw new Error("Enrollment record not found")
    }

    // Update the enrollment record to mark certificate as approved
    const enrollmentDoc = snapshot.docs[0]
    const certificateId = generateCertificateId() // Generate unique certificate ID

    await updateDoc(enrollmentDoc.ref, {
      approvedForCertificate: true,
      certificateId: certificateId,
      certificateApprovedAt: Timestamp.now(),
      certificateApprovedBy: "admin", // You might want to track which admin approved it
      updatedAt: Timestamp.now(),
    })

    return {
      success: true,
      message: "Certificate approved successfully"
    }
  } catch (error) {
    console.error("Error approving certificate:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to approve certificate")
  }
}

export const revokeStudentCertificate = async (studentId: string, courseId: string) => {
  try {
    // Find the enrollment record for this student and course
    const enrollmentsRef = collection(db, "enrollments")
    const q = query(
      enrollmentsRef,
      where("studentId", "==", studentId),
      where("courseId", "==", courseId)
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      throw new Error("Enrollment record not found")
    }

    // Update the enrollment record to revoke certificate approval
    const enrollmentDoc = snapshot.docs[0]
    await updateDoc(enrollmentDoc.ref, {
      approvedForCertificate: false,
      certificateId: null,
      certificateApprovedAt: null,
      certificateApprovedBy: null,
      updatedAt: Timestamp.now(),
    })

    return {
      success: true,
      message: "Certificate approval revoked"
    }
  } catch (error) {
    console.error("Error revoking certificate approval:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to revoke certificate approval")
  }
}

export const getStudentEnrollmentsWithApproval = async (studentId: string) => {
  try {
    const enrollmentsRef = collection(db, "enrollments")
    const q = query(
      enrollmentsRef,
      where("studentId", "==", studentId),
      orderBy("enrolledAt", "desc")
    )
    const snapshot = await getDocs(q)

    const enrollments = await Promise.all(
      snapshot.docs.map(async (enrollmentDoc) => {
        const enrollmentData = enrollmentDoc.data()

        // Get course details
        const courseRef = doc(db, "courses", enrollmentData.courseId)
        const courseDoc = await getDoc(courseRef)
        const courseData = courseDoc.exists() ? { id: courseDoc.id, ...(courseDoc.data() || {}) } : null

        return {
          id: enrollmentDoc.id,
          ...enrollmentData,
          course: courseData,
        }
      })
    )

    return enrollments
  } catch (error) {
    console.error("Error fetching student enrollments:", error)
    throw new Error("Failed to fetch student enrollments")
  }
}

export const enrollStudent = async (studentId: string, courseId: string) => {
  const enrollmentsRef = collection(db, "enrollments")
  return await addDoc(enrollmentsRef, {
    studentId,
    courseId,
    enrolledAt: Timestamp.now(),
    status: "active",
    progress: 0,
  })
}

// Fee Management
export const updateStudentFee = async (studentId: string, feeData: {
  courseFee: number
  feeSubmitted: number
  feeRemaining: number
}) => {
  const studentRef = doc(db, "students", studentId)
  return await updateDoc(studentRef, {
    ...feeData,
    updatedAt: Timestamp.now(),
  })
}
