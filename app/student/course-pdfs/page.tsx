"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import StudentLayout from "@/components/student/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Search, Eye, Calendar, BookOpen, Filter, X } from "lucide-react"
import { useStudent } from "@/hooks/useStudent"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Script from "next/script"
const PDFViewer = dynamic(() => import("@/components/pdf/pdf-viewer"), {
    ssr: false
})

interface CoursePDF {
    id: string
    title: string
    description: string
    courseIds: string[]
    courseTitles: string[]
    pdfUrl: string
    uploadedBy: string
    createdAt: any
    thumbnailUrl?: string
}

interface Course {
    id: string
    title: string
    description: string
    duration: string
    level: string
    price: string
    features: string[]
    category: string
    status: string
    createdAt?: any
    updatedAt?: any
}

export default function CoursePDFsPage() {
    const { studentData } = useStudent()
    const [pdfs, setPdfs] = useState<CoursePDF[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCourse, setSelectedCourse] = useState<string>("all")
    const [selectedPdf, setSelectedPdf] = useState<CoursePDF | null>(null)
    const [showPdfViewer, setShowPdfViewer] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (studentData?.enrolledCourses) {
                try {
                    // Fetch all PDFs
                    const pdfsSnapshot = await getDocs(collection(db, "course_pdfs"))
                    const allPdfs = pdfsSnapshot.docs.map(doc => {
                        const data = doc.data()
                        const courseIds = data.courseIds || [data.courseId] // Support both old single courseId and new courseIds array
                        return {
                            id: doc.id,
                            ...data,
                            courseIds
                        } as CoursePDF
                    })

                    // Filter PDFs for enrolled courses
                    const enrolledPdfs = allPdfs.filter(pdf =>
                        pdf.courseIds.some((courseId: string) => studentData.enrolledCourses.includes(courseId))
                    )

                    // Get course details for the PDFs
                    const coursesSnapshot = await getDocs(collection(db, "courses"))
                    const coursesData = coursesSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as Course))

                    // Add course titles to PDFs
                    const pdfsWithCourseTitles = enrolledPdfs.map(pdf => {
                        const courseTitles = pdf.courseIds.map((courseId: string) =>
                            coursesData.find(c => c.id === courseId)?.title || "Unknown Course"
                        )
                        return {
                            ...pdf,
                            courseTitles
                        }
                    })

                    setPdfs(pdfsWithCourseTitles)
                    setCourses(coursesData.filter(course =>
                        studentData.enrolledCourses.includes(course.id)
                    ))
                } catch (error) {
                    console.error("Error fetching PDFs:", error)
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchData()
    }, [studentData])

    const filteredPdfs = pdfs.filter(pdf => {
        const matchesSearch = pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pdf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pdf.courseTitles.some(title => title.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesCourse = selectedCourse === "all" || pdf.courseIds.includes(selectedCourse)
        return matchesSearch && matchesCourse
    })

    const handleViewPDF = (pdf: CoursePDF) => {
        setSelectedPdf(pdf)
        setShowPdfViewer(true)
    }

    const handleClosePdfViewer = () => {
        setShowPdfViewer(false)
        setSelectedPdf(null)
    }

    const formatDate = (date: any) => {
        if (!date) return "Unknown"
        const d = date.toDate ? date.toDate() : new Date(date)
        return d.toLocaleDateString()
    }

    return (
        <>
       
        <StudentLayout title="Course PDFs">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">Course PDFs</h1>
                        <p className="text-sm sm:text-base text-gray-600">Access course materials and study resources</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
                            {pdfs.length} Total PDFs
                        </Badge>
                        <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
                            {courses.length} Courses
                        </Badge>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search PDFs by title, description, or course..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 text-sm sm:text-base"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                <select
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                    className="flex-1 px-2 sm:px-3 py-2 border rounded-md bg-white text-sm sm:text-base"
                                >
                                    <option value="all">All Courses</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PDFs Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card key={i} className="animate-pulse">
                                <CardHeader className="pb-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-8 bg-gray-200 rounded"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : filteredPdfs.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {searchTerm || selectedCourse !== "all" ? "No PDFs found" : "No PDFs available"}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || selectedCourse !== "all"
                                    ? "Try adjusting your search or filter criteria"
                                    : "No course PDFs have been uploaded yet"
                                }
                            </p>
                            {(searchTerm || selectedCourse !== "all") && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchTerm("")
                                        setSelectedCourse("all")
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredPdfs.map((pdf) => (
                            <Card key={pdf.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-base sm:text-lg line-clamp-2 leading-tight">{pdf.title}</CardTitle>
                                            <CardDescription className="mt-1 line-clamp-2 text-sm">
                                                {pdf.description}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="outline" className="self-start sm:ml-2 text-xs">
                                            <FileText className="h-3 w-3 mr-1" />
                                            PDF
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-2 sm:space-y-3 mb-4">
                                        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1">
                                            <span className="text-gray-600">Course:</span>
                                            <div className="font-medium text-right sm:max-w-32 sm:truncate">
                                                {pdf.courseTitles.map((title, index) => (
                                                    <div key={index} title={title} className="truncate">
                                                        {title}
                                                        {index < pdf.courseTitles.length - 1 && <br />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1">
                                            <span className="text-gray-600">Uploaded:</span>
                                            <span className="flex items-center justify-start sm:justify-end">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                <span className="truncate">{formatDate(pdf.createdAt)}</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1">
                                            <span className="text-gray-600">Size:</span>
                                            <span className="text-right sm:text-left">PDF Document</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleViewPDF(pdf)}
                                            className="flex-1 bg-transparent text-xs sm:text-sm"
                                        >
                                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                            View PDF
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Course-wise PDF Summary */}
                {courses.length > 0 && (
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center text-lg sm:text-xl">
                                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                Course-wise PDF Summary
                            </CardTitle>
                            <CardDescription className="text-sm">
                                Overview of PDFs available for each course
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {courses.map((course) => {
                                    const coursePdfs = pdfs.filter(pdf => pdf.courseIds.includes(course.id))
                                    return (
                                        <div key={course.id} className="border rounded-lg p-3 sm:p-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                                                <h3 className="font-semibold text-sm sm:text-base leading-tight line-clamp-1">{course.title}</h3>
                                                <Badge variant="secondary" className="self-start sm:self-center text-xs">
                                                    {coursePdfs.length} PDF{coursePdfs.length !== 1 ? 's' : ''}
                                                </Badge>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                                                {course.description}
                                            </p>
                                            {coursePdfs.length > 0 && (
                                                <div className="space-y-1">
                                                    {coursePdfs.slice(0, 2).map((pdf) => (
                                                        <div key={pdf.id} className="text-xs text-gray-500 truncate">
                                                            • {pdf.title}
                                                        </div>
                                                    ))}
                                                    {coursePdfs.length > 2 && (
                                                        <div className="text-xs text-gray-400">
                                                            +{coursePdfs.length - 2} more
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* PDF Viewer Modal */}
                {showPdfViewer && selectedPdf && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
                        <div className="bg-white rounded-lg w-full h-full sm:h-[98vh] sm:max-h-[98vh] sm:max-w-6xl">
                            <PDFViewer
                                pdfUrl={selectedPdf.pdfUrl}
                                title={selectedPdf.title}
                                onClose={handleClosePdfViewer}
                                className="h-full rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
         </>
    )
}