// Enhanced Firebase configuration with better error handling
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBBTMiyPuA1-zKX-2EMSmeo_G8EHgD7kcw",
  authDomain: "procotech-879c2.firebaseapp.com",
  projectId: "procotech-879c2",
  storageBucket: "procotech-879c2.firebasestorage.app",
  messagingSenderId: "895570924369",
  appId: "1:895570924369:web:aeb8c940b4605d3ca47970",
  measurementId: "G-FR9XMP4KYQ",
}

// Initialize Firebase only if it hasn't been initialized
let app
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

// Initialize Analytics only in browser and if supported
let analytics
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  })
}

// Helper functions for connection management
export const enableFirestoreNetwork = () => enableNetwork(db)
export const disableFirestoreNetwork = () => disableNetwork(db)

// Development helpers
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  // Connect to emulators in development
  // Uncomment these lines if you're using Firebase emulators
  // connectAuthEmulator(auth, "http://localhost:9099");
  // connectFirestoreEmulator(db, 'localhost', 8080);
}

export { analytics }
export default app

// Firestore collection references
export const COLLECTIONS = {
  ADMINS: "admins",
  COURSES: "courses",
  PORTFOLIO: "portfolio",
  STUDENTS: "students",
  ENROLLMENTS: "enrollments",
  CONTACTS: "contacts",
  ANALYTICS: "analytics",
} as const

// Helper function to check if user is admin
export const checkAdminStatus = async (uid: string) => {
  try {
    const { doc, getDoc } = await import("firebase/firestore")
    const adminDoc = await getDoc(doc(db, COLLECTIONS.ADMINS, uid))
    return adminDoc.exists()
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}
