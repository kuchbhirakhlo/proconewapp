'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, Calendar, Eye, EyeOff } from 'lucide-react'
import AdminLayout from "@/components/admin/admin-layout"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, where } from 'firebase/firestore'
import { useAdmin } from '@/hooks/useAdmin'
import { useRouter } from 'next/navigation'

interface CourseEnrollment {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  courseId: string
  courseName: string
  createdAt: any
  status: string
  read: boolean
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEnrollment, setSelectedEnrollment] = useState<CourseEnrollment | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'new' | 'read'>('all')
  const { toast } = useToast()
  const { isAdmin, loading: adminLoading } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      router.push('/login')
      return
    }

    if (!isAdmin) return

    const enrollmentsCollection = collection(db, 'course_enrollments')
    let q = query(enrollmentsCollection, orderBy('createdAt', 'desc'))

    if (filter === 'new') {
      q = query(enrollmentsCollection, where('read', '==', false), orderBy('createdAt', 'desc'))
    } else if (filter === 'read') {
      q = query(enrollmentsCollection, where('read', '==', true), orderBy('createdAt', 'desc'))
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const enrollmentsData: CourseEnrollment[] = []
      snapshot.forEach((doc) => {
        enrollmentsData.push({
          id: doc.id,
          ...doc.data(),
        } as CourseEnrollment)
      })
      setEnrollments(enrollmentsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [isAdmin, adminLoading, filter, router])

  const markAsRead = async (id: string, currentRead: boolean) => {
    try {
      const enrollmentRef = doc(db, 'course_enrollments', id)
      await updateDoc(enrollmentRef, { read: !currentRead })
      toast({
        title: 'Success',
        description: `Marked as ${!currentRead ? 'read' : 'unread'}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update enrollment',
        variant: 'destructive',
      })
    }
  }

  const deleteEnrollment = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'course_enrollments', id))
      setDeleteId(null)
      toast({
        title: 'Success',
        description: 'Enrollment deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete enrollment',
        variant: 'destructive',
      })
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate?.() || new Date(timestamp)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  if (adminLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <AdminLayout title="Course Enrollments">
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Course Enrollments</h1>
          <p className="text-gray-600">Manage and track course enrollment requests from interested students</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All ({enrollments.length})
          </Button>
          <Button
            variant={filter === 'new' ? 'default' : 'outline'}
            onClick={() => setFilter('new')}
          >
            New ({enrollments.filter(e => !e.read).length})
          </Button>
          <Button
            variant={filter === 'read' ? 'default' : 'outline'}
            onClick={() => setFilter('read')}
          >
            Read ({enrollments.filter(e => e.read).length})
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading enrollments...</p>
          </div>
        ) : enrollments.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-gray-600">No enrollments found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {enrollments.map((enrollment) => (
              <Card
                key={enrollment.id}
                className={`cursor-pointer transition-all ${
                  !enrollment.read ? 'border-blue-300 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedEnrollment(enrollment)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          {enrollment.firstName} {enrollment.lastName}
                        </CardTitle>
                        {!enrollment.read && (
                          <Badge variant="default" className="bg-blue-600">
                            New
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        Interested in: <span className="font-semibold text-gray-700">{enrollment.courseName}</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(enrollment.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${enrollment.email}`} className="text-blue-600 hover:underline text-sm">
                        {enrollment.email}
                      </a>
                    </div>
                    {enrollment.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a href={`tel:${enrollment.phone}`} className="text-blue-600 hover:underline text-sm">
                          {enrollment.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEnrollment && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEnrollment(null)}
        >
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="sticky top-0 bg-white border-b">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>
                    {selectedEnrollment.firstName} {selectedEnrollment.lastName}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Course: {selectedEnrollment.courseName}
                  </CardDescription>
                </div>
                <button
                  onClick={() => setSelectedEnrollment(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href={`mailto:${selectedEnrollment.email}`} className="text-blue-600 hover:underline">
                      {selectedEnrollment.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">
                      {selectedEnrollment.phone ? (
                        <a href={`tel:${selectedEnrollment.phone}`} className="text-blue-600 hover:underline">
                          {selectedEnrollment.phone}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Course</p>
                    <p className="text-gray-900">{selectedEnrollment.courseName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-gray-900">{formatDate(selectedEnrollment.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge variant={selectedEnrollment.read ? 'secondary' : 'default'}>
                      {selectedEnrollment.read ? 'Read' : 'New'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="border-t p-4 flex gap-2 sticky bottom-0 bg-white">
              <Button
                variant="outline"
                onClick={() => markAsRead(selectedEnrollment.id, selectedEnrollment.read)}
                className="flex-1"
              >
                {selectedEnrollment.read ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Mark as Unread
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Mark as Read
                  </>
                )}
              </Button>
              <Button
                variant="destructive"
                onClick={() => setDeleteId(selectedEnrollment.id)}
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                variant="default"
                onClick={() => window.open(`mailto:${selectedEnrollment.email}`, '_blank')}
                className="flex-1"
              >
                Reply
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Enrollment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this enrollment request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteEnrollment(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </AdminLayout>
  )
}
