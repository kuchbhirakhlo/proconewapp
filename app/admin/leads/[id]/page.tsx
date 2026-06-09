"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Calendar, User, Building, Mail, Phone, MessageCircle, FileText, Upload, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { db, storage } from "@/lib/firebase"
import { 
  getLeadById, 
  getLeadActivities, 
  getLeadAttachments,
  getLeadFollowUps,
  updateLead,
  addLeadFollowUp,
  addLeadActivity,
  uploadLeadAttachment,
  deleteLeadAttachment,
  Lead,
  LeadActivity,
  LeadAttachment
} from "@/lib/lead-management"
import { format } from "date-fns"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default function LeadDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const leadId = params?.id as string
  const [lead, setLead] = useState<Lead | null>(null)
  const [activities, setActivities] = useState<LeadActivity[]>([])
  const [attachments, setAttachments] = useState<LeadAttachment[]>([])
  const [loading, setLoading] = useState(true)
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false)
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [followUpData, setFollowUpData] = useState({
    followUpDate: "",
    followUpTime: "",
    notes: "",
    status: "Pending",
  })
  const [noteText, setNoteText] = useState("")
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchLeadData = async () => {
      if (!leadId) return
      
      try {
        const leadData = await getLeadById(leadId)
        setLead(leadData)
        
        if (leadData) {
          const [activitiesData, attachmentsData] = await Promise.all([
            getLeadActivities(leadId),
            getLeadAttachments(leadId)
          ])
          setActivities(activitiesData)
          setAttachments(attachmentsData)
        }
      } catch (error) {
        console.error("Error fetching lead:", error)
        toast({
          title: "Error",
          description: "Failed to fetch lead details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLeadData()
  }, [leadId, toast])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-emerald-100 text-emerald-800"
      case "Contacted": return "bg-violet-100 text-violet-800"
      case "Interested": return "bg-amber-100 text-amber-800"
      case "Quotation Sent": return "bg-cyan-100 text-cyan-800"
      case "Won": return "bg-green-100 text-green-800"
      case "Lost": return "bg-rose-100 text-rose-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!lead) return

    try {
      await addLeadFollowUp({
        leadId: lead.id,
        followUpDate: followUpData.followUpDate,
        followUpTime: followUpData.followUpTime,
        notes: followUpData.notes,
        status: followUpData.status,
      })

      await updateLead(lead.id, { followUpDate: followUpData.followUpDate })

      toast({
        title: "Success",
        description: "Follow-up added successfully",
      })
      setIsFollowUpOpen(false)
      setFollowUpData({
        followUpDate: "",
        followUpTime: "",
        notes: "",
        status: "Pending",
      })
      
      const activitiesData = await getLeadActivities(leadId)
      setActivities(activitiesData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add follow-up",
        variant: "destructive",
      })
    }
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!lead || !noteText.trim()) return

    try {
      await addLeadActivity(lead.id, "note_added", noteText)

      toast({
        title: "Success",
        description: "Note added successfully",
      })
      setIsNoteOpen(false)
      setNoteText("")
      
      const activitiesData = await getLeadActivities(leadId)
      setActivities(activitiesData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add note",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !lead) return

    setUploading(true)
    try {
      await uploadLeadAttachment(lead.id, file)
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      })
      
      const attachmentsData = await getLeadAttachments(leadId)
      setAttachments(attachmentsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleWhatsApp = () => {
    if (!lead) return
    const message = encodeURIComponent(`Hello ${lead.name},

Thank you for contacting Procotech Technologies.

We received your inquiry regarding ${lead.service}.

Our team will contact you shortly.

Website: https://www.procotech.in
Phone: 8383811977

Regards,
Procotech Technologies`)
    window.open(`https://wa.me/${lead.mobile}?text=${message}`, '_blank')
  }

  if (loading) {
    return (
      <AdminLayout title="Lead Details">
        <div className="text-center py-12">Loading...</div>
      </AdminLayout>
    )
  }

  if (!lead) {
    return (
      <AdminLayout title="Lead Not Found">
        <div className="text-center py-12">
          <p className="text-gray-500">Lead not found</p>
          <Button className="mt-4" onClick={() => router.push('/admin/leads')}>
            Back to Leads
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={`Lead: ${lead.name}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/admin/leads')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Leads
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Lead Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Lead ID</p>
                    <p className="font-medium">{lead.leadId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{lead.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="font-medium flex items-center gap-2">
                      {lead.mobile}
                      <Button variant="ghost" size="sm" onClick={() => window.open(`tel:${lead.mobile}`)}>
                        <Phone className="h-4 w-4" />
                      </Button>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">WhatsApp</p>
                    <p className="font-medium flex items-center gap-2">
                      {lead.whatsapp || lead.mobile}
                      <Button variant="ghost" size="sm" onClick={handleWhatsApp}>
                        <MessageCircle className="h-4 w-4 text-green-600" />
                      </Button>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium flex items-center gap-2">
                      {lead.email}
                      <Button variant="ghost" size="sm" onClick={() => window.open(`mailto:${lead.email}`)}>
                        <Mail className="h-4 w-4" />
                      </Button>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium">{lead.company || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{lead.city && lead.state ? `${lead.city}, ${lead.state}` : lead.city || lead.state || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-medium">{lead.service}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-medium">{lead.budget || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Source</p>
                    <p className="font-medium">{lead.source || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Select 
                      value={lead.status} 
                      onValueChange={(v) => updateLead(lead.id, { status: v })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["New", "Contacted", "Interested", "Quotation Sent", "Won", "Lost"].map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {lead.remarks && (
                  <div>
                    <p className="text-sm text-gray-600">Remarks</p>
                    <p className="font-medium">{lead.remarks}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Follow-Up Timeline</CardTitle>
                <CardDescription>Activity history for this lead</CardDescription>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No activities recorded yet</p>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium capitalize">{activity.activityType.replace('_', ' ')}</p>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {activity.createdAt?.toDate 
                              ? format(activity.createdAt.toDate(), 'PP p') 
                              : '-'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Attachments</span>
                  <label className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </span>
                    </Button>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                    />
                  </label>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {attachments.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No attachments uploaded</p>
                ) : (
                  <div className="space-y-2">
                    {attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{attachment.fileName}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(attachment.fileUrl, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Dialog open={isFollowUpOpen} onOpenChange={setIsFollowUpOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add Follow-Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Follow-Up</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleFollowUpSubmit} className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium">Follow-Up Date *</label>
                        <Input
                          type="date"
                          value={followUpData.followUpDate}
                          onChange={(e) => setFollowUpData({...followUpData, followUpDate: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Follow-Up Time *</label>
                        <Input
                          type="time"
                          value={followUpData.followUpTime}
                          onChange={(e) => setFollowUpData({...followUpData, followUpTime: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea
                          value={followUpData.notes}
                          onChange={(e) => setFollowUpData({...followUpData, notes: e.target.value})}
                          placeholder="Add follow-up notes..."
                        />
                      </div>
                      <Button type="submit" className="w-full">Save Follow-Up</Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isNoteOpen} onOpenChange={setIsNoteOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Internal Note</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddNote} className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium">Note *</label>
                        <Textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Add internal notes..."
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">Save Note</Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                  WhatsApp Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}