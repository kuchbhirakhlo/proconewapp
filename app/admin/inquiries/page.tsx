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
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, where, getDocs } from 'firebase/firestore'
import { useAdmin } from '@/hooks/useAdmin'
import { useRouter } from 'next/navigation'

interface ContactInquiry {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: any
  status: string
  read: boolean
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null)
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

    const inquiriesCollection = collection(db, 'contact_inquiries')
    let q = query(inquiriesCollection, orderBy('createdAt', 'desc'))

    if (filter === 'new') {
      q = query(inquiriesCollection, where('read', '==', false), orderBy('createdAt', 'desc'))
    } else if (filter === 'read') {
      q = query(inquiriesCollection, where('read', '==', true), orderBy('createdAt', 'desc'))
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const inquiriesData: ContactInquiry[] = []
      snapshot.forEach((doc) => {
        inquiriesData.push({
          id: doc.id,
          ...doc.data(),
        } as ContactInquiry)
      })
      setInquiries(inquiriesData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [isAdmin, adminLoading, filter, router])

  const markAsRead = async (id: string, currentRead: boolean) => {
    try {
      const inquiryRef = doc(db, 'contact_inquiries', id)
      await updateDoc(inquiryRef, { read: !currentRead })
      toast({
        title: 'Success',
        description: `Marked as ${!currentRead ? 'read' : 'unread'}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update inquiry',
        variant: 'destructive',
      })
    }
  }

  const deleteInquiry = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'contact_inquiries', id))
      setDeleteId(null)
      toast({
        title: 'Success',
        description: 'Inquiry deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete inquiry',
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
        <AdminLayout title="Contact Inquiries">
    
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Inquiries</h1>
          <p className="text-gray-600">Manage and respond to user inquiries from your contact form</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All ({inquiries.length})
          </Button>
          <Button
            variant={filter === 'new' ? 'default' : 'outline'}
            onClick={() => setFilter('new')}
          >
            New ({inquiries.filter(i => !i.read).length})
          </Button>
          <Button
            variant={filter === 'read' ? 'default' : 'outline'}
            onClick={() => setFilter('read')}
          >
            Read ({inquiries.filter(i => i.read).length})
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading inquiries...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-gray-600">No inquiries found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <Card
                key={inquiry.id}
                className={`cursor-pointer transition-all ${
                  !inquiry.read ? 'border-blue-300 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedInquiry(inquiry)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          {inquiry.firstName} {inquiry.lastName}
                        </CardTitle>
                        {!inquiry.read && (
                          <Badge variant="default" className="bg-blue-600">
                            New
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        {inquiry.subject}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(inquiry.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline text-sm">
                        {inquiry.email}
                      </a>
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline text-sm">
                          {inquiry.phone}
                        </a>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">{inquiry.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedInquiry(null)}
        >
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="sticky top-0 bg-white border-b">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>
                    {selectedInquiry.firstName} {selectedInquiry.lastName}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {selectedInquiry.subject}
                  </CardDescription>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
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
                    <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">
                      {selectedInquiry.phone ? (
                        <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:underline">
                          {selectedInquiry.phone}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-gray-900">{formatDate(selectedInquiry.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge variant={selectedInquiry.read ? 'secondary' : 'default'}>
                      {selectedInquiry.read ? 'Read' : 'New'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Message</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="border-t p-4 flex gap-2 sticky bottom-0 bg-white">
              <Button
                variant="outline"
                onClick={() => markAsRead(selectedInquiry.id, selectedInquiry.read)}
                className="flex-1"
              >
                {selectedInquiry.read ? (
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
                onClick={() => setDeleteId(selectedInquiry.id)}
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                variant="default"
                onClick={() => window.open(`mailto:${selectedInquiry.email}`, '_blank')}
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
            <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this inquiry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteInquiry(deleteId)}
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
