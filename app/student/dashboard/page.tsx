"use client"

import { useState, useEffect } from "react"
import StudentLayout from "@/components/student/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Clock, TrendingUp, Calendar, Cake, PartyPopper } from "lucide-react"
import { useStudent } from "@/hooks/useStudent"
import { getEnrolledCourses, getAllStudents } from "@/lib/student"

export default function StudentDashboard() {
  const { studentData } = useStudent()
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isBirthday, setIsBirthday] = useState(false)
  const [todaysBirthdays, setTodaysBirthdays] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (studentData?.uid) {
        try {
          const courses = await getEnrolledCourses(studentData.uid)
          setEnrolledCourses(courses)
          
          // Fetch all students to find today's birthdays
          const allStudents = await getAllStudents()
          
          // Find students with birthdays today
          const today = new Date()
          const todayMonth = today.getMonth() + 1
          const todayDay = today.getDate()
          
          const birthdays = allStudents.filter((student: any) => {
            if (!student.dateOfBirth) return false
            
            const dob = student.dateOfBirth.trim()
            let month: number, day: number
            
            if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dob)) {
              const parts = dob.split('/')
              day = parseInt(parts[0])
              month = parseInt(parts[1])
            } else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dob)) {
              const parts = dob.split('-')
              month = parseInt(parts[1])
              day = parseInt(parts[2])
            } else if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(dob)) {
              const parts = dob.split('-')
              day = parseInt(parts[0])
              month = parseInt(parts[1])
            } else {
              return false
            }
            
            return month === todayMonth && day === todayDay
          })
          
          setTodaysBirthdays(birthdays)
        } catch (error) {
          console.error("Error fetching data:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [studentData])

  // Check if it's the student's birthday
  useEffect(() => {
    if (studentData?.dateOfBirth) {
      const today = new Date()
      const birthDate = new Date(studentData.dateOfBirth)
      
      if (
        today.getDate() === birthDate.getDate() &&
        today.getMonth() === birthDate.getMonth()
      ) {
        setIsBirthday(true)
      }
    }
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <StudentLayout title="Dashboard">
      <div className="space-y-6">
        {/* Birthday Celebration Popup */}
        {isBirthday && (
          <Card className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-white">
                    <AvatarImage src={studentData?.profilePicture} alt={studentData?.fullName} />
                    <AvatarFallback className="bg-pink-600 text-white text-2xl font-bold">
                      {studentData?.fullName ? getInitials(studentData.fullName) : "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                    <Cake className="h-5 w-5 text-pink-600" />
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-3xl font-bold flex items-center justify-center">
                    <PartyPopper className="h-8 w-8 mr-2" />
                    Happy Birthday {studentData?.fullName}!
                    <PartyPopper className="h-8 w-8 ml-2" />
                  </h2>
                  <p className="text-white/90 text-lg mt-2">
                    🎉 Wishing you a fantastic day filled with joy and learning! 🎉
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Welcome Message */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={studentData?.profilePicture} alt={studentData?.fullName} />
                <AvatarFallback className="bg-blue-700 text-white text-xl">
                  {studentData?.fullName ? getInitials(studentData.fullName) : "??"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Welcome back, {studentData?.fullName}!</h2>
                <p className="text-blue-100">
                  Continue your learning journey and track your progress
                </p>
                <div className="flex items-center mt-2 text-sm text-blue-200">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Last login: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Birthdays Section */}
        {todaysBirthdays.length > 0 && (
          <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-xl text-pink-700">
                <Cake className="h-6 w-6 mr-2" />
                🎉 Today's Birthdays!
              </CardTitle>
              <CardDescription className="text-pink-600">
                {todaysBirthdays.length} student{todaysBirthdays.length > 1 ? 's' : ''} celebrating birthday today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {todaysBirthdays.map((student: any) => (
                  <div 
                    key={student.id}
                    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow"
                  >
                    <Avatar className="h-16 w-16 ring-4 ring-pink-100 mb-2">
                      <AvatarImage src={student.profilePicture} alt={student.fullName} />
                      <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white font-bold text-lg">
                        {student.fullName?.charAt(0)?.toUpperCase() || 'S'}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-semibold text-gray-800 text-center truncate w-full">{student.fullName}</p>
                    <p className="text-xs text-pink-600 flex items-center mt-1">
                      <Cake className="h-3 w-3 mr-1" />
                      Happy Birthday!
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
