"use client"

import { useState, useEffect } from "react"
import StudentLayout from "@/components/student/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Award, Clock, TrendingUp, Calendar } from "lucide-react"
import { useStudent } from "@/hooks/useStudent"
import { getEnrolledCourses } from "@/lib/student"

export default function StudentDashboard() {
  const { studentData } = useStudent()
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (studentData?.uid) {
        try {
          const courses = await getEnrolledCourses(studentData.uid)
          setEnrolledCourses(courses)
        } catch (error) {
          console.error("Error fetching enrolled courses:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchEnrolledCourses()
  }, [studentData])

  const stats = [
    {
      title: "Enrolled Courses",
      value: enrolledCourses.length,
      description: "Active enrollments",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Completed Courses",
      value: enrolledCourses.filter((course: any) => course.status === "completed").length,
      description: "Successfully finished",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "In Progress",
      value: enrolledCourses.filter((course: any) => course.status === "active").length,
      description: "Currently studying",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Average Progress",
      value:
        enrolledCourses.length > 0
          ? Math.round(
              enrolledCourses.reduce((acc: number, course: any) => acc + (course.progress || 0), 0) /
                enrolledCourses.length,
            )
          : 0,
      description: "Overall completion",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      suffix: "%",
    },
  ]

  return (
    <StudentLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Message */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back, {studentData?.fullName}!</CardTitle>
            <CardDescription className="text-blue-100">
              Continue your learning journey and track your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-blue-100">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Last login: {new Date().toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
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
                  <div className="text-2xl font-bold">
                    {stat.value}
                    {stat.suffix || ""}
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Enrolled Courses */}
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Your current course enrollments and progress</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-24 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
                <p className="text-gray-600">Contact administration to enroll in courses</p>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.map((enrollment: any) => (
                  <div key={enrollment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{enrollment.course?.title || "Course Title"}</h3>
                      <Badge
                        variant={
                          enrollment.status === "completed"
                            ? "default"
                            : enrollment.status === "active"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {enrollment.status}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {enrollment.course?.description || "Course description"}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Progress</span>
                        <span className="text-gray-600">{enrollment.progress || 0}%</span>
                      </div>
                      <Progress value={enrollment.progress || 0} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 mt-4 pt-3 border-t">
                      <span>
                        Enrolled:{" "}
                        {enrollment.enrolledAt?.toDate ? enrollment.enrolledAt.toDate().toLocaleDateString() : "N/A"}
                      </span>
                      <span>Duration: {enrollment.course?.duration || "N/A"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Continue Learning
              </CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              {enrolledCourses.length > 0 ? (
                <p className="text-sm text-gray-600">
                  You have {enrolledCourses.filter((c) => c.status === "active").length} active courses
                </p>
              ) : (
                <p className="text-sm text-gray-600">No active courses</p>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-green-600" />
                Achievements
              </CardTitle>
              <CardDescription>Your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {enrolledCourses.filter((c) => c.status === "completed").length} courses completed
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentLayout>
  )
}
