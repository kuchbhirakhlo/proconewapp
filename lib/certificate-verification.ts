import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "./firebase"

export interface CertificateVerification {
    studentName: string
    courseTitle: string
    courseDescription: string
    enrollmentId: string
    studentId: string
    courseId: string
    certificateId: string
    completionDate: string
    courseDuration: string
    approvedForCertificate: boolean
    certificateApprovedAt: string | null
    found: boolean
}

/**
 * Verify a certificate by enrollment ID
 * Returns certificate details if found and approved
 */
export const verifyCertificateByEnrollmentId = async (
    enrollmentId: string
): Promise<CertificateVerification | null> => {
    try {
        // Get the enrollment document directly by ID (not by query)
        const enrollmentDoc = await getDoc(doc(db, "enrollments", enrollmentId))

        if (!enrollmentDoc.exists()) {
            return null
        }

        const enrollmentData = enrollmentDoc.data()

        // Check if certificate is approved
        if (!enrollmentData.approvedForCertificate) {
            return null
        }

        // Get student data
        const studentDoc = await getDoc(doc(db, "students", enrollmentData.studentId))
        if (!studentDoc.exists()) {
            return null
        }
        const studentData = studentDoc.data()

        // Get course data
        const courseDoc = await getDoc(doc(db, "courses", enrollmentData.courseId))
        if (!courseDoc.exists()) {
            return null
        }
        const courseData = courseDoc.data()

        // Calculate completion date
        let completionDate = ""
        if (enrollmentData.enrolledAt) {
            const startDate = enrollmentData.enrolledAt.toDate
                ? enrollmentData.enrolledAt.toDate()
                : new Date(enrollmentData.enrolledAt)
            let endDate = new Date(startDate)

            const duration = courseData.duration || ""
            const durationMatch = duration.match(/(\d+)\s*(month|week|year|day)/i)
            if (durationMatch) {
                const value = parseInt(durationMatch[1])
                const unit = durationMatch[2].toLowerCase()

                switch (unit) {
                    case "month":
                        endDate.setMonth(endDate.getMonth() + value)
                        break
                    case "week":
                        endDate.setDate(endDate.getDate() + value * 7)
                        break
                    case "year":
                        endDate.setFullYear(endDate.getFullYear() + value)
                        break
                    case "day":
                        endDate.setDate(endDate.getDate() + value)
                        break
                }
            }
            completionDate = endDate.toLocaleDateString()
        }

        return {
            studentName: studentData.fullName || "Unknown Student",
            courseTitle: courseData.title || "Unknown Course",
            courseDescription: courseData.description || "No description available",
            enrollmentId: enrollmentDoc.id,
            studentId: enrollmentData.studentId,
            courseId: enrollmentData.courseId,
            certificateId: enrollmentData.certificateId || "N/A",
            completionDate: completionDate,
            courseDuration: courseData.duration || "N/A",
            approvedForCertificate: true,
            certificateApprovedAt: enrollmentData.certificateApprovedAt
                ? enrollmentData.certificateApprovedAt.toDate().toLocaleDateString()
                : null,
            found: true,
        }
    } catch (error) {
        console.error("Error verifying certificate:", error)
        return null
    }
}

/**
 * Search for approved certificates by student name
 * Returns all matching approved certificates
 */
export const searchCertificatesByStudentName = async (
    studentName: string
): Promise<CertificateVerification[]> => {
    try {
        const enrollmentsRef = collection(db, "enrollments")
        const q = query(
            enrollmentsRef,
            where("approvedForCertificate", "==", true)
        )
        
        const snapshot = await getDocs(q)
        const results: CertificateVerification[] = []

        for (const enrollmentDoc of snapshot.docs) {
            const enrollmentData = enrollmentDoc.data()

            // Get student data to check name
            const studentDoc = await getDoc(doc(db, "students", enrollmentData.studentId))
            if (!studentDoc.exists()) continue

            const studentData = studentDoc.data()
            const fullName = studentData.fullName || ""

            // Case-insensitive name matching
            if (fullName.toLowerCase().includes(studentName.toLowerCase())) {
                const courseDoc = await getDoc(doc(db, "courses", enrollmentData.courseId))
                if (!courseDoc.exists()) continue

                const courseData = courseDoc.data()

                // Calculate completion date
                let completionDate = ""
                if (enrollmentData.enrolledAt) {
                    const startDate = enrollmentData.enrolledAt.toDate
                        ? enrollmentData.enrolledAt.toDate()
                        : new Date(enrollmentData.enrolledAt)
                    let endDate = new Date(startDate)

                    const duration = courseData.duration || ""
                    const durationMatch = duration.match(/(\d+)\s*(month|week|year|day)/i)
                    if (durationMatch) {
                        const value = parseInt(durationMatch[1])
                        const unit = durationMatch[2].toLowerCase()

                        switch (unit) {
                            case "month":
                                endDate.setMonth(endDate.getMonth() + value)
                                break
                            case "week":
                                endDate.setDate(endDate.getDate() + value * 7)
                                break
                            case "year":
                                endDate.setFullYear(endDate.getFullYear() + value)
                                break
                            case "day":
                                endDate.setDate(endDate.getDate() + value)
                                break
                        }
                    }
                    completionDate = endDate.toLocaleDateString()
                }

                results.push({
                    studentName: fullName,
                    courseTitle: courseData.title || "Unknown Course",
                    courseDescription: courseData.description || "No description available",
                    enrollmentId: enrollmentDoc.id,
                    studentId: enrollmentData.studentId,
                    courseId: enrollmentData.courseId,
                    certificateId: enrollmentData.certificateId || "N/A",
                    completionDate: completionDate,
                    courseDuration: courseData.duration || "N/A",
                    approvedForCertificate: true,
                    certificateApprovedAt: enrollmentData.certificateApprovedAt
                        ? enrollmentData.certificateApprovedAt.toDate().toLocaleDateString()
                        : null,
                    found: true,
                })
            }
        }

        return results
    } catch (error) {
        console.error("Error searching certificates by student name:", error)
        return []
    }
}

/**
 * Search for approved certificates by course name
 * Returns all matching approved certificates
 */
export const searchCertificatesByCourseName = async (
    courseName: string
): Promise<CertificateVerification[]> => {
    try {
        const enrollmentsRef = collection(db, "enrollments")
        const q = query(
            enrollmentsRef,
            where("approvedForCertificate", "==", true)
        )
        
        const snapshot = await getDocs(q)
        const results: CertificateVerification[] = []

        for (const enrollmentDoc of snapshot.docs) {
            const enrollmentData = enrollmentDoc.data()

            // Get course data to check name
            const courseDoc = await getDoc(doc(db, "courses", enrollmentData.courseId))
            if (!courseDoc.exists()) continue

            const courseData = courseDoc.data()
            const title = courseData.title || ""

            // Case-insensitive name matching
            if (title.toLowerCase().includes(courseName.toLowerCase())) {
                const studentDoc = await getDoc(doc(db, "students", enrollmentData.studentId))
                if (!studentDoc.exists()) continue

                const studentData = studentDoc.data()

                // Calculate completion date
                let completionDate = ""
                if (enrollmentData.enrolledAt) {
                    const startDate = enrollmentData.enrolledAt.toDate
                        ? enrollmentData.enrolledAt.toDate()
                        : new Date(enrollmentData.enrolledAt)
                    let endDate = new Date(startDate)

                    const duration = courseData.duration || ""
                    const durationMatch = duration.match(/(\d+)\s*(month|week|year|day)/i)
                    if (durationMatch) {
                        const value = parseInt(durationMatch[1])
                        const unit = durationMatch[2].toLowerCase()

                        switch (unit) {
                            case "month":
                                endDate.setMonth(endDate.getMonth() + value)
                                break
                            case "week":
                                endDate.setDate(endDate.getDate() + value * 7)
                                break
                            case "year":
                                endDate.setFullYear(endDate.getFullYear() + value)
                                break
                            case "day":
                                endDate.setDate(endDate.getDate() + value)
                                break
                        }
                    }
                    completionDate = endDate.toLocaleDateString()
                }

                results.push({
                    studentName: studentData.fullName || "Unknown Student",
                    courseTitle: title,
                    courseDescription: courseData.description || "No description available",
                    enrollmentId: enrollmentDoc.id,
                    studentId: enrollmentData.studentId,
                    courseId: enrollmentData.courseId,
                    certificateId: enrollmentData.certificateId || "N/A",
                    completionDate: completionDate,
                    courseDuration: courseData.duration || "N/A",
                    approvedForCertificate: true,
                    certificateApprovedAt: enrollmentData.certificateApprovedAt
                        ? enrollmentData.certificateApprovedAt.toDate().toLocaleDateString()
                        : null,
                    found: true,
                })
            }
        }

        return results
    } catch (error) {
        console.error("Error searching certificates by course name:", error)
        return []
    }
}
