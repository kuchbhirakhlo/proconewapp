"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowUpDown,
  Search,
  Trash2,
  GraduationCap,
  Briefcase,
  User,
  Phone,
  Calendar,
  Tag,
  RefreshCw,
  ExternalLink,
} from "lucide-react"
import {
  getHomepageLeads,
  deleteHomepageLead,
  updateHomepageLeadStatus,
  subscribeHomepageLeads,
  HomepageLead,
} from "@/lib/homepage-leads"
import { Timestamp } from "firebase/firestore"

function formatDate(ts: any): string {
  if (!ts) return "N/A"
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return "N/A"
  }
}

export default function PopupLeadsPage() {
  const [leads, setLeads] = useState<HomepageLead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    const unsub = subscribeHomepageLeads((data) => {
      setLeads(data)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return
    try {
      await deleteHomepageLead(id)
    } catch (err) {
      console.error(err)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateHomepageLeadStatus(id, status)
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = leads
    .filter((l) => {
      if (filterType !== "all" && l.leadType !== filterType) return false
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return (
        l.name?.toLowerCase().includes(q) ||
        l.mobile?.includes(q) ||
        l.interest?.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => {
      const aTime = a.createdAt?.toDate?.()?.getTime() ?? 0
      const bTime = b.createdAt?.toDate?.()?.getTime() ?? 0
      return sortOrder === "desc" ? bTime - aTime : aTime - bTime
    })

  const studentCount = leads.filter((l) => l.leadType === "Student").length
  const businessCount = leads.filter((l) => l.leadType === "Business").length
  const jobSeekerCount = leads.filter((l) => l.leadType === "Job Seeker").length

  const typeColors: Record<string, string> = {
    Student: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Business: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    "Job Seeker": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    Other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  }

  const statusColors: Record<string, string> = {
    "New Inquiry": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    Contacted: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Interested: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    Converted: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    Closed: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  }

  return (
    <AdminLayout title="Homepage Popup Leads">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-600 flex items-center gap-1">
                <GraduationCap className="h-4 w-4" /> Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{studentCount}</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-600 flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> Business
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{businessCount}</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-600 flex items-center gap-1">
                <User className="h-4 w-4" /> Job Seekers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{jobSeekerCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-36 h-9">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Job Seeker">Job Seeker</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder((o) => (o === "desc" ? "asc" : "desc"))}
            >
              <ArrowUpDown className="h-4 w-4 mr-1" />
              {sortOrder === "desc" ? "Newest" : "Oldest"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("")
                setFilterType("all")
              }}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Leads Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-500">
                <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                Loading leads...
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <User className="h-12 w-12 mb-3 text-gray-300" />
                <p>No leads found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <Badge className={typeColors[lead.leadType] || "bg-gray-100"}>
                            {lead.leadType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <a
                            href={`tel:${lead.mobile}`}
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Phone className="h-3 w-3" />
                            {lead.mobile}
                          </a>
                        </TableCell>
                        <TableCell className="max-w-[160px] truncate" title={lead.interest}>
                          <span className="text-gray-700 dark:text-gray-300">
                            {lead.interest || "—"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={lead.status}
                            onValueChange={(v) => lead.id && handleStatusChange(lead.id, v)}
                          >
                            <SelectTrigger
                              className={`h-7 w-36 text-xs ${
                                statusColors[lead.status] || ""
                              }`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New Inquiry">New Inquiry</SelectItem>
                              <SelectItem value="Contacted">Contacted</SelectItem>
                              <SelectItem value="Interested">Interested</SelectItem>
                              <SelectItem value="Converted">Converted</SelectItem>
                              <SelectItem value="Closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(lead.createdAt)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => lead.id && handleDelete(lead.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export info */}
        <p className="text-xs text-gray-400">
          Showing {filtered.length} of {leads.length} total leads.
          Data is stored in the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">homepage_leads</code> Firestore collection.
        </p>
      </div>
    </AdminLayout>
  )
}