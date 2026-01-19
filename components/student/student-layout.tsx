"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useStudent } from "@/hooks/useStudent"
import { signOutStudent } from "@/lib/student"
import { BookOpen, User, Award, Settings, LogOut, Home, AlertCircle, Menu, X, FileText } from "lucide-react"
import Image from "next/image"
import { Line } from "recharts"

interface StudentLayoutProps {
  children: React.ReactNode
  title: string
}

export default function StudentLayout({ children, title }: StudentLayoutProps) {
  const { user, studentData, isStudent, loading, error } = useStudent()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const navigation = [
    { name: "Dashboard", href: "/student/dashboard", icon: Home },
    { name: "My Courses", href: "/student/courses", icon: BookOpen },
    { name: "Learning", href: "/student/course-pdfs", icon: FileText },
    { name: "Certificates", href: "/student/certificates", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 p-4">
<h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
    PROCO Student Portal
</h1>
            <Line />
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = typeof window !== "undefined" && window.location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
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
              <Avatar className="h-10 w-10">
                <AvatarImage src={studentData.profilePicture} alt={studentData.fullName} />
                <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">
                  {getInitials(studentData.fullName)}
                </AvatarFallback>
              </Avatar>
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
      <div className="flex-1 lg:ml-64 min-h-screen overflow-auto">
        {/* Mobile top bar */}
        <div className="lg:hidden bg-white shadow-md p-4 flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mr-4"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-lg text-blue-600 font-bold">Proco Student Portal</h1>
          </div>
        </div>
        <main className="p-4 lg:p-6">{children}</main>
        <a href="https://obligedmeditatedazed.com/j6y4n7df?key=de899420720345158643a35a4c1934d3"></a>
      </div>
    </div>
  )
}
