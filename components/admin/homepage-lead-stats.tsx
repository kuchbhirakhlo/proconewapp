"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  Briefcase,
  User,
  BarChart3,
  TrendingUp,
  ExternalLink,
  RefreshCw,
  BookOpen,
  Building2,
} from "lucide-react"
import { getHomepageLeadStats } from "@/lib/homepage-leads"

interface HomepageStats {
  totalLeads: number
  todaysLeads: number
  studentLeadsToday: number
  businessLeadsToday: number
  mostRequestedCourses: { name: string; count: number }[]
  mostRequestedServices: { name: string; count: number }[]
  last7Days: number
  conversionRate: number
}

export default function HomepageLeadStats() {
  const [stats, setStats] = useState<HomepageStats>({
    totalLeads: 0,
    todaysLeads: 0,
    studentLeadsToday: 0,
    businessLeadsToday: 0,
    mostRequestedCourses: [],
    mostRequestedServices: [],
    last7Days: 0,
    conversionRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getHomepageLeadStats()
        setStats(data)
      } catch (err) {
        console.error("Error fetching homepage lead stats:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            Homepage Popup Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-gray-400">
            <RefreshCw className="h-5 w-5 animate-spin mr-2" />
            Loading...
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center text-lg">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            Homepage Popup Leads
          </CardTitle>
          <CardDescription>Real-time lead capture from the homepage popup</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/popup-leads">
            View All <ExternalLink className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {stats.todaysLeads}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">Today</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              {stats.totalLeads}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-300 mt-1">Total</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {stats.last7Days}
            </div>
            <div className="text-xs text-green-600 dark:text-green-300 mt-1">Last 7 Days</div>
          </div>
          <div className="text-center p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">
              {stats.conversionRate}%
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-300 mt-1">Conversion Rate</div>
          </div>
        </div>

        {/* Today's breakdown */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2.5 rounded-lg border border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                {stats.studentLeadsToday}
              </div>
              <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Students Today</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg border border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-green-700 dark:text-green-300">
                {stats.businessLeadsToday}
              </div>
              <div className="text-xs text-green-600/70 dark:text-green-400/70">Business Today</div>
            </div>
          </div>
        </div>

        {/* Most Requested Courses & Services */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <BookOpen className="h-3 w-3" /> Most Requested Courses
            </h4>
            {stats.mostRequestedCourses.length > 0 ? (
              <div className="space-y-1.5">
                {stats.mostRequestedCourses.slice(0, 4).map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-md bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1.5"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      {item.name}
                    </span>
                    <Badge variant="outline" className="ml-2 text-xs flex-shrink-0">
                      {item.count}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-2">No course leads yet</p>
            )}
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Building2 className="h-3 w-3" /> Most Requested Services
            </h4>
            {stats.mostRequestedServices.length > 0 ? (
              <div className="space-y-1.5">
                {stats.mostRequestedServices.slice(0, 4).map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-md bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1.5"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      {item.name}
                    </span>
                    <Badge variant="outline" className="ml-2 text-xs flex-shrink-0">
                      {item.count}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-2">No service leads yet</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}