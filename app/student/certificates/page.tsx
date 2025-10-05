"use client"

import { useState, useEffect } from "react"
import StudentLayout from "@/components/student/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Award, Download, Calendar, Clock, BookOpen, Eye, AlertCircle } from "lucide-react"
import { useStudent } from "@/hooks/useStudent"
import { getEnrolledCourses, getEnrolledCoursesWithApproval } from "@/lib/student"
import { generateCertificatePDF, previewCertificate, CertificateData, generateCertificateId } from "@/lib/certificate-generator"

interface CourseWithEnrollment {
    id: string
    course: {
        id: string
        title: string
        description: string
        duration?: string
        status?: string
        pdfUrls?: string[]
    } | null
    status: string
    progress: number
    enrolledAt: any
    courseId: string
    approvedForCertificate?: boolean
    certificateApprovedAt?: any
}

interface CertificatePreviewProps {
    studentName: string
    courseTitle: string
    courseDescription: string
    completionDate: string
    certificateId: string
    courseDuration?: string
}

const CertificatePreview = ({
    studentName,
    courseTitle,
    courseDescription,
    completionDate,
    certificateId,
    courseDuration
}: CertificatePreviewProps) => {
    return (
        <div className="certificate-preview bg-white border-4 border-gray-800 p-8 max-w-4xl mx-auto">
            <div className="text-center">
                {/* Header */}
                <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-wider uppercase">
                    Certificate of Completion
                </h1>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>

                {/* Content */}
                <div className="my-12">
                    <p className="text-xl text-gray-700 mb-6">This is to certify that</p>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 uppercase tracking-wide">
                        {studentName}
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">has successfully completed the course</p>
                    <h3 className="text-2xl font-bold text-blue-600 mb-6 italic">
                        "{courseTitle}"
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {courseDescription}
                    </p>
                </div>

                {/* Details */}
                <div className="flex justify-center space-x-16 my-12">
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Completion Date</p>
                        <p className="text-lg font-bold text-gray-800">{completionDate}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
                        <p className="text-lg font-bold text-gray-800">{certificateId}</p>
                    </div>
                </div>

                {/* Course Duration */}
                {courseDuration && (
                    <div className="text-center mb-8">
                        <p className="text-sm text-gray-500 mb-1">Course Duration</p>
                        <p className="text-lg font-bold text-gray-800">{courseDuration}</p>
                    </div>
                )}

                {/* Logo */}
                <div className="mt-12 text-center">
                    <div className="inline-block text-center mx-10">
                        <img
                            src="/logo.png"
                            alt="Organization Logo"
                            className="h-16 w-auto mx-auto mb-4 object-contain"
                        />
                        <p className="text-sm text-gray-500">Certified by</p>
                        <p className="text-lg font-bold text-gray-800">ProCo Tech</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-gray-500 mb-1">This certificate is officially recognized and verified</p>
                    <p className="text-xs text-gray-500">Issued on {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    )
}

export default function CertificatesPage() {
    const { studentData } = useStudent()
    const [completedCourses, setCompletedCourses] = useState<CourseWithEnrollment[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCompletedCourses = async () => {
            if (studentData?.uid) {
                try {
                    console.log("Starting to fetch enrollments for student:", studentData.uid)

                    // Try the new function first
                    let enrollments
                    try {
                        enrollments = await getEnrolledCoursesWithApproval(studentData.uid)
                        console.log("New function succeeded, received enrollments:", enrollments?.length || 0)
                    } catch (newFunctionError) {
                        console.log("New function failed, falling back to original function:", newFunctionError)
                        // Fallback to original function if new one fails
                        enrollments = await getEnrolledCourses(studentData.uid)
                        console.log("Fallback function succeeded, received enrollments:", enrollments?.length || 0)

                        // Add default approval status for fallback
                        enrollments = enrollments.map((enrollment: any) => ({
                            ...enrollment,
                            approvedForCertificate: false,
                            certificateApprovedAt: null
                        }))
                    }

                    if (!Array.isArray(enrollments)) {
                        throw new Error("Invalid response format - expected array")
                    }

                    // Filter only completed courses
                    const completed = enrollments.filter(enrollment => {
                        const isCompleted = isCourseCompleted(enrollment.enrolledAt, enrollment.course?.duration || "")
                        return isCompleted
                    })
                    console.log("Filtered completed courses:", completed.length)
                    setCompletedCourses(completed)
                } catch (error) {
                    console.error("Error fetching completed courses:", error)
                    console.error("Error details:", {
                        message: error instanceof Error ? error.message : 'Unknown error',
                        stack: error instanceof Error ? error.stack : 'No stack trace',
                        type: typeof error
                    })
                    setCompletedCourses([])
                } finally {
                    setLoading(false)
                }
            } else {
                console.log("No student data available")
                setLoading(false)
            }
        }

        fetchCompletedCourses()
    }, [studentData])

    // Helper function to calculate course end date
    const calculateCourseEndDate = (enrolledAt: any, duration: string) => {
        if (!enrolledAt) return null

        const startDate = enrolledAt.toDate ? enrolledAt.toDate() : new Date(enrolledAt)
        let endDate = new Date(startDate)

        // Parse duration (e.g., "6 months", "3 weeks", "1 year")
        const durationMatch = duration.match(/(\d+)\s*(month|week|year|day)/i)
        if (durationMatch) {
            const value = parseInt(durationMatch[1])
            const unit = durationMatch[2].toLowerCase()

            switch (unit) {
                case 'month':
                    endDate.setMonth(endDate.getMonth() + value)
                    break
                case 'week':
                    endDate.setDate(endDate.getDate() + (value * 7))
                    break
                case 'year':
                    endDate.setFullYear(endDate.getFullYear() + value)
                    break
                case 'day':
                    endDate.setDate(endDate.getDate() + value)
                    break
            }
        }

        return endDate
    }

    // Helper function to check if course is completed
    const isCourseCompleted = (enrolledAt: any, duration: string) => {
        const endDate = calculateCourseEndDate(enrolledAt, duration)
        if (!endDate) return false
        return new Date() >= endDate
    }

    // Generate certificate function
    const generateCertificate = async (enrollment: CourseWithEnrollment) => {
        if (!enrollment.course?.title || !studentData?.fullName) {
            alert("Unable to generate certificate: Missing course or student information.");
            return;
        }

        // Check if course is approved for certification
        if (!enrollment.approvedForCertificate) {
            alert("Certificate not yet approved by admin. Please contact administration.");
            return;
        }

        try {
            const endDate = calculateCourseEndDate(enrollment.enrolledAt, enrollment.course?.duration || "")
            const certificateData: CertificateData = {
                studentName: studentData.fullName,
                courseTitle: enrollment.course.title,
                courseDescription: enrollment.course.description || "Course completion certificate",
                completionDate: endDate?.toLocaleDateString() || new Date().toLocaleDateString(),
                certificateId: enrollment.certificateId || generateCertificateId(),
                courseDuration: enrollment.course.duration
            };

            await generateCertificatePDF(certificateData);
        } catch (error) {
            console.error("Error generating certificate:", error);
            alert("Failed to generate certificate. Please try again.");
        }
    }

    // Preview certificate function
    const previewCertificateHandler = (enrollment: CourseWithEnrollment) => {
        if (!enrollment.course?.title || !studentData?.fullName) {
            alert("Unable to preview certificate: Missing course or student information.");
            return;
        }

        // Check if course is approved for certification
        if (!enrollment.approvedForCertificate) {
            alert("Certificate not yet approved by admin. Please contact administration.");
            return;
        }

        const endDate = calculateCourseEndDate(enrollment.enrolledAt, enrollment.course?.duration || "")
        const certificateData: CertificateData = {
            studentName: studentData.fullName,
            courseTitle: enrollment.course.title,
            courseDescription: enrollment.course.description || "Course completion certificate",
            completionDate: endDate?.toLocaleDateString() || new Date().toLocaleDateString(),
            certificateId: enrollment.certificateId || generateCertificateId(),
            courseDuration: enrollment.course.duration
        };

        previewCertificate(certificateData);
    }

    return (
        <StudentLayout title="My Certificates">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center">
                            <Award className="h-6 w-6 mr-2 text-yellow-500" />
                            My Certificates
                        </h1>
                        <p className="text-gray-600">View and download your course completion certificates</p>
                    </div>
                    <Badge variant="outline" className="px-3 py-1">
                        {completedCourses.length} Completed
                    </Badge>
                </div>

                {/* Completed Courses with Certificates */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Award className="h-5 w-5 mr-2" />
                            Completed Courses
                        </CardTitle>
                        <CardDescription>
                            Your successfully completed courses with available certificates
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="h-32 bg-gray-200 rounded-lg"></div>
                                    </div>
                                ))}
                            </div>
                        ) : completedCourses.length === 0 ? (
                            <div className="text-center py-12">
                                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
                                <p className="text-gray-600 mb-4">
                                    Complete your enrolled courses to earn certificates
                                </p>
                                <Button onClick={() => window.location.href = '/student/courses'}>
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    View My Courses
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {completedCourses.map((enrollment) => {
                                    const endDate = calculateCourseEndDate(enrollment.enrolledAt, enrollment.course?.duration || "")
                                    const startDate = enrollment.enrolledAt?.toDate ? enrollment.enrolledAt.toDate() : new Date(enrollment.enrolledAt)

                                    return (
                                        <div key={enrollment.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-green-50 to-blue-50">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-xl text-gray-900 mb-2">
                                                        {enrollment.course?.title || "Course Title"}
                                                    </h3>
                                                    <p className="text-gray-600 mb-3 line-clamp-2">
                                                        {enrollment.course?.description || "Course description"}
                                                    </p>

                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                        <span className="flex items-center">
                                                            <Calendar className="h-4 w-4 mr-1" />
                                                            Started: {startDate.toLocaleDateString()}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            Completed: {endDate?.toLocaleDateString()}
                                                        </span>
                                                        <span className="flex items-center">
                                                            Duration: {enrollment.course?.duration || "N/A"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end space-y-2">
                                                    <Badge className="bg-green-100 text-green-800 border-green-300">
                                                        <Award className="h-3 w-3 mr-1" />
                                                        Completed
                                                    </Badge>
                                                    {!enrollment.approvedForCertificate && (
                                                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                                                            <AlertCircle className="h-3 w-3 mr-1" />
                                                            Pending Approval
                                                        </Badge>
                                                    )}
                                                    <div className="flex space-x-2">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50"
                                                                    disabled={!enrollment.approvedForCertificate}
                                                                >
                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                    Preview
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                                                <DialogHeader>
                                                                    <DialogTitle>Certificate Preview</DialogTitle>
                                                                    <DialogDescription>
                                                                        Preview of your certificate for "{enrollment.course?.title}"
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="mt-4">
                                                                    <CertificatePreview
                                                                        studentName={studentData?.fullName || ""}
                                                                        courseTitle={enrollment.course?.title || ""}
                                                                        courseDescription={enrollment.course?.description || ""}
                                                                        completionDate={endDate?.toLocaleDateString() || ""}
                                                                        certificateId={enrollment.certificateId || generateCertificateId()}
                                                                        courseDuration={enrollment.course?.duration}
                                                                    />
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Button
                                                            onClick={() => generateCertificate(enrollment)}
                                                            disabled={!enrollment.approvedForCertificate}
                                                            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <Download className="h-4 w-4 mr-2" />
                                                            {enrollment.approvedForCertificate ? "Download Certificate" : "Pending Approval"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Course Details */}
                                            <div className="border-t pt-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-medium text-sm mb-2">Course Information</h4>
                                                        <div className="space-y-1 text-sm text-gray-600">
                                                            <div>Course ID: {enrollment.course?.id}</div>
                                                            <div>Enrollment ID: {enrollment.id}</div>
                                                            <div>Progress: {enrollment.progress || 0}%</div>
                                                        </div>
                                                    </div>

                                                    {enrollment.course && (
                                                        <div>
                                                            <h4 className="font-medium text-sm mb-2">Certificate Details</h4>
                                                            <div className="space-y-1 text-sm text-gray-600">
                                                                <div>Certificate Type: Course Completion</div>
                                                                <div>Issue Date: {endDate?.toLocaleDateString()}</div>
                                                                <div>Approval Status: {enrollment.approvedForCertificate ? "Approved" : "Pending"}</div>
                                                                {enrollment.certificateApprovedAt && (
                                                                    <div>Approved On: {enrollment.certificateApprovedAt?.toDate?.()?.toLocaleDateString()}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Certificate Statistics */}
                {completedCourses.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="p-4 text-center">
                                <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900">{completedCourses.length}</div>
                                <div className="text-sm text-gray-600">Total Certificates</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900">
                                    {Math.round(completedCourses.reduce((acc, course) => {
                                        const duration = course.course?.duration || ""
                                        const match = duration.match(/(\d+)/)
                                        return acc + (match ? parseInt(match[1]) : 0)
                                    }, 0) / completedCourses.length) || 0}
                                </div>
                                <div className="text-sm text-gray-600">Avg. Course Duration (months)</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <Download className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900">100%</div>
                                <div className="text-sm text-gray-600">Completion Rate</div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </StudentLayout>
    )
}