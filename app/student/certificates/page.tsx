"use client"

import { useState, useEffect } from "react"
import StudentLayout from "@/components/student/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Download, Calendar, Clock, BookOpen, AlertCircle } from "lucide-react"
import { useStudent } from "@/hooks/useStudent"
import { getEnrolledCourses } from "@/lib/student"

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
}

export default function CertificatesPage() {
    const { studentData } = useStudent()
    const [completedCourses, setCompletedCourses] = useState<CourseWithEnrollment[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCompletedCourses = async () => {
            if (studentData?.uid) {
                try {
                    const courses = await getEnrolledCourses(studentData.uid) as CourseWithEnrollment[]
                    // Filter only completed courses
                    const completed = courses.filter(course => {
                        const isCompleted = isCourseCompleted(course.enrolledAt, course.course?.duration || "")
                        return isCompleted
                    })
                    setCompletedCourses(completed)
                } catch (error) {
                    console.error("Error fetching completed courses:", error)
                } finally {
                    setLoading(false)
                }
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

    // Generate certificate (placeholder function)
    const generateCertificate = (course: CourseWithEnrollment) => {
        // This would typically generate a PDF certificate
        // For now, we'll just show an alert
        alert(`Certificate for "${course.course?.title}" is being generated. This would normally download a PDF certificate.`)
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
                                {completedCourses.map((course) => {
                                    const endDate = calculateCourseEndDate(course.enrolledAt, course.course?.duration || "")
                                    const startDate = course.enrolledAt?.toDate ? course.enrolledAt.toDate() : new Date(course.enrolledAt)

                                    return (
                                        <div key={course.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-green-50 to-blue-50">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-xl text-gray-900 mb-2">
                                                        {course.course?.title || "Course Title"}
                                                    </h3>
                                                    <p className="text-gray-600 mb-3 line-clamp-2">
                                                        {course.course?.description || "Course description"}
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
                                                            Duration: {course.course?.duration || "N/A"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end space-y-2">
                                                    <Badge className="bg-green-100 text-green-800 border-green-300">
                                                        <Award className="h-3 w-3 mr-1" />
                                                        Completed
                                                    </Badge>
                                                    <Button
                                                        onClick={() => generateCertificate(course)}
                                                        className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                                                    >
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download Certificate
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Course Details */}
                                            <div className="border-t pt-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-medium text-sm mb-2">Course Information</h4>
                                                        <div className="space-y-1 text-sm text-gray-600">
                                                            <div>Course ID: {course.course?.id}</div>
                                                            <div>Enrollment ID: {course.id}</div>
                                                            <div>Progress: {course.progress || 0}%</div>
                                                        </div>
                                                    </div>

                                                    {course.course && (
                                                        <div>
                                                            <h4 className="font-medium text-sm mb-2">Certificate Details</h4>
                                                            <div className="space-y-1 text-sm text-gray-600">
                                                                <div>Certificate Type: Course Completion</div>
                                                                <div>Issue Date: {endDate?.toLocaleDateString()}</div>
                                                                <div>Status: Valid</div>
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