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
  DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertCircle, CheckCircle, Search, Filter, DollarSign, TrendingUp, IndianRupee } from "lucide-react"
import { getStudents, updateStudentFee } from "@/lib/admin"

interface Student {
  id: string
  uid: string
  fullName: string
  email: string
  phone: string
  courseFee?: number
  feeSubmitted?: number
  feeRemaining?: number
  status: string
  createdAt: any
}

export default function FeesManagement() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [formData, setFormData] = useState<{
    courseFee: string
    feeSubmitted: string
  }>({
    courseFee: "",
    feeSubmitted: "",
  })
  const [message, setMessage] = useState({ type: "", text: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const studentsData = await getStudents()
      setStudents(studentsData as Student[])
    } catch (error) {
      console.error("Error fetching data:", error)
      setMessage({ type: "error", text: "Failed to fetch data" })
    } finally {
      setLoading(false)
    }
  }

  const calculateRemainingFee = (courseFee: number, feeSubmitted: number) => {
    return Math.max(0, courseFee - feeSubmitted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!editingStudent) return

      const courseFee = parseFloat(formData.courseFee) || 0
      const feeSubmitted = parseFloat(formData.feeSubmitted) || 0
      const feeRemaining = calculateRemainingFee(courseFee, feeSubmitted)

      await updateStudentFee(editingStudent.id, {
        courseFee,
        feeSubmitted,
        feeRemaining,
      })

      setMessage({ type: "success", text: "Fee structure updated successfully!" })
      setIsDialogOpen(false)
      setEditingStudent(null)
      resetForm()
      fetchData()
    } catch (error: any) {
      console.error("Error updating fee:", error)
      setMessage({ type: "error", text: error.message || "Failed to update fee structure" })
    } finally {
      setLoading(false)
    }
  }

  const handleAddFee = (student: Student) => {
    setEditingStudent(student)
    setFormData({
      courseFee: student.courseFee?.toString() || "",
      feeSubmitted: student.feeSubmitted?.toString() || "",
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      courseFee: "",
      feeSubmitted: "",
    })
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalCourseFee = students.reduce((acc, s) => acc + (s.courseFee || 0), 0)
  const totalFeeSubmitted = students.reduce((acc, s) => acc + (s.feeSubmitted || 0), 0)
  const totalFeeRemaining = students.reduce((acc, s) => acc + (s.feeRemaining || 0), 0)
  const collectionRate = totalCourseFee > 0 ? Math.round((totalFeeSubmitted / totalCourseFee) * 100) : 0

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getPaymentStatusColor = (feeRemaining: number, courseFee: number) => {
    if (feeRemaining === 0) return 'bg-green-100 text-green-800'
    if (!courseFee) return 'bg-gray-100 text-gray-800'
    const paidPercentage = (courseFee - feeRemaining) / courseFee
    if (paidPercentage >= 0.75) return 'bg-blue-100 text-blue-800'
    if (paidPercentage >= 0.50) return 'bg-yellow-100 text-yellow-800'
    if (paidPercentage > 0) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
  }

  const getPaymentStatus = (feeRemaining: number, courseFee: number) => {
    if (feeRemaining === 0) return 'Paid'
    if (!courseFee) return 'Not Set'
    const paidPercentage = (courseFee - feeRemaining) / courseFee
    if (paidPercentage >= 0.75) return 'Almost Paid'
    if (paidPercentage >= 0.50) return 'Half Paid'
    if (paidPercentage > 0) return 'Partial'
    return 'Unpaid'
  }

  return (
    <AdminLayout title="Fee Management">
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-8 text-white">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Fee Management</h1>
                <p className="text-emerald-100 text-lg">Track and manage student fee payments</p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">₹{totalFeeSubmitted.toLocaleString()}</div>
                  <div className="text-emerald-200 text-sm">Collected</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹{totalFeeRemaining.toLocaleString()}</div>
                  <div className="text-emerald-200 text-sm">Pending</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600"></div>
            <CardContent className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Total Course Fee</p>
                  <p className="text-3xl font-bold">₹{totalCourseFee.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <DollarSign className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600"></div>
            <CardContent className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Fee Collected</p>
                  <p className="text-3xl font-bold">₹{totalFeeSubmitted.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-green-100 text-sm">{collectionRate}% collection rate</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <IndianRupee className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600"></div>
            <CardContent className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Fee Pending</p>
                  <p className="text-3xl font-bold">₹{totalFeeRemaining.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <AlertCircle className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600"></div>
            <CardContent className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Collection Progress</p>
                  <p className="text-3xl font-bold">{collectionRate}%</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <TrendingUp className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                    className="pl-12 h-12 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 h-12 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500">
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
              </div>
            </div>
          </CardContent>
        </Card>

        {message.text && (
          <Alert className={message.type === "error" ? "border-red-500" : "border-green-500"}>
            {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Update Fee Structure</DialogTitle>
              <DialogDescription>
                Update course fee and fee submitted for {editingStudent?.fullName}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courseFee">Course Fee (₹)</Label>
                <Input
                  id="courseFee"
                  type="number"
                  value={formData.courseFee}
                  onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })}
                  placeholder="Enter total course fee"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feeSubmitted">Fee Submitted (₹)</Label>
                <Input
                  id="feeSubmitted"
                  type="number"
                  value={formData.feeSubmitted}
                  onChange={(e) => setFormData({ ...formData, feeSubmitted: e.target.value })}
                  placeholder="Enter fee submitted"
                  required
                />
              </div>

              {formData.courseFee && formData.feeSubmitted && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-emerald-800">Remaining Fee:</span>
                    <span className="font-bold text-emerald-800">
                      ₹{calculateRemainingFee(
                        parseFloat(formData.courseFee) || 0,
                        parseFloat(formData.feeSubmitted) || 0
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Update Fee"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Student Fees ({filteredStudents.length})
              </div>
            </CardTitle>
            <CardDescription>Manage fee structure and payment tracking for all students</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            ) : (
              <>
                <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Course Fee</TableHead>
                      <TableHead>Fee Submitted</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
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
                            <div className="text-sm">{student.email}</div>
                            <div className="text-sm text-gray-500">{student.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">₹{(student.courseFee || 0).toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-green-600">₹{(student.feeSubmitted || 0).toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-orange-600">₹{(student.feeRemaining || 0).toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(student.feeRemaining || 0, student.courseFee || 0)}>
                            {getPaymentStatus(student.feeRemaining || 0, student.courseFee || 0)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" onClick={() => handleAddFee(student)}>
                            Update Fee
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {filteredStudents.map((student) => (
                  <Card key={student.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                              {getInitials(student.fullName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.fullName}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                        <Badge className={getPaymentStatusColor(student.feeRemaining || 0, student.courseFee || 0)}>
                          {getPaymentStatus(student.feeRemaining || 0, student.courseFee || 0)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <div className="text-gray-500">Course Fee</div>
                          <div className="font-medium">₹{(student.courseFee || 0).toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Submitted</div>
                          <div className="font-medium text-green-600">₹{(student.feeSubmitted || 0).toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Remaining</div>
                          <div className="font-medium text-orange-600">₹{(student.feeRemaining || 0).toLocaleString()}</div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full" onClick={() => handleAddFee(student)}>
                        Update Fee
                      </Button>
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
