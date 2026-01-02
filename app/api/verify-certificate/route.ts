// import { NextRequest, NextResponse } from "next/server"
// import { initializeApp, cert, getApps } from "firebase-admin/app"
// import { getFirestore } from "firebase-admin/firestore"

// // Initialize Firebase Admin SDK
// const firebaseAdminConfig = {
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
// }

// let adminDb: any

// function getAdminDb() {
//     if (!adminDb) {
//         const apps = getApps()
//         const adminApp =
//             apps.length > 0
//                 ? apps[0]
//                 : initializeApp({
//                     credential: cert(firebaseAdminConfig as any),
//                     projectId: firebaseAdminConfig.projectId,
//                 })
//         adminDb = getFirestore(adminApp)
//     }
//     return adminDb
// }

// export async function POST(request: NextRequest) {
//     try {
//         const { enrollmentId } = await request.json()

//         if (!enrollmentId || typeof enrollmentId !== "string") {
//             return NextResponse.json(
//                 { error: "Invalid enrollment ID provided" },
//                 { status: 400 }
//             )
//         }

//         const db = getAdminDb()

//         // Query enrollment by ID
//         const enrollmentsRef = db.collection("enrollments")
//         const snapshot = await enrollmentsRef.doc(enrollmentId).get()

//         if (!snapshot.exists) {
//             return NextResponse.json(
//                 { error: "Certificate not found", found: false },
//                 { status: 404 }
//             )
//         }

//         const enrollmentData = snapshot.data()

//         // Check if certificate is approved
//         if (!enrollmentData.approvedForCertificate) {
//             return NextResponse.json(
//                 { error: "Certificate not yet approved. Please contact administration.", found: false },
//                 { status: 403 }
//             )
//         }

//         // Get student data
//         const studentDoc = await db.collection("students").doc(enrollmentData.studentId).get()
//         if (!studentDoc.exists) {
//             return NextResponse.json(
//                 { error: "Student data not found", found: false },
//                 { status: 404 }
//             )
//         }
//         const studentData = studentDoc.data()

//         // Get course data
//         const courseDoc = await db.collection("courses").doc(enrollmentData.courseId).get()
//         if (!courseDoc.exists) {
//             return NextResponse.json(
//                 { error: "Course data not found", found: false },
//                 { status: 404 }
//             )
//         }
//         const courseData = courseDoc.data()

//         // Calculate completion date
//         let completionDate = ""
//         if (enrollmentData.enrolledAt) {
//             const startDate = new Date(enrollmentData.enrolledAt.toDate?.() || enrollmentData.enrolledAt)
//             let endDate = new Date(startDate)

//             const duration = courseData.duration || ""
//             const durationMatch = duration.match(/(\d+)\s*(month|week|year|day)/i)
//             if (durationMatch) {
//                 const value = parseInt(durationMatch[1])
//                 const unit = durationMatch[2].toLowerCase()

//                 switch (unit) {
//                     case "month":
//                         endDate.setMonth(endDate.getMonth() + value)
//                         break
//                     case "week":
//                         endDate.setDate(endDate.getDate() + value * 7)
//                         break
//                     case "year":
//                         endDate.setFullYear(endDate.getFullYear() + value)
//                         break
//                     case "day":
//                         endDate.setDate(endDate.getDate() + value)
//                         break
//                 }
//             }
//             completionDate = endDate.toLocaleDateString()
//         }

//         return NextResponse.json({
//             found: true,
//             data: {
//                 studentName: studentData.fullName || "Unknown Student",
//                 courseTitle: courseData.title || "Unknown Course",
//                 courseDescription: courseData.description || "No description available",
//                 enrollmentId: snapshot.id,
//                 studentId: enrollmentData.studentId,
//                 courseId: enrollmentData.courseId,
//                 certificateId: enrollmentData.certificateId || "N/A",
//                 completionDate: completionDate,
//                 courseDuration: courseData.duration || "N/A",
//                 approvedForCertificate: true,
//                 certificateApprovedAt: enrollmentData.certificateApprovedAt
//                     ? new Date(enrollmentData.certificateApprovedAt.toDate?.() || enrollmentData.certificateApprovedAt).toLocaleDateString()
//                     : null,
//             },
//         })
//     } catch (error) {
//         console.error("Certificate verification error:", error)
//         return NextResponse.json(
//             { error: "An error occurred during verification", found: false },
//             { status: 500 }
//         )
//     }
// }
