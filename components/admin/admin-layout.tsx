"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/hooks/useAdmin"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { LayoutDashboard, BookOpen, Briefcase, Users, LogOut, Settings, Menu, X, FileText, MessageSquare, UserCheck } from "lucide-react"
import Image from "next/image"

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { user, isAdmin, loading } = useAdmin()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Get current pathname for active tab highlighting
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/admin/login")
    }
  }, [user, isAdmin, loading, router])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/admin/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Course PDFs", href: "/admin/course-pdfs", icon: FileText },
    { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Fees", href: "/admin/fees", icon: FileText },
    { name: "Contact Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Course Enrollments", href: "/admin/enrollments", icon: UserCheck },
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
          <div className="flex items-center justify-center h-20 px-4  text-white flex-shrink-0">
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
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-blue-300">{user.email}</p>
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
