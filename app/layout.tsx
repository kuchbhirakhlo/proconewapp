import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Proco Technologies",
  description: "Computer Institute & Software Development Company",
  generator: 'procotech',
  applicationName: "Proco Technologies",
  keywords: [
    "Proco Technologies",
    "Computer Institute",
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Digital Solutions",
    "IT Services",
    "Tech Education",
    "Online Courses",
    "Programming Training",
    "Tech Workshops",
    "Software Solutions",
    "IT Consultancy",
    "Tech Support",
    "Tech Innovation",
    "Tech Training",
    "Tech Careers",
    "Tech Skills",
    "Tech Community",
    "Tech Learning",
    "Tech Development",
    "Tech Projects",
    "Tech Solutions",
    "Tech Expertise",
    "Tech Professionals",
    "Tech Industry",
    "Tech Trends",
    "Tech News",
    "Tech Insights",
    "Tech Events",
    "Tech Resources",
    "Tech Blogs",
    "Tech Tutorials",
    "Tech Guides",
    "Tech Tips",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8434537394521880"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
