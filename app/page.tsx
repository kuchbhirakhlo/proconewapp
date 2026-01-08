"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, GraduationCap, Users, Award, Smartphone, Database, Cloud, ArrowRight, CheckCircle, Download } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"

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
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    // Clean up
    setDeferredPrompt(null)
    setShowInstallButton(false)

    if (outcome === "accepted") {
      setIsInstalled(true)
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
                  disabled={!deferredPrompt || isInstalled}
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

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Software Development Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide cutting-edge software solutions to help businesses grow and succeed in the digital world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Popular Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master in-demand skills with our comprehensive courses designed by industry experts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{course.duration}</span>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600 mb-4">{course.price}</div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/courses">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
                src="https://blueye.org/_next/image?url=%2Fcms%2Fblog%2F9-methods-detect-ai-generated-student-work%2Fai-detection-teachers.jpeg&w=3840&q=75"
                alt="Students Learning"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
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

    </div>
  )
}
