"use client"

import { useState, useEffect } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export function useAdmin() {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user is admin
        try {
          const adminDoc = await getDoc(doc(db, "admins", user.uid))
          setIsAdmin(adminDoc.exists())
          setUser(user)
        } catch (error) {
          console.error("Error checking admin status:", error)
          setIsAdmin(false)
          setUser(null)
        }
      } else {
        setIsAdmin(false)
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, isAdmin, loading }
}
