"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import { LeadPopupProvider } from "@/contexts/LeadPopupContext"
import LeadCapturePopup from "@/components/lead-capture-popup"

const ThemeProvider = dynamic(
  () => import("@/components/theme-provider").then((mod) => mod.ThemeProvider),
  { ssr: false }
)

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isAdminRoute = pathname?.startsWith("/admin")
  const isStudentRoute = pathname?.startsWith("/student") && pathname !== "/student"
  const isLoginRoute = pathname === "/login"

  const hideHeaderFooter = isAdminRoute || isStudentRoute || isLoginRoute
  const showGallery = pathname === "/" && !hideHeaderFooter

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LeadPopupProvider>
        {!hideHeaderFooter && <Navbar />}
        <main className={hideHeaderFooter ? "min-h-screen" : "min-h-screen"}>{children}</main>
        {!hideHeaderFooter && (
          <>
            <Footer />
          </>
        )}
        <Chatbot />
        {/* Global lead capture popup - rendered on all non-admin/student routes */}
        {!isAdminRoute && !isStudentRoute && <LeadCapturePopup />}
      </LeadPopupProvider>
    </ThemeProvider>
  )
}
