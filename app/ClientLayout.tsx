"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Gallery from "@/components/gallery"
import Chatbot from "@/components/chatbot"

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
  const isStudentRoute = pathname?.startsWith("/student")
  const isLoginRoute = pathname === "/login"

  const hideHeaderFooter = isAdminRoute || isStudentRoute || isLoginRoute
  const showGallery = pathname === "/" && !hideHeaderFooter

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {!hideHeaderFooter && <Navbar />}
      <main className={hideHeaderFooter ? "min-h-screen" : "min-h-screen"}>{children}</main>
      {!hideHeaderFooter && (
        <>
          {showGallery && <Gallery />}
          <Footer />
        </>
      )}
      <Chatbot />
    </ThemeProvider>
  )
}