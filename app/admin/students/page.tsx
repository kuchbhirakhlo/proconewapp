"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, AlertCircle, CheckCircle, Users, Mail, Phone } from "lucide-react"
import { getStudents, createStudent, updateStudent, deleteStudent, getCourses, enrollStudent } from "@/lib/admin"

interface Student {
  id: string
  uid: string
  fullName: string
  email: string
  phone: string
  enrolledCourses: string[]
  status: string
  createdAt: any
}

interface Course {
  id: string
  title: string
}

export default function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    status: "active",
  })
  const [selectedCourse, setSelectedCourse] = useState("")
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [studentsData, coursesData] = await Promise.all([getStudents(), getCourses()])
      setStudents(studentsData as Student[])
      setCourses(coursesData as Course[])
    } catch (error) {
      console.error("Error fetching data:", error)
      setMessage({ type: "error", text: "Failed to fetch data" })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, {
          fullName: formData.fullName,
          phone: formData.phone,
          status: formData.status,
        })
        setMessage({ type: "success", text: "Student updated successfully!" })
      } else {
        await createStudent(formData)
        setMessage({ type: "success", text: "Student created successfully!" })
      }

      setIsDialogOpen(false)
      setEditingStudent(null)
      resetForm()
      fetchData()
    } catch (error: any) {
      console.error("Error saving student:", error)
      setMessage({ type: "error", text: error.message || "Failed to save student" })
    } finally {
      setLoading(false)
    }
  }

  const handleEnrollment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStudent || !selectedCourse) return

    try {
      await enrollStudent(selectedStudent.id, selectedCourse)
      setMessage({ type: "success", text: "Student enrolled successfully!" })
      setIsEnrollDialogOpen(false)
      setSelectedStudent(null)
      setSelectedCourse("")
      fetchData()
    } catch (error) {
      console.error("Error enrolling student:", error)
      setMessage({ type: "error", text: "Failed to enroll student" })
    }
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setFormData({
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      password: "",
      status: student.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (studentId: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return

    try {
      await deleteStudent(studentId)
      setMessage({ type: "success", text: "Student deleted successfully!" })
      fetchData()
    } catch (error) {
      console.error("Error deleting student:", error)
      setMessage({ type: "error", text: "Failed to delete student" })
    }
  }

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      status: "active",
    })
  }

  const openAddDialog = () => {
    setEditingStudent(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const openEnrollDialog = (student: Student) => {
    setSelectedStudent(student)
    setSelectedCourse("")
    setIsEnrollDialogOpen(true)
  }

  return (
    <AdminLayout title="Student Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Students</h2>
            <p className="text-gray-600">Manage student accounts and enrollments</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingStudent ? "Edit Student" : "Add New Student"}</DialogTitle>
                  <DialogDescription>
                    {editingStudent ? "Update student information" : "Create a new student account"}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!!editingStudent}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  {!editingStudent && (
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  )}

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
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : editingStudent ? "Update Student" : "Create Student"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enrollment Dialog */}
        <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enroll Student</DialogTitle>
              <DialogDescription>Enroll {selectedStudent?.fullName} in a course</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEnrollment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course">Select Course</Label>
                <select
                  id="course"
                  className="w-full p-2 border rounded-md"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                >
                  <option value="">Choose a course...</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEnrollDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Enroll Student</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Messages */}
        {message.text && (
          <Alert className={message.type === "error" ? "border-red-500" : "border-green-500"}>
            {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              All Students ({students.length})
            </CardTitle>
            <CardDescription>Manage student accounts and their course enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No students yet</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first student</p>
                <Button onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrolled Courses</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.fullName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {student.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {student.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === "active"
                              ? "default"
                              : student.status === "inactive"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.enrolledCourses?.length || 0} courses</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(student)}
                            className="bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEnrollDialog(student)}
                            className="bg-transparent"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(student.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
