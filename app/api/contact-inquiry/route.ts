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
    const { firstName, lastName, name, email, phone, subject, service, message, inquiryType, source } = body

    // Support both contact form (firstName/lastName) and business form (name) formats
    const contactFirstName = firstName || (name ? name.split(' ')[0] : '')
    const contactLastName = lastName || (name ? name.split(' ').slice(1).join(' ') : '')
    const contactSubject = subject || service || 'Business Inquiry'

    // Validate required fields
    if (!contactFirstName || !email || !contactSubject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Add to Firestore - use contact_inquiries collection for admin panel visibility
    const inquiriesCollection = collection(db, 'contact_inquiries')
    const docRef = await addDoc(inquiriesCollection, {
      firstName: contactFirstName,
      lastName: contactLastName,
      email,
      phone: phone || '',
      subject: contactSubject,
      message,
      inquiryType: inquiryType || 'general',
      source: source || 'contact-form',
      createdAt: serverTimestamp(),
      status: 'pending',
      read: false,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully',
        id: docRef.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
