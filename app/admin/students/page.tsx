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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, AlertCircle, CheckCircle, Users, Mail, Phone, Search, Filter, UserCheck, UserPlus, GraduationCap, Activity, TrendingUp, UserX, BookOpen, Calendar, MoreHorizontal, Eye, Settings, Sparkles, X, Check, Award, Shield, ShieldCheck } from "lucide-react"
import { getStudents, createStudent, updateStudent, deleteStudent, getCourses, enrollStudent, assignCoursesToStudent, getStudentEnrollmentsWithApproval, approveStudentCertificate, revokeStudentCertificate } from "@/lib/admin"

interface Student {
  id: string
  uid: string
  fullName: string
  email: string
  phone: string
  aadharNumber?: string
  profilePicture?: string
  dateOfBirth?: string
  enrolledCourses: string[]
  assignedCourses?: string[]
  status: string
  createdAt: any
  updatedAt?: any
}

interface Course {
  id: string
  title: string
}

interface EnrollmentWithCourse {
  id: string
  studentId: string
  courseId: string
  status: string
  progress: number
  enrolledAt: any
  approvedForCertificate?: boolean
  certificateApprovedAt?: any
  course: Course | null
}

export default function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [formData, setFormData] = useState<{
    fullName: string
    email: string
    phone: string
    password: string
    aadharNumber: string
    dateOfBirth: string
    profilePicture: string
    status: string
    assignedCourses: string[]
    autoAssignCourses: boolean
  }>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    aadharNumber: "",
    dateOfBirth: "",
    profilePicture: "",
    status: "active",
    assignedCourses: [],
    autoAssignCourses: false,
  })
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [message, setMessage] = useState({ type: "", text: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectedStudentEnrollments, setSelectedStudentEnrollments] = useState<EnrollmentWithCourse[]>([])
  const [isCertificateDialogOpen, setIsCertificateDialogOpen] = useState(false)
  const [loadingCertificates, setLoadingCertificates] = useState(false)

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
          aadharNumber: formData.aadharNumber,
          dateOfBirth: formData.dateOfBirth,
          profilePicture: formData.profilePicture,
          status: formData.status,
          assignedCourses: formData.assignedCourses,
        })
        setMessage({ type: "success", text: "Student updated successfully!" })
      } else {
        const studentData = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          aadharNumber: formData.aadharNumber,
          dateOfBirth: formData.dateOfBirth,
          profilePicture: formData.profilePicture,
          password: formData.password,
          status: formData.status,
          assignedCourses: formData.assignedCourses,
          autoAssignCourses: formData.autoAssignCourses,
        }
        await createStudent(studentData)
        setMessage({ type: "success", text: "Student created successfully!" })
      }

      setIsDialogOpen(false)
      setEditingStudent(null)
      resetForm()
      fetchData()
    } catch (error: any) {
      console.error("Error saving student:", error)
      const errorMessage = error.message || "Failed to save student"

      // Handle specific validation errors
      if (errorMessage.includes("Validation failed")) {
        setMessage({ type: "error", text: errorMessage })
      } else if (errorMessage.includes("already exists")) {
        setMessage({ type: "error", text: errorMessage })
      } else if (errorMessage.includes("not active")) {
        setMessage({ type: "error", text: errorMessage })
      } else {
        setMessage({ type: "error", text: errorMessage })
      }
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
    } catch (error: any) {
      console.error("Error enrolling student:", error)
      setMessage({ type: "error", text: error.message || "Failed to enroll student" })
    }
  }

  const handleBulkAssignment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStudent || selectedCourses.length === 0) return

    try {
      const result = await assignCoursesToStudent(selectedStudent.id, selectedCourses)
      setMessage({ type: "success", text: result.message || "Courses assigned successfully!" })
      setIsEnrollDialogOpen(false)
      setSelectedStudent(null)
      setSelectedCourses([])
      fetchData()
    } catch (error: any) {
      console.error("Error assigning courses:", error)
      setMessage({ type: "error", text: error.message || "Failed to assign courses" })
    }
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setFormData({
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      password: "",
      aadharNumber: student.aadharNumber || "",
      dateOfBirth: student.dateOfBirth || "",
      profilePicture: student.profilePicture || "",
      status: student.status,
      assignedCourses: student.assignedCourses || [],
      autoAssignCourses: false,
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
      aadharNumber: "",
      dateOfBirth: "",
      profilePicture: "",
      status: "active",
      assignedCourses: [],
      autoAssignCourses: false,
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

  const openCertificateDialog = (student: Student) => {
    setSelectedStudent(student)
    fetchStudentEnrollments(student.id)
    setIsCertificateDialogOpen(true)
  }

  const fetchStudentEnrollments = async (studentId: string) => {
    setLoadingCertificates(true)
    try {
      const enrollments = await getStudentEnrollmentsWithApproval(studentId)
      setSelectedStudentEnrollments(enrollments as EnrollmentWithCourse[])
    } catch (error) {
      console.error("Error fetching student enrollments:", error)
      setMessage({ type: "error", text: "Failed to fetch student enrollments" })
    } finally {
      setLoadingCertificates(false)
    }
  }

  const handleApproveCertificate = async (enrollmentId: string, courseId: string) => {
    if (!selectedStudent) return

    try {
      await approveStudentCertificate(selectedStudent.id, courseId)
      setMessage({ type: "success", text: "Certificate approved successfully!" })
      // Refresh the enrollments list
      fetchStudentEnrollments(selectedStudent.id)
    } catch (error: any) {
      console.error("Error approving certificate:", error)
      setMessage({ type: "error", text: error.message || "Failed to approve certificate" })
    }
  }

  const handleRevokeCertificate = async (enrollmentId: string, courseId: string) => {
    if (!selectedStudent) return

    try {
      await revokeStudentCertificate(selectedStudent.id, courseId)
      setMessage({ type: "success", text: "Certificate approval revoked!" })
      // Refresh the enrollments list
      fetchStudentEnrollments(selectedStudent.id)
    } catch (error: any) {
      console.error("Error revoking certificate:", error)
      setMessage({ type: "error", text: error.message || "Failed to revoke certificate approval" })
    }
  }

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Calculate statistics
  const totalStudents = students.length
  const activeStudents = students.filter(s => s.status === "active").length
  const inactiveStudents = students.filter(s => s.status === "inactive").length
  const suspendedStudents = students.filter(s => s.status === "suspended").length
  const totalEnrollments = students.reduce((acc, student) => acc + (student.enrolledCourses?.length || 0), 0)

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <AdminLayout title="Student Management">
      <div className="space-y-8">
        {/* Modern Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Student Management</h1>
                <p className="text-blue-100 text-lg">Manage student accounts and course enrollments</p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalStudents}</div>
                  <div className="text-blue-200 text-sm">Total Students</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{activeStudents}</div>
                  <div className="text-blue-200 text-sm">Active</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
        </div>

        {/* Modern Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
            <CardContent className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Students</p>
                  <p className="text-3xl font-bold">{totalStudents}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-blue-100 text-sm">+12% this month</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <Users className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600"></div>
            <CardContent className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Students</p>
                  <p className="text-3xl font-bold">{activeStudents}</p>
                  <div className="flex items-center mt-2">
                    <Activity className="h-4 w-4 mr-1" />
                    <span className="text-green-100 text-sm">{Math.round((activeStudents / totalStudents) * 100)}% active rate</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <UserCheck className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600"></div>
            <CardContent className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Inactive Students</p>
                  <p className="text-3xl font-bold">{inactiveStudents}</p>
                  <div className="flex items-center mt-2">
                    <UserX className="h-4 w-4 mr-1" />
                    <span className="text-orange-100 text-sm">Needs attention</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <UserPlus className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600"></div>
            <CardContent className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Enrollments</p>
                  <p className="text-3xl font-bold">{totalEnrollments}</p>
                  <div className="flex items-center mt-2">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span className="text-purple-100 text-sm">Avg {totalStudents > 0 ? Math.round(totalEnrollments / totalStudents) : 0} per student</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <GraduationCap className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search and Filter Section */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search students by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 h-12 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={openAddDialog} className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="space-y-4 pb-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <DialogTitle className="text-2xl">{editingStudent ? "Edit Student" : "Add New Student"}</DialogTitle>
                          <DialogDescription className="text-base">
                            {editingStudent ? "Update student information and course assignments" : "Create a new student account with course enrollments"}
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Basic Information Section */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="h-px bg-gradient-to-r from-blue-500 to-purple-500 flex-1"></div>
                          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                          <div className="h-px bg-gradient-to-r from-purple-500 to-blue-500 flex-1"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                            <Input
                              id="fullName"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              className="h-11 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter full name"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              disabled={!!editingStudent}
                              className="h-11 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
                              placeholder="student@example.com"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="h-11 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
                              placeholder="+1 (555) 123-4567"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">Date of Birth</Label>
                            <Input
                              id="dateOfBirth"
                              type="date"
                              value={formData.dateOfBirth}
                              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                              className="h-11 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="aadharNumber" className="text-sm font-medium text-gray-700">Aadhar Number</Label>
                            <Input
                              id="aadharNumber"
                              value={formData.aadharNumber}
                              onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
                              className="h-11 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
                              placeholder="XXXX XXXX XXXX"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="profilePicture" className="text-sm font-medium text-gray-700">Profile Picture URL</Label>
                            <Input
                              id="profilePicture"
                              type="url"
                              value={formData.profilePicture}
                              onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                              className="h-11 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
                              placeholder="https://example.com/photo.jpg"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
                            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                              <SelectTrigger className="h-11 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">✅ Active</SelectItem>
                                <SelectItem value="inactive">⏸️ Inactive</SelectItem>
                                <SelectItem value="suspended">🚫 Suspended</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {!editingStudent && (
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              value={formData.password}
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                              className="h-11 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter secure password"
                              required
                            />
                          </div>
                        )}
                      </div>

                      {/* Course Assignment Section */}
                      <div className="space-y-4 border-t pt-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-medium">Course Assignment</Label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="autoAssign"
                              checked={formData.autoAssignCourses}
                              onChange={(e) => setFormData({ ...formData, autoAssignCourses: e.target.checked })}
                            />
                            <Label htmlFor="autoAssign" className="text-sm">Auto-assign courses</Label>
                          </div>
                        </div>

                        {!formData.autoAssignCourses && (
                          <div className="space-y-2">
                            <Label htmlFor="courses">Select Courses to Assign</Label>
                            <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                              {courses.map((course) => (
                                <div key={course.id} className="flex items-center space-x-2 py-1">
                                  <input
                                    type="checkbox"
                                    id={`course-${course.id}`}
                                    checked={formData.assignedCourses.includes(course.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFormData({
                                          ...formData,
                                          assignedCourses: [...formData.assignedCourses, course.id]
                                        })
                                      } else {
                                        setFormData({
                                          ...formData,
                                          assignedCourses: formData.assignedCourses.filter(id => id !== course.id)
                                        })
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`course-${course.id}`} className="text-sm">
                                    {course.title}
                                  </Label>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">
                              {formData.assignedCourses.length} course(s) selected
                            </p>
                          </div>
                        )}

                        {formData.autoAssignCourses && (
                          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                            <p className="text-sm text-blue-800">
                              <strong>Auto-assignment:</strong> Student will be automatically enrolled in all active courses.
                              This is recommended for new students to ensure they have access to all available content.
                            </p>
                          </div>
                        )}
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

                {/* Certificate Approval Dialog */}
                <Dialog open={isCertificateDialogOpen} onOpenChange={setIsCertificateDialogOpen}>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="space-y-4 pb-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <DialogTitle className="text-2xl">Certificate Management</DialogTitle>
                          <DialogDescription className="text-base">
                            Manage certificate approvals for {selectedStudent?.fullName}
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>

                    <div className="space-y-4">
                      {loadingCertificates ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                              <div className="h-20 bg-gray-200 rounded-lg"></div>
                            </div>
                          ))}
                        </div>
                      ) : selectedStudentEnrollments.length === 0 ? (
                        <div className="text-center py-8">
                          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No enrollments found</h3>
                          <p className="text-gray-600">This student doesn't have any course enrollments yet.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedStudentEnrollments.map((enrollment) => (
                            <Card key={enrollment.id} className="border-0 shadow-sm">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <h4 className="font-semibold text-lg">
                                        {enrollment.course?.title || "Unknown Course"}
                                      </h4>
                                      <Badge
                                        className={
                                          enrollment.approvedForCertificate
                                            ? "bg-green-100 text-green-800 border-green-300"
                                            : "bg-yellow-100 text-yellow-800 border-yellow-300"
                                        }
                                      >
                                        {enrollment.approvedForCertificate ? (
                                          <>
                                            <ShieldCheck className="h-3 w-3 mr-1" />
                                            Approved
                                          </>
                                        ) : (
                                          <>
                                            <Shield className="h-3 w-3 mr-1" />
                                            Pending
                                          </>
                                        )}
                                      </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                      <div>
                                        <span className="font-medium">Enrollment ID:</span>
                                        <div className="font-mono text-xs">{enrollment.id.slice(0, 8)}...</div>
                                      </div>
                                      <div>
                                        <span className="font-medium">Progress:</span>
                                        <div>{enrollment.progress || 0}%</div>
                                      </div>
                                      <div>
                                        <span className="font-medium">Enrolled:</span>
                                        <div>{enrollment.enrolledAt?.toDate?.()?.toLocaleDateString() || "N/A"}</div>
                                      </div>
                                      {enrollment.certificateApprovedAt && (
                                        <div>
                                          <span className="font-medium">Approved:</span>
                                          <div>{enrollment.certificateApprovedAt?.toDate?.()?.toLocaleDateString() || "N/A"}</div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex space-x-2 ml-4">
                                    {enrollment.approvedForCertificate ? (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleRevokeCertificate(enrollment.id, enrollment.courseId)}
                                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-300"
                                      >
                                        <X className="h-4 w-4 mr-1" />
                                        Revoke
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        onClick={() => handleApproveCertificate(enrollment.id, enrollment.courseId)}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                      >
                                        <Check className="h-4 w-4 mr-1" />
                                        Approve
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsCertificateDialogOpen(false)}>
                        Close
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        {message.text && (
          <Alert className={message.type === "error" ? "border-red-500" : "border-green-500"}>
            {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Students List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Students ({filteredStudents.length})
              </div>
              {selectedStudents.length > 0 && (
                <Badge variant="secondary">{selectedStudents.length} selected</Badge>
              )}
            </CardTitle>
            <CardDescription>Manage student accounts and their course enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 mb-4">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || statusFilter !== "all" ? "No students found" : "No students yet"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by adding your first student"
                  }
                </p>
                {(searchTerm || statusFilter !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
                {!searchTerm && statusFilter === "all" && (
                  <div className="mt-4">
                    <Button onClick={openAddDialog}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Student
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <input
                            type="checkbox"
                            checked={selectedStudents.length === filteredStudents.length}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedStudents(filteredStudents.map(s => s.id))
                              } else {
                                setSelectedStudents([])
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        </TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedStudents([...selectedStudents, student.id])
                                } else {
                                  setSelectedStudents(selectedStudents.filter(id => id !== student.id))
                                }
                              }}
                              className="rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={student.profilePicture} alt={student.fullName} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                  {getInitials(student.fullName)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.fullName}</div>
                                <div className="text-sm text-gray-500">ID: {student.id.slice(0, 8)}...</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                {student.email}
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                {student.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(student.status)}>
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{student.enrolledCourses?.length || 0} courses</Badge>
                              {student.enrolledCourses && student.enrolledCourses.length > 0 && (
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${Math.min((student.enrolledCourses.length / courses.length) * 100, 100)}%` }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(student)}
                                className="bg-transparent hover:bg-blue-50 hover:border-blue-300"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEnrollDialog(student)}
                                className="bg-transparent hover:bg-green-50 hover:border-green-300"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openCertificateDialog(student)}
                                className="bg-transparent hover:bg-purple-50 hover:border-purple-300"
                              >
                                <Award className="h-4 w-4" />
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
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {filteredStudents.map((student) => (
                    <Card key={student.id} className="hover:shadow-md transition-shadow border-0 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedStudents([...selectedStudents, student.id])
                                } else {
                                  setSelectedStudents(selectedStudents.filter(id => id !== student.id))
                                }
                              }}
                              className="rounded border-gray-300 mt-1"
                            />
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={student.profilePicture} alt={student.fullName} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                {getInitials(student.fullName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{student.fullName}</CardTitle>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <Mail className="h-3 w-3 mr-1" />
                                {student.email}
                              </div>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(student.status)} self-start`}>
                            {student.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{student.phone}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Enrolled Courses:</span>
                            <Badge variant="outline">{student.enrolledCourses?.length || 0} courses</Badge>
                          </div>
                          {student.enrolledCourses && student.enrolledCourses.length > 0 && (
                            <div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                  style={{ width: `${Math.min((student.enrolledCourses.length / courses.length) * 100, 100)}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {Math.round((student.enrolledCourses.length / courses.length) * 100)}% of available courses
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(student)}
                            className="flex-1 bg-transparent hover:bg-blue-50 hover:border-blue-300"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEnrollDialog(student)}
                            className="flex-1 bg-transparent hover:bg-green-50 hover:border-green-300"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Enroll
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openCertificateDialog(student)}
                            className="flex-1 bg-transparent hover:bg-purple-50 hover:border-purple-300"
                          >
                            <Award className="h-4 w-4 mr-1" />
                            Certificates
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
