"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, MessageCircle, Eye, Edit, Trash2, Calendar, FileDown, FileSpreadsheet, UserCheck, Users, UserPlus, Target, FileText as FileTextIcon, Award, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, where, getDocs } from "firebase/firestore"
import { useAdmin } from "@/hooks/useAdmin"
import { useRouter } from "next/navigation"
import { 
  SERVICE_OPTIONS, 
  SOURCE_OPTIONS, 
  STATUS_OPTIONS, 
  addLead, 
  updateLead,
  deleteLead,
  Lead,
  getLeadStats
} from "@/lib/lead-management"
import { format } from "date-fns"

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    interestedLeads: 0,
    quotationSentLeads: 0,
    wonLeads: 0,
    lostLeads: 0,
    todaysFollowUps: 0,
  })
  const [loading, setLoading] = useState(true)
  const [loadingStats, setLoadingStats] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteLeadObj, setDeleteLeadObj] = useState<Lead | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false)
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
  const [followUpData, setFollowUpData] = useState({
    followUpDate: "",
    followUpTime: "",
    notes: "",
    status: "Pending",
  })
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    email: "",
    company: "",
    city: "",
    state: "",
    service: "",
    source: "",
    status: "New",
    budget: "",
    followUpDate: "",
    assignedTo: "",
    remarks: "",
  })
  const { toast } = useToast()
  const { isAdmin, loading: adminLoading } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      router.push('/login')
      return
    }

    if (!isAdmin) return

    // Fetch stats
    const fetchStats = async () => {
      try {
        const leadStats = await getLeadStats()
        setStats(leadStats)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoadingStats(false)
      }
    }
    fetchStats()

    const leadsCollection = collection(db, "leads")
    let q = query(leadsCollection, orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Lead))
      setLeads(leadsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [isAdmin, adminLoading, router])

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesService = serviceFilter === "all" || lead.service === serviceFilter
    
    let matchesDate = true
    if (dateFilter !== "all") {
      const leadDate = lead.createdAt?.toDate?.() || new Date(lead.createdAt)
      const today = new Date()
      const startOfDay = new Date(today.setHours(0, 0, 0, 0))
      
      if (dateFilter === "today") {
        matchesDate = leadDate >= startOfDay
      } else if (dateFilter === "week") {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        matchesDate = leadDate >= weekAgo
      } else if (dateFilter === "month") {
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        matchesDate = leadDate >= monthAgo
      }
    }

    return matchesSearch && matchesStatus && matchesService && matchesDate
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addLead(formData)
      toast({
        title: "Success",
        description: "Lead added successfully",
      })
      setIsAddModalOpen(false)
      setFormData({
        name: "",
        mobile: "",
        whatsapp: "",
        email: "",
        company: "",
        city: "",
        state: "",
        service: "",
        source: "",
        status: "New",
        budget: "",
        followUpDate: "",
        assignedTo: "",
        remarks: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add lead",
        variant: "destructive",
      })
    }
  }

  const handleSaveAndAddFollowUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { id } = await addLead(formData)
      toast({
        title: "Success",
        description: "Lead added successfully",
      })
      setFormData({
        name: "",
        mobile: "",
        whatsapp: "",
        email: "",
        company: "",
        city: "",
        state: "",
        service: "",
        source: "",
        status: "New",
        budget: "",
        followUpDate: "",
        assignedTo: "",
        remarks: "",
      })
      setSelectedLeadId(id)
      setIsAddModalOpen(false)
      setIsFollowUpModalOpen(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add lead",
        variant: "destructive",
      })
    }
  }

  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedLeadId) return

    try {
      const { addLeadFollowUp } = await import("@/lib/lead-management")
      await addLeadFollowUp({
        leadId: selectedLeadId,
        followUpDate: followUpData.followUpDate,
        followUpTime: followUpData.followUpTime,
        notes: followUpData.notes,
        status: followUpData.status,
      })

      await updateLead(selectedLeadId, { followUpDate: followUpData.followUpDate })

      toast({
        title: "Success",
        description: "Follow-up added successfully",
      })
      setIsFollowUpModalOpen(false)
      setFollowUpData({
        followUpDate: "",
        followUpTime: "",
        notes: "",
        status: "Pending",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add follow-up",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteLead(deleteId)
      setDeleteId(null)
      setDeleteLeadObj(null)
      toast({
        title: "Success",
        description: "Lead deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete lead",
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await updateLead(leadId, { status: newStatus })
      
      const { addLeadActivity } = await import("@/lib/lead-management")
      await addLeadActivity(leadId, "status_changed", `Status changed to ${newStatus}`)

      toast({
        title: "Success",
        description: `Status updated to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    }
  }

  const handleConvertToCustomer = async (leadId: string) => {
    try {
      await updateLead(leadId, { status: "Won" })
      
      const { addLeadActivity } = await import("@/lib/lead-management")
      await addLeadActivity(leadId, "converted", "Lead converted to customer")

      toast({
        title: "Success",
        description: "Lead converted to customer",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert lead",
        variant: "destructive",
      })
    }
  }

  const handleWhatsAppClick = (mobile: string, name: string, service: string) => {
    const message = encodeURIComponent(`Hello ${name},

Thank you for contacting Procotech Technologies.

We received your inquiry regarding ${service}.

Our team will contact you shortly.

Website: https://www.procotech.in
Phone: 8383811977

Regards,
Procotech Technologies`)
    window.open(`https://wa.me/${mobile}?text=${message}`, '_blank')
  }

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

  if (adminLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <AdminLayout title="Leads Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        {!loadingStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Leads", value: stats.totalLeads, icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
              { title: "New Leads", value: stats.newLeads, icon: UserPlus, color: "text-emerald-600", bgColor: "bg-emerald-100" },
              { title: "Contacted", value: stats.contactedLeads, icon: MessageCircle, color: "text-violet-600", bgColor: "bg-violet-100" },
              { title: "Interested", value: stats.interestedLeads, icon: Target, color: "text-amber-600", bgColor: "bg-amber-100" },
              { title: "Quotation Sent", value: stats.quotationSentLeads, icon: FileTextIcon, color: "text-cyan-600", bgColor: "bg-cyan-100" },
              { title: "Won", value: stats.wonLeads, icon: Award, color: "text-green-600", bgColor: "bg-green-100" },
              { title: "Lost", value: stats.lostLeads, icon: Users, color: "text-rose-600", bgColor: "bg-rose-100" },
              { title: "Today's Follow-Ups", value: stats.todaysFollowUps, icon: Clock, color: "text-indigo-600", bgColor: "bg-indigo-100" },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-600">{stat.title}</CardTitle>
                    <div className={`p-2.5 rounded-xl ${stat.bgColor} shadow-sm`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
            <p className="text-gray-600 mt-1">Manage and track your leads</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Lead</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mobile Number *</label>
                      <Input
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">WhatsApp Number</label>
                      <Input
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company Name</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">State</label>
                      <Input
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Interested Service *</label>
                      <Select value={formData.service} onValueChange={(v) => setFormData({...formData, service: v})} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_OPTIONS.map(service => (
                            <SelectItem key={service} value={service}>{service}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lead Source *</label>
                      <Select value={formData.source} onValueChange={(v) => setFormData({...formData, source: v})} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          {SOURCE_OPTIONS.map(source => (
                            <SelectItem key={source} value={source}>{source}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status *</label>
                      <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expected Budget</label>
                      <Input
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Follow-Up Date</label>
                      <Input
                        type="date"
                        value={formData.followUpDate}
                        onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Assigned To</label>
                      <Input
                        value={formData.assignedTo}
                        onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Remarks</label>
                    <Input
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                    />
                  </div>
                  <DialogFooter className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Lead</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search leads by name, mobile, email, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_OPTIONS.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {SERVICE_OPTIONS.map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Leads List</CardTitle>
            <CardDescription>Total {filteredLeads.length} leads found</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading leads...</div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No leads found. Add your first lead to get started!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Follow-Up Date</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.leadId}</TableCell>
                        <TableCell>{lead.name}</TableCell>
                        <TableCell>{lead.mobile}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.company}</TableCell>
                        <TableCell>{lead.service}</TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{lead.followUpDate || '-'}</TableCell>
                        <TableCell>
                          {lead.createdAt?.toDate 
                            ? format(lead.createdAt.toDate(), 'PP') 
                            : '-'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/admin/leads/${lead.id}`)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/admin/leads/${lead.id}`)}
                              title="Edit Lead"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleWhatsAppClick(lead.mobile, lead.name, lead.service)}
                              title="WhatsApp"
                            >
                              <MessageCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedLeadId(lead.id)
                                setIsFollowUpModalOpen(true)
                              }}
                              title="Add Follow-Up"
                            >
                              <Calendar className="h-4 w-4 text-blue-600" />
                            </Button>
                            {lead.status !== "Won" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleConvertToCustomer(lead.id)}
                                title="Convert to Customer"
                              >
                                <UserCheck className="h-4 w-4 text-purple-600" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setDeleteId(lead.id)
                                setDeleteLeadObj(lead)
                              }}
                              title="Delete Lead"
                            >
                              <Trash2 className="h-4 w-4 text-rose-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Lead</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this lead? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Follow-Up Dialog */}
        <Dialog open={isFollowUpModalOpen} onOpenChange={setIsFollowUpModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Follow-Up</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFollowUpSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Follow-Up Date *</label>
                <Input
                  type="date"
                  value={followUpData.followUpDate}
                  onChange={(e) => setFollowUpData({...followUpData, followUpDate: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Follow-Up Time *</label>
                <Input
                  type="time"
                  value={followUpData.followUpTime}
                  onChange={(e) => setFollowUpData({...followUpData, followUpTime: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Input
                  value={followUpData.notes}
                  onChange={(e) => setFollowUpData({...followUpData, notes: e.target.value})}
                  placeholder="Add follow-up notes..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={followUpData.status} onValueChange={(v) => setFollowUpData({...followUpData, status: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Missed">Missed</SelectItem>
                    <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsFollowUpModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Follow-Up</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}