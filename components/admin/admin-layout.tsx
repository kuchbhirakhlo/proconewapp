"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/hooks/useAdmin"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { LayoutDashboard, BookOpen, Briefcase, Users, LogOut, Settings } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { user, isAdmin, loading } = useAdmin()
  const router = useRouter()

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
    { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600 text-white">
            <h1 className="text-xl font-bold">ProcoTech Admin</h1>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">{user.email}</p>
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
