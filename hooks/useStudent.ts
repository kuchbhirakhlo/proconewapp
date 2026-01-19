"use client"

import { useState, useEffect } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface StudentData {
  id: string
  uid: string
  fullName: string
  email: string
  phone: string
  profilePicture?: string
  aadharNumber?: string
  dateOfBirth?: string
  enrolledCourses: string[]
  assignedCourses?: string[]
  status: string
  createdAt: any
  updatedAt: any
}

export function useStudent() {
  const [user, setUser] = useState<User | null>(null)
  const [studentData, setStudentData] = useState<StudentData | null>(null)
  const [isStudent, setIsStudent] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true)
      setError(null)

      try {
        if (user) {
          // Check if user is a student
          const studentDoc = await getDoc(doc(db, "students", user.uid))

          if (studentDoc.exists()) {
            const data = studentDoc.data() as Omit<StudentData, "id">

            // Check if student is active
            if (data.status === "active") {
              setStudentData({ id: studentDoc.id, ...data })
              setIsStudent(true)
              setUser(user)
            } else {
              setError("Account is inactive. Please contact administration.")
              setIsStudent(false)
              setStudentData(null)
              setUser(null)
              // Sign out inactive user
              await auth.signOut()
            }
          } else {
            // User exists in auth but not in students collection
            setIsStudent(false)
            setStudentData(null)
            setUser(null)
          }
        } else {
          // No user signed in
          setIsStudent(false)
          setStudentData(null)
          setUser(null)
        }
      } catch (error) {
        console.error("Error checking student status:", error)
        setError("Error loading student data")
        setIsStudent(false)
        setStudentData(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return { user, studentData, isStudent, loading, error }
}
