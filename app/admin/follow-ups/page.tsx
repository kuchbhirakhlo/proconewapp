"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Eye, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot, doc, updateDoc, where, getDocs } from "firebase/firestore"
import { useAdmin } from "@/hooks/useAdmin"
import { useRouter } from "next/navigation"
import { 
  getLeadFollowUps, 
  updateLeadFollowUp,
  getAllFollowUps,
  getTodaysFollowUps,
  getLeadById,
  LeadFollowUp,
  Lead
} from "@/lib/lead-management"
import { format } from "date-fns"

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState<(LeadFollowUp & { lead?: Lead })[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")
  const { toast } = useToast()
  const { isAdmin, loading: adminLoading } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      router.push('/login')
      return
    }

    const fetchFollowUps = async () => {
      try {
        let followUpsData: LeadFollowUp[] = []

        if (dateFilter === "today") {
          followUpsData = await getTodaysFollowUps()
        } else {
          followUpsData = await getAllFollowUps()
        }

        // Fetch lead details for each follow-up
        const followUpsWithLeads = await Promise.all(
          followUpsData.map(async (followUp) => {
            const lead = await getLeadById(followUp.leadId)
            return { ...followUp, lead: lead || undefined }
          })
        )

        setFollowUps(followUpsWithLeads)
      } catch (error) {
        console.error("Error fetching follow-ups:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFollowUps()
  }, [isAdmin, adminLoading, dateFilter, router])

  const filteredFollowUps = followUps.filter(followUp => {
    const matchesSearch = 
      followUp.lead?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.lead?.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.lead?.service?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || followUp.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-800"
      case "Completed": return "bg-green-100 text-green-800"
      case "Missed": return "bg-rose-100 text-rose-800"
      case "Rescheduled": return "bg-violet-100 text-violet-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusChange = async (followUpId: string, newStatus: string) => {
    try {
      await updateLeadFollowUp(followUpId, { status: newStatus })
      toast({
        title: "Success",
        description: `Follow-up marked as ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update follow-up status",
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

  if (adminLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <AdminLayout title="Follow Ups">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Follow Ups</h1>
            <p className="text-gray-600 mt-1">Track and manage follow-up activities</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by lead name, mobile, service..."
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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Missed">Missed</SelectItem>
              <SelectItem value="Rescheduled">Rescheduled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="all">All Follow-ups</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Follow-ups Table */}
        <Card>
          <CardHeader>
            <CardTitle>Follow-ups List</CardTitle>
            <CardDescription>Total {filteredFollowUps.length} follow-ups found</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading follow-ups...</div>
            ) : filteredFollowUps.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No follow-ups found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Lead Name</th>
                      <th className="text-left p-4 font-medium">Mobile</th>
                      <th className="text-left p-4 font-medium">Service</th>
                      <th className="text-left p-4 font-medium">Follow-Up Date</th>
                      <th className="text-left p-4 font-medium">Follow-Up Time</th>
                      <th className="text-left p-4 font-medium">Assigned To</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFollowUps.map((followUp) => (
                      <tr key={followUp.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{followUp.lead?.name || 'N/A'}</td>
                        <td className="p-4">{followUp.lead?.mobile || 'N/A'}</td>
                        <td className="p-4">{followUp.lead?.service || 'N/A'}</td>
                        <td className="p-4">{followUp.followUpDate}</td>
                        <td className="p-4">{followUp.followUpTime}</td>
                        <td className="p-4">{followUp.lead?.assignedTo || '-'}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(followUp.status)}>
                            {followUp.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => followUp.lead && router.push(`/admin/leads/${followUp.lead.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {followUp.lead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleWhatsAppClick(followUp.lead!.mobile, followUp.lead!.name, followUp.lead!.service)}
                              >
                                <MessageCircle className="h-4 w-4 text-green-600" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}