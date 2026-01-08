"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { getCourses, Course } from "@/lib/admin"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses()
        // Filter only active courses
        const activeCourses = coursesData.filter((course: Course) => course.status === "active")
        setCourses(activeCourses)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setError("Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-red-50 to-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              Our Courses
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Career with Industry-Leading Courses
            </h1>
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              <span className="ml-2 text-gray-600">Loading courses...</span>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-red-50 to-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              Our Courses
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Career with Industry-Leading Courses
            </h1>
            <div className="flex justify-center items-center py-20">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-gray-600">{error}</span>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4" variant="secondary">
            Our Courses
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Career with Industry-Leading Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of courses designed by industry experts. Get hands-on experience and
            build a portfolio that gets you hired.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {courses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No courses available at the moment.</p>
              <p className="text-gray-500 mt-2">Please check back later for new course offerings!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={
                          course.level === "Beginner"
                            ? "secondary"
                            : course.level === "Intermediate"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Badge variant="outline" className="text-xs">{course.category}</Badge>
                      </div>
                    </div>

                    <div className="text-2xl font-bold text-red-600 mb-4">{course.price}</div>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-sm">What you'll learn:</h4>
                      <ul className="space-y-1">
                        {course.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {course.features.length > 4 && (
                          <li className="text-sm text-gray-500">+{course.features.length - 4} more topics</li>
                        )}
                      </ul>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => window.open("https://wa.me/918383811977", "_blank")}
                    >
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Courses?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our courses are designed to give you practical skills and real-world experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry Certification</h3>
              <p className="text-gray-600">Get certified upon completion and add credibility to your resume.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of real-world experience.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Placement</h3>
              <p className="text-gray-600">95% of our graduates find employment within 6 months of completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8">Join thousands of students who have transformed their careers with Proco Technologies.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              Browse All Courses
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-red-600 bg-transparent"
            >
              Contact Admissions
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
