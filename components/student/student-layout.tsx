"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useStudent } from "@/hooks/useStudent"
import { signOutStudent } from "@/lib/student"
import { BookOpen, User, Award, Settings, LogOut, Home, AlertCircle } from "lucide-react"

interface StudentLayoutProps {
  children: React.ReactNode
  title: string
}

export default function StudentLayout({ children, title }: StudentLayoutProps) {
  const { user, studentData, isStudent, loading, error } = useStudent()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user || !isStudent || !studentData) {
        // Redirect to login if not authenticated as student
        router.push("/login")
      }
    }
  }, [user, isStudent, studentData, loading, router])

  const handleSignOut = async () => {
    try {
      await signOutStudent()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="mb-4">{error}</AlertDescription>
          </Alert>
          <div className="text-center mt-4">
            <Button onClick={() => router.push("/login")}>Return to Login</Button>
          </div>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated (this should be handled by useEffect, but as backup)
  if (!user || !isStudent || !studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Redirecting to login...</p>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  const navigation = [
    { name: "Dashboard", href: "/student/dashboard", icon: Home },
    { name: "My Courses", href: "/student/courses", icon: BookOpen },
    { name: "Certificates", href: "/student/certificates", icon: Award },
    { name: "Profile", href: "/student/profile", icon: User },
    { name: "Settings", href: "/student/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600 text-white">
            <h1 className="text-xl font-bold">Student Portal</h1>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = typeof window !== "undefined" && window.location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {studentData.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{studentData.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{studentData.email}</p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="w-full justify-start bg-transparent">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
