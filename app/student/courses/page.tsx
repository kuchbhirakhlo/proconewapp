"use client"

import { useState, useEffect } from "react"
import StudentLayout from "@/components/student/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, CheckCircle, AlertCircle, Calendar, FileText, Award } from "lucide-react"
import { useStudent } from "@/hooks/useStudent"
import { getEnrolledCourses, getStudentData, enrollInCourse } from "@/lib/student"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface CourseData {
    id: string
    title: string
    description: string
    duration?: string
    status?: string
    pdfUrls?: string[]
    level?: string
}

interface CourseWithEnrollment {
    id: string
    course: CourseData | null
    status: string
    progress: number
    enrolledAt: any
    courseId: string
    studentId: string
    approvedForCertificate?: boolean
}

export default function CoursesPage() {
    const { studentData } = useStudent()
    const [enrolledCourses, setEnrolledCourses] = useState<CourseWithEnrollment[]>([])
    const [assignedCourses, setAssignedCourses] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [enrollingCourse, setEnrollingCourse] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (studentData?.uid) {
                try {
                    // Get enrolled courses
                    const courses = await getEnrolledCourses(studentData.uid)
                    setEnrolledCourses(courses as CourseWithEnrollment[])

                    // Get assigned courses from student data
                    const student = await getStudentData(studentData.uid)
                    setAssignedCourses(student.assignedCourses || [])
                } catch (error) {
                    console.error("Error fetching courses data:", error)
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchData()
    }, [studentData])

    const getCourseStatus = (enrollment: CourseWithEnrollment) => {
        const isCompleted = isCourseCompleted(enrollment.enrolledAt, enrollment.course?.duration || "")

        if (isCompleted && enrollment.approvedForCertificate) {
            return { label: "Approved", variant: "default" as const, icon: CheckCircle, color: "text-green-600" }
        } else if (isCompleted) {
            return { label: "Pending Approval", variant: "secondary" as const, icon: Clock, color: "text-yellow-600" }
        } else if (enrollment.status === "active") {
            return { label: "In Progress", variant: "secondary" as const, icon: Clock, color: "text-blue-600" }
        } else {
            return { label: "Not Started", variant: "outline" as const, icon: AlertCircle, color: "text-gray-600" }
        }
    }

    const availableCourses = assignedCourses.filter(courseId =>
        !enrolledCourses.some(enrollment => enrollment.course?.id === courseId)
    )

    // Helper function to calculate course end date
    const calculateCourseEndDate = (enrolledAt: any, duration: string) => {
        if (!enrolledAt || !duration) return null

        try {
            const startDate = enrolledAt.toDate ? enrolledAt.toDate() : new Date(enrolledAt)
            if (isNaN(startDate.getTime())) return null

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
        } catch (error) {
            console.error("Error calculating course end date:", error)
            return null
        }
    }

    // Helper function to check if course is completed
    const isCourseCompleted = (enrolledAt: any, duration: string) => {
        const endDate = calculateCourseEndDate(enrolledAt, duration)
        if (!endDate) return false
        try {
            return new Date() >= endDate
        } catch (error) {
            console.error("Error checking if course is completed:", error)
            return false
        }
    }

    // Handle start course
    const handleStartCourse = async (courseId: string) => {
        if (!studentData?.uid) return

        setEnrollingCourse(courseId)
        try {
            await enrollInCourse(studentData.uid, courseId)
            // Refresh enrolled courses
            const courses = await getEnrolledCourses(studentData.uid)
            setEnrolledCourses(courses as CourseWithEnrollment[])
        } catch (error) {
            console.error("Error enrolling in course:", error)
            alert("Failed to enroll in course. Please try again.")
        } finally {
            setEnrollingCourse(null)
        }
    }

    // Get course details for available courses
    const [availableCourseDetails, setAvailableCourseDetails] = useState<CourseData[]>([])

    useEffect(() => {
        const fetchAvailableCourseDetails = async () => {
            if (availableCourses.length > 0) {
                try {
                    const coursePromises = availableCourses.map(async (courseId) => {
                        const courseDoc = await getDoc(doc(db, "courses", courseId))
                        return courseDoc.exists() ? { id: courseDoc.id, ...courseDoc.data() } : null
                    })
                    const courses = await Promise.all(coursePromises)
                    const validCourses = courses.filter((course): course is CourseData => course !== null)
                    setAvailableCourseDetails(validCourses)
                } catch (error) {
                    console.error("Error fetching available course details:", error)
                }
            }
        }

        fetchAvailableCourseDetails()
    }, [availableCourses])

    return (
        <StudentLayout title="My Courses">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">My Courses</h1>
                        <p className="text-gray-600">Track your learning progress and access your assigned courses</p>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="px-3 py-1">
                            {assignedCourses.length} Assigned
                        </Badge>
                        <Badge variant="secondary" className="px-3 py-1">
                            {enrolledCourses.length} Enrolled
                        </Badge>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.href = '/student/certificates'}
                            className="flex items-center"
                        >
                            <Award className="h-4 w-4 mr-1" />
                            Certificates
                        </Button>
                    </div>
                </div>

                {/* Available Courses Section */}
                {availableCourses.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BookOpen className="h-5 w-5 mr-2" />
                                Available Courses
                            </CardTitle>
                            <CardDescription>
                                Courses assigned to you that you haven't started yet
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {availableCourseDetails.map((course) => (
                                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">{course.title}</CardTitle>
                                            <CardDescription>{course.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm text-gray-600">
                                                    <span>Duration:</span>
                                                    <span>{course.duration}</span>
                                                </div>
                                                <div className="flex justify-between text-sm text-gray-600">
                                                    <span>Level:</span>
                                                    <Badge variant="outline" className="text-xs">{course.level}</Badge>
                                                </div>
                                                {course.pdfUrls && course.pdfUrls.length > 0 && (
                                                    <div className="flex items-center text-sm text-blue-600">
                                                        <FileText className="h-4 w-4 mr-1" />
                                                        <span>{course.pdfUrls.length} PDF{course.pdfUrls.length > 1 ? 's' : ''}</span>
                                                    </div>
                                                )}
                                                <Button
                                                    className="w-full"
                                                    size="sm"
                                                    onClick={() => handleStartCourse(course.id)}
                                                    disabled={enrollingCourse === course.id}
                                                >
                                                    {enrollingCourse === course.id ? "Enrolling..." : "Start Course"}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Enrolled Courses Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            Current Enrollments
                        </CardTitle>
                        <CardDescription>
                            Your active course enrollments and progress
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="h-24 bg-gray-200 rounded-lg"></div>
                                    </div>
                                ))}
                            </div>
                        ) : enrolledCourses.length === 0 ? (
                            <div className="text-center py-12">
                                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
                                <p className="text-gray-600 mb-4">
                                    {assignedCourses.length > 0
                                        ? "You have assigned courses available to start"
                                        : "Contact administration to get courses assigned"
                                    }
                                </p>
                                {assignedCourses.length > 0 && (
                                    <Button>Start First Course</Button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {enrolledCourses.map((enrollment) => {
                                    const statusInfo = getCourseStatus(enrollment)
                                    const StatusIcon = statusInfo.icon

                                    return (
                                        <div key={enrollment.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${isCourseCompleted(enrollment.enrolledAt, enrollment.course?.duration || "") ? 'bg-green-50 border-green-200' : ''}`}>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-lg">
                                                    {enrollment.course?.title || "Course Title"}
                                                </h3>
                                                <Badge variant={statusInfo.variant} className="flex items-center gap-1">
                                                    <StatusIcon className="h-3 w-3" />
                                                    {statusInfo.label}
                                                </Badge>
                                            </div>

                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                {enrollment.course?.description || "Course description"}
                                            </p>

                                            {(() => {
                                                const isCompleted = isCourseCompleted(enrollment.enrolledAt, enrollment.course?.duration || "")
                                                const progressValue = isCompleted ? 100 : (enrollment.progress || 0)

                                                return (
                                                    <div className="space-y-3 mb-4">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="font-medium">Progress</span>
                                                            <span className="text-gray-600">{progressValue}%</span>
                                                        </div>
                                                        <Progress value={progressValue} className="h-2" />
                                                    </div>
                                                )
                                            })()}

                                            <div className="flex justify-between text-sm text-gray-500 pt-3 border-t">
                                                <div className="flex flex-col space-y-1">
                                                    <span className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-1" />
                                                        Started: {enrollment.enrolledAt?.toDate
                                                            ? enrollment.enrolledAt.toDate().toLocaleDateString()
                                                            : "N/A"
                                                        }
                                                    </span>
                                                    {(() => {
                                                        const endDate = calculateCourseEndDate(enrollment.enrolledAt, enrollment.course?.duration || "")
                                                        return endDate ? (
                                                            <span className="flex items-center text-blue-600">
                                                                <Clock className="h-4 w-4 mr-1" />
                                                                Ends: {endDate.toLocaleDateString()}
                                                            </span>
                                                        ) : null
                                                    })()}
                                                </div>
                                                <div className="text-right">
                                                    <span className="block">Duration: {enrollment.course?.duration || "N/A"}</span>
                                                    {(() => {
                                                        const isCompleted = isCourseCompleted(enrollment.enrolledAt, enrollment.course?.duration || "")
                                                        return (
                                                            <Badge variant={isCompleted ? "default" : "secondary"} className="mt-1">
                                                                {isCompleted ? "Completed" : "In Progress"}
                                                            </Badge>
                                                        )
                                                    })()}
                                                </div>
                                            </div>

                                            {/* Certificate Section */}
                                            <div className="pt-3 border-t">
                                                <h4 className="font-medium text-sm mb-2 flex items-center">
                                                    <CheckCircle className="h-4 w-4 mr-1" />
                                                    Certificate Status
                                                </h4>
                                                {(() => {
                                                    const isCompleted = isCourseCompleted(enrollment.enrolledAt, enrollment.course?.duration || "")
                                                    const endDate = calculateCourseEndDate(enrollment.enrolledAt, enrollment.course?.duration || "")
                                                    const isApproved = enrollment.approvedForCertificate

                                                    if (isCompleted && isApproved) {
                                                        return (
                                                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                                                <div className="flex items-center text-green-700">
                                                                    <CheckCircle className="h-5 w-5 mr-2" />
                                                                    <span className="font-medium">Certificate Approved!</span>
                                                                </div>
                                                                <p className="text-sm text-green-600 mt-1">
                                                                    Your certificate has been approved and is ready for download.
                                                                </p>
                                                                <div className="flex gap-2 mt-2">
                                                                    <Button
                                                                        className="flex-1"
                                                                        size="sm"
                                                                        onClick={() => window.location.href = '/student/certificates'}
                                                                    >
                                                                        <Award className="h-4 w-4 mr-2" />
                                                                        Download Certificate
                                                                    </Button>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => window.location.href = '/student/certificates'}
                                                                    >
                                                                        View All Certificates
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )
                                                    } else if (isCompleted && !isApproved) {
                                                        return (
                                                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                                <div className="flex items-center text-yellow-700">
                                                                    <Clock className="h-5 w-5 mr-2" />
                                                                    <span className="font-medium">Pending Admin Approval</span>
                                                                </div>
                                                                <p className="text-sm text-yellow-600 mt-1">
                                                                    Your course is completed but awaiting admin approval for certification.
                                                                    You'll be notified once approved.
                                                                </p>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                                <div className="flex items-center text-blue-700">
                                                                    <Clock className="h-5 w-5 mr-2" />
                                                                    <span className="font-medium">Course In Progress</span>
                                                                </div>
                                                                <p className="text-sm text-blue-600 mt-1">
                                                                    Your course will be completed on {endDate?.toLocaleDateString()}.
                                                                    Certificate will be available after completion and admin approval.
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                })()}
                                            </div>

                                            {/* Course PDFs Section */}
                                            {enrollment.course?.pdfUrls && enrollment.course.pdfUrls.length > 0 && (
                                                <div className="pt-3 border-t">
                                                    <h4 className="font-medium text-sm mb-2 flex items-center">
                                                        <FileText className="h-4 w-4 mr-1" />
                                                        Course Materials ({enrollment.course.pdfUrls.length})
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {enrollment.course.pdfUrls.map((pdfUrl: string, index: number) => (
                                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                                <div className="flex items-center">
                                                                    <FileText className="h-4 w-4 mr-2 text-blue-600" />
                                                                    <span className="text-sm truncate max-w-48">
                                                                        {pdfUrl.split('/').pop()?.split('?')[0] || `PDF ${index + 1}`}
                                                                    </span>
                                                                </div>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => window.open(pdfUrl, '_blank')}
                                                                    className="text-xs"
                                                                >
                                                                    View
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </StudentLayout>
    )
}