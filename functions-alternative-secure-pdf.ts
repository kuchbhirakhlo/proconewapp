// /**
//  * Firebase Cloud Function for Secure PDF Serving
//  * 
//  * Deploy this function to Firebase Cloud Functions instead of Next.js API route
//  * This avoids build-time Firebase Admin SDK initialization issues
//  * 
//  * Installation & Deployment:
//  * 1. Install Firebase CLI: npm install -g firebase-tools
//  * 2. Create firebase-functions directory in project root
//  * 3. Copy this file to functions/src/secure-pdf.ts
//  * 4. Deploy: firebase deploy --only functions
//  */

// import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'

// admin.initializeApp()

// const db = admin.firestore()
// const auth = admin.auth()
// const storage = admin.storage()

// export const securePdf = functions.https.onRequest(async (req, res) => {
//   // CORS headers
//   res.set('Access-Control-Allow-Origin', '*')
//   res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
//   res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type')

//   if (req.method === 'OPTIONS') {
//     res.status(200).send('')
//     return
//   }

//   try {
//     // Get the authorization token from the request header
//     const authHeader = req.headers.authorization
//     if (!authHeader?.startsWith('Bearer ')) {
//       res.status(401).json({
//         error: 'Unauthorized: Missing or invalid token',
//       })
//       return
//     }

//     const token = authHeader.substring(7)

//     // Verify the Firebase ID token
//     let decodedToken
//     try {
//       decodedToken = await auth.verifyIdToken(token)
//     } catch (error) {
//       res.status(401).json({
//         error: 'Unauthorized: Invalid token',
//       })
//       return
//     }

//     const userId = decodedToken.uid

//     // Get the pdfId from query parameters
//     const pdfId = req.query.pdfId as string

//     if (!pdfId) {
//       res.status(400).json({
//         error: 'Bad Request: Missing pdfId parameter',
//       })
//       return
//     }

//     // Fetch the PDF metadata from Firestore
//     const pdfDoc = await db.collection('course_pdfs').doc(pdfId).get()

//     if (!pdfDoc.exists) {
//       res.status(404).json({
//         error: 'Not Found: PDF does not exist',
//       })
//       return
//     }

//     const pdfData = pdfDoc.data()
//     const courseIds = pdfData?.courseIds || [pdfData?.courseId]

//     // Check if the student is enrolled in the course
//     const studentDoc = await db.collection('students').doc(userId).get()

//     if (!studentDoc.exists) {
//       res.status(403).json({
//         error: 'Unauthorized: Student profile not found',
//       })
//       return
//     }

//     const studentData = studentDoc.data()
//     const enrolledCourses = studentData?.enrolledCourses || []

//     // Verify that the student is enrolled in at least one of the courses for this PDF
//     const hasAccess = courseIds.some((courseId: string) =>
//       enrolledCourses.includes(courseId)
//     )

//     if (!hasAccess) {
//       res.status(403).json({
//         error: 'Forbidden: You are not enrolled in the required course',
//       })
//       return
//     }

//     // Get the PDF file from Firebase Storage
//     const bucket = storage.bucket()
//     const file = bucket.file(`course_pdfs/${pdfId}`)

//     // Check if file exists
//     const [exists] = await file.exists()
//     if (!exists) {
//       res.status(404).json({
//         error: 'Not Found: PDF file not found in storage',
//       })
//       return
//     }

//     // Set response headers
//     res.set('Content-Type', 'application/pdf')
//     res.set(
//       'Content-Disposition',
//       `inline; filename="${pdfData?.title || 'document'}.pdf"`
//     )
//     res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
//     res.set('Pragma', 'no-cache')
//     res.set('Expires', '0')

//     // Stream the PDF file
//     file.createReadStream().pipe(res)
//   } catch (error) {
//     console.error('Error serving PDF:', error)
//     res.status(500).json({
//       error: 'Internal Server Error',
//       details: String(error),
//     })
//   }
// })
