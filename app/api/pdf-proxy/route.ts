import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    // Decode the pdfId first, then re-encode for the Firebase URL
    const pdfId = decodeURIComponent(url.searchParams.get('pdfId') || '')
    const token = url.searchParams.get('token')

    if (!pdfId) {
      return NextResponse.json(
        { error: 'Missing pdfId parameter' },
        { status: 400 }
      )
    }

    // URL encode the pdfId for Firebase Storage URL
    const encodedPdfId = encodeURIComponent(pdfId)
    const firebaseStorageUrl = `https://firebasestorage.googleapis.com/v0/b/procotech-879c2.firebasestorage.app/o/course_pdfs%2F${encodedPdfId}?alt=media${token ? `&token=${token}` : ''}`

    // Fetch the PDF from Firebase Storage
    const response = await fetch(firebaseStorageUrl, {
      headers: {
        'Accept': 'application/pdf',
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Failed to fetch PDF: ${response.status} ${response.statusText} - ${errorText}` },
        { status: response.status }
      )
    }

    // Get the PDF as an array buffer
    const pdfBuffer = await response.arrayBuffer()

    // Return the PDF with proper CORS headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Disposition': `inline; filename="${encodeURIComponent(pdfId)}"`,
      },
    })
  } catch (error) {
    console.error('Error in PDF proxy:', error)
    return NextResponse.json(
      { error: `Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}` },
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
