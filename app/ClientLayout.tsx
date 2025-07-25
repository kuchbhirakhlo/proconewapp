"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Gallery from "@/components/gallery"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Check if current route should hide header/footer
  const isAdminRoute = pathname?.startsWith("/admin")
  const isStudentRoute = pathname?.startsWith("/student")
  const isLoginRoute = pathname === "/login"

  // Hide header/footer for admin, student, and login routes
  const hideHeaderFooter = isAdminRoute || isStudentRoute || isLoginRoute

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <main className={hideHeaderFooter ? "min-h-screen" : "min-h-screen"}>{children}</main>
      {!hideHeaderFooter && (
        <>
          <Gallery />
          <Footer />
        </>
      )}
    </>
  )
}
