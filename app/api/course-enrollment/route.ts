import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

// Initialize Firebase for admin API
const firebaseConfig = {
  apiKey: "AIzaSyBBTMiyPuA1-zKX-2EMSmeo_G8EHgD7kcw",
  authDomain: "procotech-879c2.firebaseapp.com",
  projectId: "procotech-879c2",
  storageBucket: "procotech-879c2.firebasestorage.app",
  messagingSenderId: "895570924369",
  appId: "1:895570924369:web:aeb8c940b4605d3ca47970",
}

let app
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

const db = getFirestore(app)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, courseId, courseName } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !courseId || !courseName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Add to Firestore
    const enrollmentsCollection = collection(db, 'course_enrollments')
    const docRef = await addDoc(enrollmentsCollection, {
      firstName,
      lastName,
      email,
      phone: phone || '',
      courseId,
      courseName,
      createdAt: serverTimestamp(),
      status: 'pending',
      read: false,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Enrollment request submitted successfully',
        id: docRef.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to submit enrollment request' },
      { status: 500 }
    )
  }
}
