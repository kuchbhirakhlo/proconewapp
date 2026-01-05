import { NextRequest, NextResponse } from 'next/server'
import { getStorage, ref, getBytes } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBBTMiyPuA1-zKX-2EMSmeo_G8EHgD7kcw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "procotech-879c2.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "procotech-879c2",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "procotech-879c2.firebasestorage.app",
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const pdfId = url.searchParams.get('pdfId')

    if (!pdfId) {
      return NextResponse.json(
        { error: 'Missing pdfId parameter' },
        { status: 400 }
      )
    }

    // For now, redirect to Firebase Storage with CORS headers
    // This assumes Firebase Storage CORS is configured
    return NextResponse.redirect(
      `https://firebasestorage.googleapis.com/v0/b/procotech-879c2.firebasestorage.app/o/course_pdfs%2F${pdfId}?alt=media`,
      {
        status: 307,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  } catch (error) {
    console.error('Error in PDF proxy:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
