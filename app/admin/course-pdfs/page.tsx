"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, AlertCircle, CheckCircle, FileText, Upload, X, Eye } from "lucide-react"
import { getCourses } from "@/lib/admin"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, auth } from "@/lib/firebase"
import { storage } from "@/lib/firebase"
import GoogleAds from "@/components/google-ads"

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

export default function CoursePDFsManagement() {
    const [pdfs, setPdfs] = useState<CoursePDF[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingPdf, setEditingPdf] = useState<CoursePDF | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        courseIds: [] as string[],
    })
    const [message, setMessage] = useState({ type: "", text: "" })
    const [uploadingPdf, setUploadingPdf] = useState(false)
    const [pdfFile, setPdfFile] = useState<File | null>(null)

    useEffect(() => {
        fetchPdfs()
        fetchCourses()
    }, [])

    const fetchPdfs = async () => {
        try {
            const pdfsSnapshot = await getDocs(collection(db, "course_pdfs"))
            const coursesSnapshot = await getDocs(collection(db, "courses"))
            const coursesMap = new Map(coursesSnapshot.docs.map(doc => [doc.id, doc.data().title]))

            const pdfsData = pdfsSnapshot.docs.map((doc) => {
                const data = doc.data()
                const courseIds = data.courseIds || [data.courseId] // Support both old single courseId and new courseIds array
                const courseTitles = courseIds.map((id: string) => coursesMap.get(id) || "Unknown Course")

                return {
                    id: doc.id,
                    ...data,
                    courseIds,
                    courseTitles
                } as CoursePDF
            })
            setPdfs(pdfsData)
        } catch (error) {
            console.error("Error fetching PDFs:", error)
            setMessage({ type: "error", text: "Failed to fetch PDFs" })
        } finally {
            setLoading(false)
        }
    }

    const fetchCourses = async () => {
        try {
            const coursesSnapshot = await getDocs(collection(db, "courses"))
            const coursesData = coursesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Course))
            setCourses(coursesData)
        } catch (error) {
            console.error("Error fetching courses:", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!pdfFile) {
            setMessage({ type: "error", text: "Please select a PDF file" })
            return
        }

        if (formData.courseIds.length === 0) {
            setMessage({ type: "error", text: "Please select at least one course" })
            return
        }

        setLoading(true)

        try {
            let pdfUrl = ""

            // Upload PDF to Firebase Storage
            if (pdfFile) {
                setUploadingPdf(true)
                try {
                    const storageRef = ref(storage, `course_pdfs/${Date.now()}_${pdfFile.name}`)
                    const snapshot = await uploadBytes(storageRef, pdfFile)
                    pdfUrl = await getDownloadURL(snapshot.ref)
                } catch (uploadError: unknown) {
                    console.error("Upload error:", uploadError)
                    const errorMessage = uploadError instanceof Error ? uploadError.message : String(uploadError)
                    if (errorMessage.includes('CORS')) {
                        setMessage({
                            type: "error",
                            text: "CORS error: Please run the Firebase Storage CORS setup script. See console for details."
                        })
                    } else {
                        setMessage({
                            type: "error",
                            text: "Failed to upload PDF. Please check your internet connection and try again."
                        })
                    }
                    setLoading(false)
                    setUploadingPdf(false)
                    return
                }
            }

            const pdfData = {
                title: formData.title,
                description: formData.description,
                courseIds: formData.courseIds,
                pdfUrl,
                uploadedBy: auth.currentUser?.uid || "system",
                createdAt: serverTimestamp(),
            }

            if (editingPdf) {
                await updateDoc(doc(db, "course_pdfs", editingPdf.id), pdfData)
                setMessage({ type: "success", text: "PDF updated successfully!" })
            } else {
                await addDoc(collection(db, "course_pdfs"), pdfData)
                setMessage({ type: "success", text: "PDF uploaded successfully!" })
            }

            setIsDialogOpen(false)
            setEditingPdf(null)
            resetForm()
            setPdfFile(null)
            fetchPdfs()
        } catch (error) {
            console.error("Error saving PDF:", error)
            setMessage({ type: "error", text: "Failed to save PDF" })
        } finally {
            setLoading(false)
            setUploadingPdf(false)
        }
    }

    const handleEdit = (pdf: CoursePDF) => {
        setEditingPdf(pdf)
        setFormData({
            title: pdf.title,
            description: pdf.description,
            courseIds: pdf.courseIds,
        })
        setIsDialogOpen(true)
    }

    const handleDelete = async (pdfId: string, pdfUrl: string) => {
        if (!confirm("Are you sure you want to delete this PDF?")) return

        try {
            // Delete from Firestore
            await deleteDoc(doc(db, "course_pdfs", pdfId))

            // Delete from Storage
            if (pdfUrl) {
                const storageRef = ref(storage, pdfUrl)
                await deleteObject(storageRef)
            }

            setMessage({ type: "success", text: "PDF deleted successfully!" })
            fetchPdfs()
        } catch (error) {
            console.error("Error deleting PDF:", error)
            setMessage({ type: "error", text: "Failed to delete PDF" })
        }
    }

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            courseIds: [],
        })
        setPdfFile(null)
    }

    const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validate file type
            if (file.type !== 'application/pdf') {
                setMessage({ type: "error", text: "Please select a valid PDF file" })
                return
            }

            // Validate file size (10MB)
            if (file.size > 10 * 1024 * 1024) {
                setMessage({ type: "error", text: "PDF file size must be less than 10MB" })
                return
            }

            setPdfFile(file)
            setMessage({ type: "", text: "" })
        }
    }

    const openAddDialog = () => {
        setEditingPdf(null)
        resetForm()
        setIsDialogOpen(true)
    }

    const getCourseTitle = (courseId: string) => {
        const course = courses.find(c => c.id === courseId)
        return course?.title || "Unknown Course"
    }

    return (
        <AdminLayout title="Course PDFs Management">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Course PDFs</h2>
                        <p className="text-gray-600">Manage PDF files for courses</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openAddDialog}>
                                <Plus className="h-4 w-4 mr-2" />
                                Upload PDF
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingPdf ? "Edit PDF" : "Upload New PDF"}</DialogTitle>
                                <DialogDescription>
                                    {editingPdf ? "Update PDF information" : "Upload a new PDF file for courses"}
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">PDF Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Associated Courses</Label>
                                    <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
                                        {courses.map((course) => (
                                            <div key={course.id} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`course-${course.id}`}
                                                    checked={formData.courseIds.includes(course.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFormData({
                                                                ...formData,
                                                                courseIds: [...formData.courseIds, course.id]
                                                            })
                                                        } else {
                                                            setFormData({
                                                                ...formData,
                                                                courseIds: formData.courseIds.filter(id => id !== course.id)
                                                            })
                                                        }
                                                    }}
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                />
                                                <Label
                                                    htmlFor={`course-${course.id}`}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {course.title}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                    {formData.courseIds.length === 0 && (
                                        <p className="text-sm text-red-500">Please select at least one course</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pdf">PDF File</Label>
                                    <div className="space-y-2">
                                        <Input
                                            id="pdf"
                                            type="file"
                                            accept=".pdf"
                                            onChange={handlePdfUpload}
                                            disabled={uploadingPdf}
                                            required={!editingPdf}
                                        />
                                        {pdfFile && (
                                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                <div className="flex items-center">
                                                    <FileText className="h-4 w-4 mr-2" />
                                                    <span className="text-sm">{pdfFile.name}</span>
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                                                    </span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setPdfFile(null)}
                                                    disabled={uploadingPdf}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                        {uploadingPdf && (
                                            <p className="text-sm text-blue-600">Uploading PDF...</p>
                                        )}
                                        <p className="text-xs text-gray-500">
                                            Maximum file size: 10MB. Only PDF files are allowed.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading || uploadingPdf}>
                                        {loading ? "Saving..." : editingPdf ? "Update PDF" : "Upload PDF"}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Messages */}
                {message.text && (
                    <Alert className={message.type === "error" ? "border-red-500" : "border-green-500"}>
                        {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        <AlertDescription>{message.text}</AlertDescription>
                    </Alert>
                )}

                {/* Ad Block */}
                <div className="w-full">
                    <GoogleAds
                        slot="3456789012"
                        format="horizontal"
                        className="mx-auto max-w-4xl"
                        responsive={true}
                    />
                </div>

                {/* PDFs Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="animate-pulse">
                                <CardHeader>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-8 bg-gray-200 rounded"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pdfs.map((pdf) => (
                            <Card key={pdf.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{pdf.title}</CardTitle>
                                            <CardDescription className="mt-1">{pdf.description}</CardDescription>
                                        </div>
                                        <Badge variant="outline">
                                            <FileText className="h-3 w-3 mr-1" />
                                            PDF
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Courses:</span>
                                            <div className="text-right">
                                                {pdf.courseTitles.map((title, index) => (
                                                    <div key={index} className="font-medium">
                                                        {title}
                                                        {index < pdf.courseTitles.length - 1 && <br />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Uploaded:</span>
                                            <span>
                                                {pdf.createdAt?.toDate?.()
                                                    ? new Date(pdf.createdAt.toDate()).toLocaleDateString()
                                                    : "Unknown"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Status:</span>
                                            <span className="text-green-600">Available</span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => window.open(pdf.pdfUrl, '_blank')}
                                            className="flex-1 bg-transparent"
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            View
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(pdf)}
                                            className="flex-1 bg-transparent"
                                        >
                                            <Edit className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(pdf.id, pdf.pdfUrl)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {pdfs.length === 0 && !loading && (
                    <Card>
                        <CardContent className="text-center py-12">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No PDFs yet</h3>
                            <p className="text-gray-600 mb-4">Get started by uploading your first course PDF</p>
                            <Button onClick={openAddDialog}>
                                <Plus className="h-4 w-4 mr-2" />
                                Upload PDF
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    )
}