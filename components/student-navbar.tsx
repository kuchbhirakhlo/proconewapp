"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, GraduationCap } from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useTheme } from "next-themes"

export default function StudentNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  const logoSrc = theme === "dark" ? "/proco-dark.png" : "/proco-light.png"

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Typing Test", href: "/typing-test-online" },
    { name: "Verify Certificate", href: "/verify-certificate" },
    { name: "Live Notepad", href: "/notepad" },
    { name: "Contact Us", href: "/contact" },
  ]

  return (
    <nav className="border-b border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logoSrc}
              alt="Proco Technologies Logo"
              width={100}
              height={60}
              className="object-contain rounded-full h-14 w-auto"
            />
            <span className="hidden sm:inline text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
              Student Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-blue-300 dark:bg-blue-600"></div>
            <ThemeToggle />
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/login">Student Login</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-200">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[300px] sm:w-[350px] bg-white dark:bg-gray-900"
            >
              <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-700 dark:text-blue-300">Student Portal</span>
              </div>
              <div className="flex flex-col space-y-1 mt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg text-left w-full"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2"
                    >
                      Student Login
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}