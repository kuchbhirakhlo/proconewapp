"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Briefcase, TrendingUp } from "lucide-react"
import { getCourses, getStudents, getPortfolioItems, getEnrollments } from "@/lib/admin"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalProjects: 0,
    totalEnrollments: 0,
    recentEnrollments: 0,
    activeStudents: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courses, students, portfolio, enrollments] = await Promise.all([
          getCourses(),
          getStudents(),
          getPortfolioItems(),
          getEnrollments(),
        ])

        // Calculate recent enrollments (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const recentEnrollments = enrollments.filter((enrollment) => {
          const enrolledAt = enrollment.enrolledAt?.toDate()
          return enrolledAt !== undefined && enrolledAt > thirtyDaysAgo
        }).length

        const activeStudents = students.filter((student) => student.status === "active").length

        setStats({
          totalStudents: students.length,
          totalCourses: courses.length,
          totalProjects: portfolio.length,
          totalEnrollments: enrollments.length,
          recentEnrollments,
          activeStudents,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      description: `${stats.activeStudents} active`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      description: "Available courses",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Portfolio Projects",
      value: stats.totalProjects,
      description: "Completed projects",
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Enrollments",
      value: stats.totalEnrollments,
      description: `${stats.recentEnrollments} this month`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Manage Courses
              </CardTitle>
              <CardDescription>Add, edit, or remove courses from the catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">{stats.totalCourses} courses</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Student Management
              </CardTitle>
              <CardDescription>View and manage student accounts and enrollments</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">{stats.totalStudents} students</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-purple-600" />
                Portfolio Projects
              </CardTitle>
              <CardDescription>Showcase your latest projects and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">{stats.totalProjects} projects</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and activities in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New student registration</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Course enrollment completed</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New portfolio project added</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
