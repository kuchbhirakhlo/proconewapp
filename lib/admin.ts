import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  setDoc,
} from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "./firebase"

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
export const getCourses = async () => {
  const coursesRef = collection(db, "courses")
  const q = query(coursesRef, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
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
export const getStudents = async () => {
  const studentsRef = collection(db, "students")
  const q = query(studentsRef, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// Fixed createStudent function - uses secondary auth to prevent admin logout
export const createStudent = async (studentData: any) => {
  try {
    // Create user account using secondary auth instance
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, studentData.email, studentData.password)

    // Add student data to Firestore with the user's UID as document ID
    const studentRef = doc(db, "students", userCredential.user.uid)
    await setDoc(studentRef, {
      uid: userCredential.user.uid,
      fullName: studentData.fullName,
      email: studentData.email,
      phone: studentData.phone,
      enrolledCourses: [],
      status: "active",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

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
    throw error
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

// Enrollment Management
export const getEnrollments = async () => {
  const enrollmentsRef = collection(db, "enrollments")
  const q = query(enrollmentsRef, orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
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
