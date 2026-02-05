"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, BookOpen, Briefcase, TrendingUp, Cake, Mail, Phone, Calendar, GraduationCap, Award, Medal } from "lucide-react"
import { getCourses, getStudents, getPortfolioItems, getEnrollments, getInquiries, sendBirthdayWish, sendCompletionCongratulations, sendCertificateApprovalNotification } from "@/lib/admin"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalProjects: 0,
    totalEnrollments: 0,
    recentEnrollments: 0,
    activeStudents: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
  })
  const [loading, setLoading] = useState(true)
  const [studentsWithBirthdays, setStudentsWithBirthdays] = useState<any[]>([])
  const [recentEnrollmentsList, setRecentEnrollmentsList] = useState<any[]>([])
  const [completedStudents, setCompletedStudents] = useState<any[]>([])
  const [approvedCertificateStudents, setApprovedCertificateStudents] = useState<any[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courses, students, portfolio, enrollments, inquiries] = await Promise.all([
          getCourses(),
          getStudents(),
          getPortfolioItems(),
          getEnrollments(),
          getInquiries(),
        ])

        // Calculate recent enrollments (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const recentEnrollments = enrollments.filter((enrollment) => {
          const enrolledAt = enrollment.enrolledAt?.toDate()
          return enrolledAt !== undefined && enrolledAt > thirtyDaysAgo
        }).length

        const activeStudents = students.filter((student) => student.status === "active").length

        const pendingInquiries = inquiries.filter((inquiry: any) => inquiry.status === "pending").length

        // Find students with birthdays today
        const today = new Date()
        const todayMonth = today.getMonth() + 1 // Months are 0-indexed
        const todayDay = today.getDate()

        const studentsWithBirthdays = students.filter((student) => {
          if (!student.dateOfBirth) return false
          
          // Parse the date of birth (handle multiple formats)
          const dob = student.dateOfBirth.trim()
          let month: number, day: number
          
          // Try DD/MM/YYYY format
          if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dob)) {
            const parts = dob.split('/')
            day = parseInt(parts[0])
            month = parseInt(parts[1])
          }
          // Try YYYY-MM-DD format
          else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dob)) {
            const parts = dob.split('-')
            month = parseInt(parts[1])
            day = parseInt(parts[2])
          }
          // Try DD-MM-YYYY format
          else if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(dob)) {
            const parts = dob.split('-')
            day = parseInt(parts[0])
            month = parseInt(parts[1])
          }
          else {
            return false
          }
          
          return month === todayMonth && day === todayDay
        })

        // Get recent enrollments with student details
        const recentEnrollmentData = enrollments
          .filter((enrollment) => {
            const enrolledAt = enrollment.enrolledAt?.toDate()
            return enrolledAt !== undefined && enrolledAt > thirtyDaysAgo
          })
          .slice(0, 5)

        // Get student details for recent enrollments
        const recentEnrollmentsWithStudents = await Promise.all(
          recentEnrollmentData.map(async (enrollment) => {
            const student = students.find(s => s.id === enrollment.studentId)
            const course = courses.find(c => c.id === enrollment.courseId)
            return {
              ...enrollment,
              student,
              course,
            }
          })
        )

        setStats({
          totalStudents: students.length,
          totalCourses: courses.length,
          totalProjects: portfolio.length,
          totalEnrollments: enrollments.length,
          recentEnrollments,
          activeStudents,
          totalInquiries: inquiries.length,
          pendingInquiries,
        })

        setStudentsWithBirthdays(studentsWithBirthdays)
        setRecentEnrollmentsList(recentEnrollmentsWithStudents)
        
        // Find students who completed their courses
        const completedStudentsData = students.filter((student) => student.status === "completed")
        setCompletedStudents(completedStudentsData)
        
        // Find students with approved certificates
        const approvedCertificateEnrollments = enrollments.filter((enrollment) => enrollment.approvedForCertificate === true)
        const approvedCertificateData = await Promise.all(
          approvedCertificateEnrollments.map(async (enrollment) => {
            const student = students.find(s => s.id === enrollment.studentId)
            const course = courses.find(c => c.id === enrollment.courseId)
            return {
              ...enrollment,
              student,
              course,
            }
          })
        )
        setApprovedCertificateStudents(approvedCertificateData)
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
      color: "text-violet-600",
      bgColor: "bg-violet-100",
      borderColor: "border-violet-200",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      description: "Available courses",
      icon: BookOpen,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      borderColor: "border-emerald-200",
    },
    {
      title: "Portfolio Projects",
      value: stats.totalProjects,
      description: "Completed projects",
      icon: Briefcase,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      borderColor: "border-amber-200",
    },
    {
      title: "Total Enrollments",
      value: stats.totalEnrollments,
      description: `${stats.recentEnrollments} this month`,
      icon: TrendingUp,
      color: "text-rose-600",
      bgColor: "bg-rose-100",
      borderColor: "border-rose-200",
    },
  ]

  const quickActionCards = [
    {
      title: "Manage Courses",
      description: "Add, edit, or remove courses from the catalog",
      icon: BookOpen,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      badge: `${stats.totalCourses} courses`,
      href: "/admin/courses",
    },
    {
      title: "Student Management",
      description: "View and manage student accounts and enrollments",
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      badge: `${stats.totalStudents} students`,
      href: "/admin/students",
    },
    {
      title: "Portfolio Projects",
      description: "Showcase your latest projects and achievements",
      icon: Briefcase,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      badge: `${stats.totalProjects} projects`,
      href: "/admin/portfolio",
    },
    {
      title: "Enrollments",
      description: "Track and manage all course enrollments",
      icon: GraduationCap,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      badge: `${stats.totalEnrollments} enrollments`,
      href: "/admin/enrollments",
    },
    {
      title: "Inquiries",
      description: "Respond to contact and course inquiries",
      icon: Mail,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      badge: `${stats.pendingInquiries} pending`,
      href: "/admin/inquiries",
    },
    {
      title: "Fees",
      description: "Manage student fees and payments",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      badge: "Track payments",
      href: "/admin/fees",
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
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-all duration-300 border-2 ${stat.borderColor} bg-gradient-to-br from-white to-${stat.bgColor.split('bg-')[1].split('-')[0]}-50`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600">{stat.title}</CardTitle>
                  <div className={`p-2.5 rounded-xl ${stat.bgColor} shadow-sm`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Birthday, Completed & Approved Certificates Sections */}
        {(studentsWithBirthdays.length > 0 || completedStudents.length > 0 || approvedCertificateStudents.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Birthday Section */}
            {studentsWithBirthdays.length > 0 && (
              <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-xl text-pink-700">
                    <Cake className="h-6 w-6 mr-2" />
                    🎉 Birthday Today!
                  </CardTitle>
                  <CardDescription className="text-pink-600">
                    {studentsWithBirthdays.length} student{studentsWithBirthdays.length > 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentsWithBirthdays.map((student) => (
                      <div 
                        key={student.id}
                        className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-pink-100"
                      >
                        <Avatar className="h-10 w-10 ring-2 ring-pink-100">
                          <AvatarImage src={student.profilePicture} alt={student.fullName} />
                          <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white text-sm font-bold">
                            {student.fullName?.charAt(0)?.toUpperCase() || 'S'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{student.fullName}</p>
                        </div>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                          onClick={async () => {
                            await sendBirthdayWish(student.id, student.fullName)
                            alert(`🎂 Birthday wish sent to ${student.fullName}!`)
                          }}
                        >
                          🎉
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Completed Students Section */}
            {completedStudents.length > 0 && (
              <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-xl text-green-700">
                    <Award className="h-6 w-6 mr-2" />
                    🏆 Course Completed!
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    {completedStudents.length} student{completedStudents.length > 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {completedStudents.slice(0, 4).map((student) => (
                      <div 
                        key={student.id}
                        className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-green-100"
                      >
                        <Avatar className="h-10 w-10 ring-2 ring-green-100">
                          <AvatarImage src={student.profilePicture} alt={student.fullName} />
                          <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-400 text-white text-sm font-bold">
                            {student.fullName?.charAt(0)?.toUpperCase() || 'S'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{student.fullName}</p>
                        </div>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                          onClick={async () => {
                            await sendCompletionCongratulations(student.id, student.fullName, "course")
                            alert(`🎊 Congratulations sent to ${student.fullName}!`)
                          }}
                        >
                          🏆
                        </Button>
                      </div>
                    ))}
                  </div>
                  {completedStudents.length > 4 && (
                    <p className="text-xs text-center text-gray-500 mt-2">
                      +{completedStudents.length - 4} more
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Approved Certificates Section */}
            {approvedCertificateStudents.length > 0 && (
              <Card className="border-2 border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-xl text-violet-700">
                    <Medal className="h-6 w-6 mr-2" />
                    📜 Approved Certificates
                  </CardTitle>
                  <CardDescription className="text-violet-600">
                    {approvedCertificateStudents.length} certificate{approvedCertificateStudents.length > 1 ? 's' : ''} approved
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {approvedCertificateStudents.slice(0, 4).map((enrollment) => (
                      <div 
                        key={enrollment.id}
                        className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-violet-100"
                      >
                        <Avatar className="h-10 w-10 ring-2 ring-violet-100">
                          <AvatarImage src={enrollment.student?.profilePicture} alt={enrollment.student?.fullName} />
                          <AvatarFallback className="bg-gradient-to-br from-violet-400 to-purple-400 text-white text-sm font-bold">
                            {enrollment.student?.fullName?.charAt(0)?.toUpperCase() || 'S'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{enrollment.student?.fullName}</p>
                          <p className="text-xs text-gray-500 truncate">{enrollment.course?.title}</p>
                        </div>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
                          onClick={async () => {
                            await sendCertificateApprovalNotification(
                              enrollment.student?.id,
                              enrollment.student?.fullName,
                              enrollment.course?.title,
                              enrollment.certificateId || 'N/A'
                            )
                            alert(`📜 Certificate notification sent to ${enrollment.student?.fullName}!`)
                          }}
                        >
                          ✓
                        </Button>
                      </div>
                    ))}
                  </div>
                  {approvedCertificateStudents.length > 4 && (
                    <p className="text-xs text-center text-gray-500 mt-2">
                      +{approvedCertificateStudents.length - 4} more
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActionCards.map((action, index) => {
              const Icon = action.icon
              return (
                <Link key={index} href={action.href}>
                  <Card 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-l-4 h-full"
                    style={{ borderLeftColor: action.color.split('-')[1] === 'violet' ? '#7c3aed' : action.color.split('-')[1] === 'emerald' ? '#10b981' : action.color.split('-')[1] === 'amber' ? '#f59e0b' : action.color.split('-')[1] === 'rose' ? '#f43f5e' : action.color.split('-')[1] === 'cyan' ? '#06b6d4' : '#f97316' }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg group-hover:scale-105 transition-transform">
                        <div className={`p-2 rounded-lg ${action.bgColor} mr-3`}>
                          <Icon className={`h-5 w-5 ${action.color}`} />
                        </div>
                        {action.title}
                      </CardTitle>
                      <CardDescription className="mt-2">{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge 
                        variant="secondary" 
                        className={`${action.bgColor} ${action.color.replace('text-', 'text-')}`}
                      >
                        {action.badge}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Recent Enrollments
            </CardTitle>
            <CardDescription>Latest course enrollments from the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {recentEnrollmentsList.length > 0 ? (
              <div className="space-y-4">
                {recentEnrollmentsList.map((enrollment) => (
                  <div 
                    key={enrollment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={enrollment.student?.profilePicture} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-400 text-white">
                          {enrollment.student?.fullName?.charAt(0)?.toUpperCase() || 'S'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-800">{enrollment.student?.fullName || 'Unknown Student'}</p>
                        <p className="text-sm text-gray-500">{enrollment.course?.title || 'Unknown Course'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Enrolled
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">
                        {enrollment.enrolledAt?.toDate()?.toLocaleDateString() || 'Recent'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No recent enrollments</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Inquiry Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-700 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Total Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-800">{stats.totalInquiries}</div>
              <p className="text-sm text-blue-600 mt-1">All time inquiries</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-700 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Pending Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-orange-800">{stats.pendingInquiries}</div>
              <p className="text-sm text-orange-600 mt-1">Awaiting response</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
