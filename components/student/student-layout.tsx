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
import { BookOpen, User, Award, LogOut, Home, AlertCircle, Menu, X, FileText, LayoutDashboard } from "lucide-react"
import Image from "next/image"

interface StudentLayoutProps {
  children: React.ReactNode
  title: string
}

export default function StudentLayout({ children, title }: StudentLayoutProps) {
  const { user, studentData, isStudent, loading, error } = useStudent()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Get current pathname for active tab highlighting
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

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
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "My Courses", href: "/student/courses", icon: BookOpen },
    { name: "Learning", href: "/student/course-pdfs", icon: FileText },
    { name: "Certificates", href: "/student/certificates", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky inset-y-0 left-0 z-50 w-64 bg-blue-900 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-screen">
          <div className="flex items-center justify-center h-20 px-4 text-white flex-shrink-0">
            <Image
              src="/proco-admin.png"
              alt="Proco Technologies Logo"
              width={160}
              height={55}
              className="object-contain rounded-xl h-[70px] w-auto"
            />
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 bg-blue-900">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-blue-100 hover:bg-blue-800'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-blue-300'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-blue-800 flex-shrink-0">
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={studentData.profilePicture} alt={studentData.fullName} />
                <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">
                  {getInitials(studentData.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{studentData.fullName}</p>
                <p className="text-xs text-blue-300 truncate">{studentData.email}</p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="w-full justify-start bg-blue-800 text-blue-100 hover:bg-blue-700 border-blue-700">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
