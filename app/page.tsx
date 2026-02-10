"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, GraduationCap, Users, Award, Smartphone, Database, Cloud, ArrowRight, CheckCircle, Download } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"
import ReviewsSection from "@/components/reviews-section"

export default function HomePage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    // Listen for successful install
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setShowInstallButton(false)
      setDeferredPrompt(null)
    })

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", () => {
        setIsInstalled(true)
        setShowInstallButton(false)
        setDeferredPrompt(null)
      })
    }
  }, [])

  const handleInstallClick = async () => {
    // Check if it's iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (deferredPrompt) {
      // For Android/Desktop - show native install prompt
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      setDeferredPrompt(null)
      setShowInstallButton(false)
      if (outcome === "accepted") {
        setIsInstalled(true)
      }
    } else if (isIOS) {
      // For iOS - show share sheet to add to home screen
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Install Proco Technologies App",
            text: "Install our app for the best experience!",
            url: window.location.href,
          })
        } catch (err) {
          // User cancelled or error
        }
      } else {
        // Fallback: show instructions for iOS
        alert("To install this app on iOS:\n\n1. Tap the Share button (box with arrow) in Safari\n2. Scroll down and tap 'Add to Home Screen'\n3. Tap 'Add' to confirm")
      }
    } else {
      // For other browsers - show manual instructions
      alert("To install this app:\n\n• Mobile: Tap the menu (⋮) and select 'Add to Home Screen'\n• Desktop: Click the install icon in your browser's address bar")
    }
  }
  const services = [
    {
      icon: <Code className="h-8 w-8 text-red-600" />,
      title: "Web Development",
      description: "Custom web applications using modern technologies like React, Next.js, and Node.js",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-600" />,
      title: "Mobile Development",
      description: "Native and cross-platform mobile apps for iOS and Android",
    },
    {
      icon: <Database className="h-8 w-8 text-purple-600" />,
      title: "Database Solutions",
      description: "Database design, optimization, and management services",
    },
    {
      icon: <Cloud className="h-8 w-8 text-orange-600" />,
      title: "Cloud Services",
      description: "Cloud migration, deployment, and infrastructure management",
    },
  ]

  const courses = [
    {
      title: "Full Stack Web Development",
      duration: "1 year",
      level: "Beginner to Advanced",
      price: "₹9999",
    },
    {
      title: "Mobile App Development",
      duration: "6 months",
      level: "Intermediate",
      price: "₹7999",
    },
    {
      title: "Advanced Diploma in Computer Application(ADCA)",
      duration: "1 year",
      level: "Intermediate",
      price: "₹8999",
    },
    {
      title: "Diploma in Computer Application(DCA)",
      duration: "6 months",
      level: "Advanced",
      price: "₹3999",
    },
  ]

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "500+", label: "Students Trained" },
    { icon: <Award className="h-8 w-8" />, value: "50+", label: "Projects Completed" },
    { icon: <GraduationCap className="h-8 w-8" />, value: "95%", label: "Job Placement Rate" },
    { icon: <Code className="h-8 w-8" />, value: "5+", label: "Years Experience" },
  ]

  return (
    <div className="flex flex-col">
      {/* Typing Test Challenge Banner */}
      <section className="py-4 bg-gradient-to-r from-red-600 via-purple-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-red-100">New Student Challenge</p>
                <p className="font-bold text-lg">🎯 Typing Test Challenge - Win 1 Month FREE Classes!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-red-100">
                <span>⏱️ 5 Minutes</span>
                <span>•</span>
                <span>🏆 Prize: 1 Month Free</span>
                <span>•</span>
                <span>📊 All Levels</span>
              </div>
              <Button asChild size="sm" className="bg-white text-purple-600 hover:bg-red-100 font-semibold">
                <Link href="/typing-test-online">
                  Start Challenge
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-green-50 py-20 lg:py-32 overflow-hidden">
        {/* Animated Canvas Background */}
        <AnimatedBackground />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-purple-900/5 to-green-900/10 z-2"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-2">
          {/* Animated particles */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-75"></div>
          <div
            className="absolute top-20 right-20 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-60"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-70"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-300 rounded-full animate-ping opacity-80"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-2 h-2 bg-green-300 rounded-full animate-pulse opacity-65"
            style={{ animationDelay: "4s" }}
          ></div>

          {/* Floating geometric shapes */}
          <div className="absolute top-16 left-1/3 w-8 h-8 border-2 border-red-300 rotate-45 animate-spin-slow opacity-30"></div>
          <div
            className="absolute bottom-24 right-1/4 w-6 h-6 border-2 border-green-300 rounded-full animate-pulse opacity-40"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-16 w-4 h-4 bg-purple-200 transform rotate-45 animate-bounce opacity-50"
            style={{ animationDelay: "2.5s" }}
          ></div>

          {/* Code-like floating elements */}
          <div className="absolute top-24 right-1/2 text-red-200 opacity-30 font-mono text-sm animate-float">
            {"<code>"}
          </div>
          <div
            className="absolute bottom-40 left-1/2 text-green-200 opacity-30 font-mono text-sm animate-float"
            style={{ animationDelay: "3s" }}
          >
            {"</>"}
          </div>
          <div
            className="absolute top-1/3 left-20 text-purple-200 opacity-30 font-mono text-xs animate-float"
            style={{ animationDelay: "1s" }}
          >
            {"{ }"}
          </div>

          {/* Binary code rain effect */}
          <div className="absolute top-0 left-1/4 text-red-100 opacity-20 font-mono text-xs animate-pulse">
            01010101
          </div>
          <div
            className="absolute top-10 right-1/3 text-green-100 opacity-20 font-mono text-xs animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            11001100
          </div>
          <div
            className="absolute bottom-16 left-1/3 text-purple-100 opacity-20 font-mono text-xs animate-pulse"
            style={{ animationDelay: "4s" }}
          >
            10101010
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 backdrop-blur-sm bg-white/80" variant="secondary">
                Computer Institute & Software Development
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Learn. Build.
                <span className="text-red-600 relative">
                  {" "}
                  Innovate.
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-green-400 rounded-full animate-pulse"></div>
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed backdrop-blur-sm bg-white/50 p-4 rounded-lg">
                Transform your career with our comprehensive <strong>computer courses</strong> and professional <strong>software development services</strong>. Join hundreds of successful graduates and clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link href="/courses">
                    Explore Courses{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="group hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-white/80 hover:bg-white/90"
                >
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
                <Button
                  size="lg"
                  onClick={handleInstallClick}
                  disabled={isInstalled}
                  className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isInstalled ? "Installed" : "Download App"}
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-green-400 rounded-lg blur-xl opacity-30 animate-pulse"></div>
              <Image
                src="main-pic.png"
                alt="Proco Technologies Office"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
              />
              {/* Floating tech icons around the image */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white animate-bounce shadow-lg">
                <Code className="h-6 w-6" />
              </div>
              <div
                className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white animate-bounce shadow-lg"
                style={{ animationDelay: "1s" }}
              >
                <GraduationCap className="h-6 w-6" />
              </div>
              <div
                className="absolute top-1/2 -left-6 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white animate-pulse shadow-lg"
                style={{ animationDelay: "2s" }}
              >
                <span className="text-xs font-bold">AI</span>
              </div>
              <div
                className="absolute top-4 -right-6 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white animate-pulse shadow-lg"
                style={{ animationDelay: "3s" }}
              >
                <span className="text-xs font-bold">JS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center text-red-600 mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Platform Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Explore Our Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your gateway to mastering new skills and building innovative solutions.
            </p>
            <div className="mt-4 h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Courses */}
            <Link href="/courses" className="block group">
              <Card className="h-full flex flex-col text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <CardHeader className="bg-blue-50 p-6">
                  <div className="flex justify-center mb-4">
                    <GraduationCap className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Explore Our Courses</CardTitle>
                  <CardDescription>From coding bootcamps to typing mastery.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between p-6">
                  <p className="text-gray-600 mb-6">
                    Dive into our expert-led courses. Whether you're starting a new career or upskilling, we have a
                    path for you.
                  </p>
                  <Button variant="link" className="text-blue-600 font-bold self-center">
                    View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Card 2: Software Services */}
            <Link href="/portfolio" className="block group">
              <Card className="h-full flex flex-col text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <CardHeader className="bg-green-50 p-6">
                  <div className="flex justify-center mb-4">
                    <Code className="h-12 w-12 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Software Services</CardTitle>
                  <CardDescription>Custom solutions to power your business.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between p-6">
                  <p className="text-gray-600 mb-6">
                    We build robust web and mobile applications tailored to your needs. Let's bring your ideas to life.
                  </p>
                  <Button variant="link" className="text-green-600 font-bold self-center">
                    See Our Work <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Card 3: Typing Hub */}
            <Link href="/typing-test-online" className="block group">
              <Card className="h-full flex flex-col text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <CardHeader className="bg-red-50 p-6">
                  <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl">Typing Skills Hub</CardTitle>
                  <CardDescription>Speed and accuracy for competitive exams.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between p-6">
                  <p className="text-gray-600 mb-6">
                    Practice Hindi and English typing with our specialized tools and win challenges. Perfect for
                    government job aspirants.
                  </p>
                  <Button variant="link" className="text-red-600 font-bold self-center">
                    Start Typing Test <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* What is Procotech Section - Enhanced Design */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-200">About Us</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              What is <span className="text-red-600">Proco Technologies</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just a tech institute — a comprehensive educational platform empowering your digital journey
            </p>
            <div className="mt-6 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Main Introduction Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-400 to-green-400 rounded-xl blur-xl opacity-20"></div>
                  <Image
                    src="/proco_tech.jpg"
                    alt="Proco Technologies"
                    width={500}
                    height={400}
                    className="relative rounded-xl shadow-lg"
                  />
                </div>
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  Your Launchpad to Digital Success
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Proco Technologies is a comprehensive educational learning platform designed to bridge the gap 
                  between traditional education and the digital skills demanded by today's workforce. We empower 
                  students, beginners, and professionals with accessible, high-quality training.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  From <strong>touch typing</strong> to <strong>full-stack software development</strong>, our platform 
                  serves as your launchpad for a successful career in the digital age, offering a unique blend of 
                  theoretical knowledge and practical application.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1: Who is it for */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-8">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Who is it for?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span><strong>Students</strong> preparing for competitive government exams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span><strong>Beginners</strong> taking first steps into coding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span><strong>Professionals</strong> looking to upskill or pivot careers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span>Dual-language support: <strong>Hindi & English</strong></span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            {/* Card 2: Why do we exist */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="p-8">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why do we exist?</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We noticed a critical disconnect in education — theory is taught, but practical skills are often missing.
                  </p>
                  <p>
                    <strong>Our mission:</strong> Democratize tech education, making it affordable, accessible, and directly 
                    relevant to your career aspirations.
                  </p>
                  <p>
                    We believe <strong>digital literacy is a necessity</strong>, not a luxury in today's rapidly digitizing world.
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            {/* Card 3: What problems do we solve */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="p-8">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What problems do we solve?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                    <span>Fragmented learning resources → <strong>Unified, structured path</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                    <span>Theory-only learning → <strong>Project-based experience</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                    <span>Exam anxiety → <strong>Real exam simulation practice</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                    <span>Learning without earning → <strong>Dedicated placement support</strong></span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>

          {/* Stats/Highlights Banner */}
          <div className="bg-gradient-to-r from-red-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">🎯</div>
                <div className="text-2xl font-bold">Mission-Driven</div>
                <div className="text-red-100 text-sm">Bridging the skills gap</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">🌐</div>
                <div className="text-2xl font-bold">Diverse Learners</div>
                <div className="text-red-100 text-sm">Students to professionals</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">💡</div>
                <div className="text-2xl font-bold">Practical Focus</div>
                <div className="text-red-100 text-sm">Build real projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">🚀</div>
                <div className="text-2xl font-bold">Career Ready</div>
                <div className="text-red-100 text-sm">Placement support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Why Choose Proco Technologies?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Industry Expert Instructors</h3>
                    <p className="text-red-100">Learn from professionals with real-world experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Hands-on Projects</h3>
                    <p className="text-red-100">Build real applications and add them to your portfolio</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Job Placement Support</h3>
                    <p className="text-red-100">95% job placement rate with our career support program</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Learning</h3>
                    <p className="text-red-100">Online and offline classes to fit your schedule</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/student_learning.png"
                alt="Students Learning"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Unique Design */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          
          {/* Floating Code Elements */}
          <div className="absolute top-20 right-20 font-mono text-purple-300/30 text-lg animate-float">
          </div>
          <div className="absolute bottom-20 left-20 font-mono text-red-300/30 text-lg animate-float" style={{ animationDelay: "1s" }}>
            {"{ }"}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Gradient Text */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              ✨ What We Do
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Our Software Development
              </span>
              <br />
              <span className="text-white">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We craft innovative digital solutions that transform businesses and drive growth in the modern world.
            </p>
          </div>

          {/* Services Grid - Staggered Cards with Floating Effect */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/10 hover:-translate-y-2">
                  {/* Gradient Border Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/50 via-purple-500/50 to-green-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10"></div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${index === 0 ? "bg-red-500" : index === 1 ? "bg-green-500" : index === 2 ? "bg-purple-500" : "bg-orange-500"}`}></div>
                    <div className="relative w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>

                  {/* Index Number */}
                  <div className="absolute top-4 right-4 text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Connecting Line (except for last item in row) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-white/20 to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          {/* Service Features Row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🚀", label: "Fast Delivery" },
              { icon: "🛡️", label: "Secure Code" },
              { icon: "💎", label: "Premium Quality" },
              { icon: "🎯", label: "Client Focused" }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 py-4 px-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-white font-medium">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 via-purple-600 to-green-600 hover:from-red-700 hover:via-purple-700 hover:to-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/portfolio">
                View Our Portfolio <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Section - Unique Design */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-red-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-100/50 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Unique Header Design */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500"></div>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-1">🎓 Academic Programs</Badge>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="relative inline-block">
                Popular
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-400/40 -z-10 transform -rotate-1"></span>
              </span>{" "}
              <span className="text-transparent bg-gradient-to-r from-red-600 to-green-600 bg-clip-text">Courses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
              Master in-demand skills with our comprehensive curriculum designed by industry experts to boost your career.
            </p>
          </div>

          {/* Floating Stats Banner */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { value: "10+", label: "Courses" },
              { value: "500+", label: "Students" },
              { value: "95%", label: "Success Rate" },
              { value: "₹999", label: "Starting Price" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border border-white/50">
                <span className="text-2xl font-bold text-red-600">{stat.value}</span>
                <span className="text-gray-600 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Course Cards - Unique Card Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Card Background with Gradient Border Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-green-500 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Main Card */}
                <div className="relative h-full bg-white rounded-2xl p-6 border border-gray-100 group-hover:border-transparent transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {/* Course Icon/Image Placeholder */}
                  <div className="relative mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                      index === 0 ? "bg-gradient-to-br from-red-500 to-red-600" :
                      index === 1 ? "bg-gradient-to-br from-green-500 to-green-600" :
                      index === 2 ? "bg-gradient-to-br from-purple-500 to-purple-600" :
                      "bg-gradient-to-br from-orange-500 to-orange-600"
                    }`}>
                      {index === 0 && <Code className="h-7 w-7" />}
                      {index === 1 && <Smartphone className="h-7 w-7" />}
                      {index === 2 && <Database className="h-7 w-7" />}
                      {index === 3 && <GraduationCap className="h-7 w-7" />}
                    </div>
                    {/* Course Level Badge */}
                    <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${
                      index === 0 ? "bg-gradient-to-r from-red-500 to-red-600" :
                      index === 1 ? "bg-gradient-to-r from-green-500 to-green-600" :
                      index === 2 ? "bg-gradient-to-r from-purple-500 to-purple-600" :
                      "bg-gradient-to-r from-orange-500 to-orange-600"
                    }`}>
                      {course.level.split(" ")[0]}
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors duration-300">
                    {course.title}
                  </h3>

                  {/* Course Details */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.level}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                      {course.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">₹12,999</span>
                    <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">
                      Save 23%
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {["Live Projects", "Certificate", "Job Support"].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full mt-auto group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-purple-600 transition-all duration-300 ${
                      index === 0 ? "bg-red-600 hover:bg-red-700" :
                      index === 1 ? "bg-green-600 hover:bg-green-700" :
                      index === 2 ? "bg-purple-600 hover:bg-purple-700" :
                      "bg-orange-600 hover:bg-orange-700"
                    }`}
                  >
                    <Link href="/courses" className="flex items-center justify-center gap-2">
                      Enroll Now
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Courses Button */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/courses">
                View All Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: "🎯", title: "Industry-Relevant", desc: "Curriculum designed according to current market demands" },
              { icon: "👨‍🏫", title: "Expert Mentors", desc: "Learn from professionals with 10+ years of experience" },
              { icon: "🚀", title: "Career Support", desc: "Resume building, mock interviews & job placement assistance" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of successful students and clients who have transformed their careers with Proco
            Technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/courses">Enroll Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-gray-900 bg-transparent"
              asChild
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-gray-900 bg-transparent"
              asChild
            >
              <Link href="https://hostinger.in?REFERRALCODE=HTXAVISR0NWD">Make Your Free Website</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

    </div>
  )
}
