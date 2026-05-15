"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, GraduationCap, Users, Award, Smartphone, Database, Cloud, ArrowRight, CheckCircle, Download } from "lucide-react"

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
      icon: <Smartphone className="h-8 w-8 text-red-600" />,
      title: "Mobile Development",
      description: "Native and cross-platform mobile apps for iOS and Android",
    },
    {
      icon: <Database className="h-8 w-8 text-red-600" />,
      title: "Database Solutions",
      description: "Database design, optimization, and management services",
    },
    {
      icon: <Cloud className="h-8 w-8 text-red-600" />,
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

      {/* Hero Section */}
      <section className="h-screen relative flex items-center" style={{ backgroundImage: 'url("/procoheroimage.webp")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center sm:justify-end">
          <div className="text-center sm:text-right max-w-2xl">
            <Badge className="mb-6 bg-red-100 text-red-700" variant="secondary">
              Computer Institute & Software Development
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Learn. Build. Innovate.
            </h1>
            <p className="text-xl text-white mb-10 leading-relaxed">
              Transform your career with our comprehensive <strong>computer courses</strong> and professional <strong>software development services</strong>. Join hundreds of successful graduates and clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button size="lg" asChild className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
                <Link href="/courses">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white hover:bg-white hover:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-900">
                <Link href="/portfolio">View Our Work</Link>
              </Button>
              <Button size="lg" onClick={handleInstallClick} disabled={isInstalled} className="bg-green-600 hover:bg-green-700 text-white shadow-lg disabled:opacity-50">
                <Download className="mr-2 h-4 w-4" />
                {isInstalled ? "Installed" : "Download App"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center text-red-600 dark:text-red-400 mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold font-mono text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Platform Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Explore Our Platform</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your gateway to mastering new skills and building innovative solutions.
            </p>
            <div className="mt-4 h-1 w-24 bg-red-600 dark:bg-red-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Courses */}
            <Link href="/courses" className="block group">
              <Card className="h-full flex flex-col text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/50 p-6">
                  <div className="flex justify-center mb-4">
                    <GraduationCap className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">Explore Our Courses</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">From coding bootcamps to typing mastery.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Dive into our expert-led courses. Whether you're starting a new career or upskilling, we have a
                    path for you.
                  </p>
                  <Button variant="link" className="text-blue-600 dark:text-blue-400 font-bold self-center hover:text-blue-700 dark:hover:text-blue-300">
                    View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Card 2: Software Services */}
            <Link href="/portfolio" className="block group">
              <Card className="h-full flex flex-col text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardHeader className="bg-green-50 dark:bg-green-900/50 p-6">
                  <div className="flex justify-center mb-4">
                    <Code className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">Our Software Services</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">Custom solutions to power your business.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We build robust web and mobile applications tailored to your needs. Let's bring your ideas to life.
                  </p>
                  <Button variant="link" className="text-green-600 dark:text-green-400 font-bold self-center hover:text-green-700 dark:hover:text-green-300">
                    See Our Work <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Card 3: Typing Hub */}
            <Link href="/typing-test-online" className="block group">
              <Card className="h-full flex flex-col text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardHeader className="bg-red-50 dark:bg-red-900/50 p-6">
                  <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">Typing Skills Hub</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">Speed and accuracy for competitive exams.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Practice Hindi and English typing with our specialized tools and win challenges. Perfect for
                    government job aspirants.
                  </p>
                  <Button variant="link" className="text-red-600 dark:text-red-400 font-bold self-center hover:text-red-700 dark:hover:text-red-300">
                    Start Typing Test <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* What is Procotech Section - Enhanced Design */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800">About Us</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What is <span className="text-red-600 dark:text-red-400">Proco Technologies</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              More than just a tech institute — a comprehensive educational platform empowering your digital journey
            </p>
            <div className="mt-6 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-green-500 dark:from-red-400 dark:to-green-400 rounded-full"></div>
            </div>
          </div>

          {/* Main Introduction Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-12 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-400 to-green-400 dark:from-red-500 dark:to-green-500 rounded-xl blur-xl opacity-20"></div>
                  <Image
                    src="/proco_tech.jpg"
                    alt="Proco Technologies - Learning Environment"
                    width={500}
                    height={400}
                    loading="lazy"
                    className="relative rounded-xl shadow-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  />
                </div>
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  Your Launchpad to Digital Success
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Proco Technologies is a comprehensive educational learning platform designed to bridge the gap
                  between traditional education and the digital skills demanded by today's workforce. We empower
                  students, beginners, and professionals with accessible, high-quality training.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
            <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700"></div>
              <div className="p-8">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Who is it for?</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <span><strong>Students</strong> preparing for competitive government exams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <span><strong>Beginners</strong> taking first steps into coding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <span><strong>Professionals</strong> looking to upskill or pivot careers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <span>Dual-language support: <strong>Hindi & English</strong></span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            {/* Card 2: Why do we exist */}
            <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700"></div>
              <div className="p-8">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why do we exist?</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
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
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            {/* Card 3: What problems do we solve */}
            <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700"></div>
              <div className="p-8">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What problems do we solve?</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                    </div>
                    <span>Fragmented learning resources → <strong>Unified, structured path</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                    </div>
                    <span>Theory-only learning → <strong>Project-based experience</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                    </div>
                    <span>Exam anxiety → <strong>Real exam simulation practice</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                    </div>
                    <span>Learning without earning → <strong>Dedicated placement support</strong></span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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

      {/* Trusted Companies Section */}


      {/* Why Choose Us Section */}
      <section className="py-20 bg-red-600 dark:bg-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Why Choose Proco Technologies?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 dark:text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Industry Expert Instructors</h3>
                    <p className="text-red-100 dark:text-red-200">Learn from professionals with real-world experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 dark:text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Hands-on Projects</h3>
                    <p className="text-red-100 dark:text-red-200">Build real applications and add them to your portfolio</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 dark:text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Job Placement Support</h3>
                    <p className="text-red-100 dark:text-red-200">95% job placement rate with our career support program</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 dark:text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Learning</h3>
                    <p className="text-red-100 dark:text-red-200">Online and offline classes to fit your schedule</p>
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
                loading="lazy"
                className="rounded-lg shadow-xl"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
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
