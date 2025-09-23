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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, AlertCircle, CheckCircle, BookOpen, Upload, FileText, X } from "lucide-react"
import { getCourses, addCourse, updateCourse, deleteCourse, uploadCoursePDF, removeCoursePDF } from "@/lib/admin"

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
  pdfUrls?: string[]
  createdAt?: any
  updatedAt?: any
}

export default function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "Beginner",
    price: "",
    features: "",
    category: "Programming",
    status: "active",
  })
  const [message, setMessage] = useState({ type: "", text: "" })
  const [uploadingPdfs, setUploadingPdfs] = useState(false)
  const [pdfFiles, setPdfFiles] = useState<File[]>([])

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const coursesData = await getCourses()
      setCourses(coursesData as Course[])
    } catch (error) {
      console.error("Error fetching courses:", error)
      setMessage({ type: "error", text: "Failed to fetch courses" })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const courseData = {
        ...formData,
        features: formData.features.split("\n").filter((f) => f.trim() !== ""),
      }

      let courseId: string

      if (editingCourse) {
        await updateCourse(editingCourse.id, courseData)
        courseId = editingCourse.id
        setMessage({ type: "success", text: "Course updated successfully!" })
      } else {
        const newCourse = await addCourse(courseData)
        courseId = newCourse.id
        setMessage({ type: "success", text: "Course added successfully!" })
      }

      // Upload PDFs if any
      if (pdfFiles.length > 0) {
        setUploadingPdfs(true)
        try {
          for (const file of pdfFiles) {
            await uploadCoursePDF(courseId, file)
          }
          setMessage({ type: "success", text: `${pdfFiles.length} PDF(s) uploaded successfully!` })
        } catch (pdfError) {
          console.error("Error uploading PDFs:", pdfError)
          setMessage({ type: "error", text: "Course saved but failed to upload some PDFs" })
        } finally {
          setUploadingPdfs(false)
        }
      }

      setIsDialogOpen(false)
      setEditingCourse(null)
      resetForm()
      setPdfFiles([])
      fetchCourses()
    } catch (error) {
      console.error("Error saving course:", error)
      setMessage({ type: "error", text: "Failed to save course" })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      level: course.level,
      price: course.price,
      features: course.features.join("\n"),
      category: course.category,
      status: course.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return

    try {
      await deleteCourse(courseId)
      setMessage({ type: "success", text: "Course deleted successfully!" })
      fetchCourses()
    } catch (error) {
      console.error("Error deleting course:", error)
      setMessage({ type: "error", text: "Failed to delete course" })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      duration: "",
      level: "Beginner",
      price: "",
      features: "",
      category: "Programming",
      status: "active",
    })
    setPdfFiles([])
  }

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const pdfFiles = files.filter(file => file.type === 'application/pdf')
    setPdfFiles(prev => [...prev, ...pdfFiles])
  }

  const removePdfFile = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleRemoveCoursePdf = async (courseId: string, pdfUrl: string) => {
    if (!confirm("Are you sure you want to remove this PDF?")) return

    try {
      await removeCoursePDF(courseId, pdfUrl)
      setMessage({ type: "success", text: "PDF removed successfully!" })
      fetchCourses()
    } catch (error) {
      console.error("Error removing PDF:", error)
      setMessage({ type: "error", text: "Failed to remove PDF" })
    }
  }

  const openAddDialog = () => {
    setEditingCourse(null)
    resetForm()
    setIsDialogOpen(true)
  }

  return (
    <AdminLayout title="Course Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Courses</h2>
            <p className="text-gray-600">Manage your course catalog</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
                <DialogDescription>
                  {editingCourse ? "Update course information" : "Create a new course for students"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 6 months"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                    />
                  </div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <select
                      id="level"
                      className="w-full p-2 border rounded-md"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      placeholder="e.g., $999"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full p-2 border rounded-md"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Computer Course">Computer Course</option>
                      <option value="Web Development">Design</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Course Features (one per line)</Label>
                  <Textarea
                    id="features"
                    placeholder="HTML, CSS, JavaScript fundamentals&#10;React.js and Next.js&#10;Node.js and Express.js"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdfs">Course PDFs</Label>
                  <div className="space-y-2">
                    <Input
                      id="pdfs"
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handlePdfUpload}
                      disabled={uploadingPdfs}
                    />
                    {pdfFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Selected files:</p>
                        {pdfFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removePdfFile(index)}
                              disabled={uploadingPdfs}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    {uploadingPdfs && (
                      <p className="text-sm text-blue-600">Uploading PDFs...</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="w-full p-2 border rounded-md"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : editingCourse ? "Update Course" : "Add Course"}
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

        {/* Courses Grid */}
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
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-1">{course.description}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        course.status === "active"
                          ? "default"
                          : course.status === "inactive"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Level:</span>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold text-blue-600">{course.price}</span>
                    </div>
                    {course.pdfUrls && course.pdfUrls.length > 0 && (
                      <div className="pt-2 border-t">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">PDFs:</span>
                          <span>{course.pdfUrls.length}</span>
                        </div>
                        <div className="space-y-1">
                          {course.pdfUrls.slice(0, 2).map((pdfUrl, index) => (
                            <div key={index} className="flex items-center justify-between text-xs">
                              <div className="flex items-center">
                                <FileText className="h-3 w-3 mr-1" />
                                <span className="truncate max-w-32">{pdfUrl.split('/').pop()}</span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveCoursePdf(course.id, pdfUrl)}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          {course.pdfUrls.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{course.pdfUrls.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(course)}
                      className="flex-1 bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(course.id)}
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

        {courses.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first course</p>
              <Button onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
