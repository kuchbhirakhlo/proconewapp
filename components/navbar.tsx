"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)
  const { theme } = useTheme()

  const navigation = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Student Portal", href: "/student" },
    { name: "Business Solutions", href: "/business" },
    { name: "Typing Test", href: "/typing-test-online" },
    { name: "Live Notepad", href: "/notepad" },
  ]

  // Navigate when sheet is closed and we have a pending URL
  useEffect(() => {
    if (!isOpen && navigatingTo) {
      window.location.href = navigatingTo
      setNavigatingTo(null)
    }
  }, [isOpen, navigatingTo])

  const logoSrc = theme === "dark" ? "/proco-dark.png" : "/proco-light.png"

  const handleNavClick = (href: string) => {
    setNavigatingTo(href)
    setIsOpen(false)
  }

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src={logoSrc}
              alt="Proco Technologies Logo"
              width={100}
              height={60}
              className="object-contain rounded-full h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <ThemeToggle />
            <Button asChild size="sm" className="bg-red-600 hover:bg-red-700">
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
              <div className="flex flex-col space-y-1 mt-8">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onMouseDown={() => handleNavClick(item.href)}
                    className="text-gray-700 dark:text-gray-200 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg text-left w-full"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <button
                      onMouseDown={() => handleNavClick("/login")}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2"
                    >
                      Student Login
                    </button>
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