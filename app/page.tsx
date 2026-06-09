"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  GraduationCap,
  Users,
  Award,
  Briefcase,
  TrendingUp,
  Globe,
  Target,
  Handshake,
  Clock,
  Building2,
  ArrowRight,
  Sparkles,
  Cloud,
} from "lucide-react"
import { useLeadPopup } from "@/contexts/LeadPopupContext"
import LeadPopupController from "@/components/lead-popup-controller"
import ReviewsSection from "@/components/reviews-section"

// Animated Counter Component
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [end, duration])
  
  return <span>{count}{suffix}</span>
}

// Stats data
const stats = [
  { value: 500, suffix: "+", label: "Students Trained", icon: Users },
  { value: 50, suffix: "+", label: "Projects Delivered", icon: Briefcase },
  { value: 4, suffix: "+", label: "Years Experience", icon: Clock },
  { value: 100, suffix: "+", label: "Certificates Issued", icon: Award },
]

// Student features
const studentFeatures = [
  "ADCA",
  "DCA",
  "CCC",
  "O Level",
  "Full Stack Development",
  "Digital Marketing",
  "Internships",
]

// Business features
const businessFeatures = [
  "Website Development",
  "CRM Development",
  "Mobile App Development",
  "SEO",
  "Google Ads",
  "Meta Ads",
  "Digital Marketing",
]

// Student benefits
const studentBenefits = [
  { icon: GraduationCap, title: "Industry-Oriented Training" },
  { icon: Briefcase, title: "Internship Opportunities" },
  { icon: Award, title: "Certifications" },
  { icon: Target, title: "Career Support" },
]

// Business benefits
const businessBenefits = [
  { icon: Code, title: "Custom Development" },
  { icon: TrendingUp, title: "Affordable Pricing" },
  { icon: Handshake, title: "Dedicated Support" },
  { icon: Cloud, title: "Modern Technologies" },
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const { openPopup } = useLeadPopup()

  useEffect(() => {
    setIsVisible(true)
    
    const timer = setTimeout(() => {
      setStatsVisible(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  const handleCardClick = (type: "Student" | "Business") => (e: React.MouseEvent) => {
    e.preventDefault()
    openPopup("card-click", type)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Auto-show / exit-intent popup controller */}
      <LeadPopupController />

      {/* Hero Section - Full Screen Split Choice */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Header Content */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-6 bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Computer Institute & Software Development
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Build Your Career or
              <br className="md:hidden" /> Grow Your Business
              <br className="hidden md:inline" /> with Procotech
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Professional IT Training, Website Development, Mobile Apps, CRM Software, SEO and Digital Marketing Solutions.
            </p>
          </div>

          {/* Split Choice Cards */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Student Card */}
            <button
              onClick={handleCardClick("Student")}
              className="group text-left w-full"
              type="button"
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900/80 to-blue-950/80 border border-blue-500/30 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-all duration-500"></div>
                <CardContent className="relative p-8 lg:p-10">
                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 mb-6 rounded-xl overflow-hidden">
                    {/* Mobile hero image (shown on small screens) */}
                    <Image
                      src="/studenthero.png"
                      alt="Student Learning On Computers"
                      fill
                      className="object-cover md:hidden onject-left"
                    />
                    {/* Desktop hero image (shown on md+ screens) */}
                    <Image
                      src="/studenthero.png"
                      alt="Student Learning On Computers"
                      fill
                      className="object-cover hidden md:block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center">
                        <GraduationCap className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-500/30 backdrop-blur-md text-white border-blue-400/50">
                        For Students
                      </Badge>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    I Want To Learn
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Build job-ready skills through professional training programs, internships and certifications.
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {studentFeatures.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-blue-500/50 text-blue-300 bg-blue-500/10"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:shadow-lg group-hover:shadow-blue-500/25 rounded-md h-10 inline-flex items-center justify-center font-medium transition-all">
                    Explore Student Programs
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </button>

            {/* Business Card */}
            <button
              onClick={handleCardClick("Business")}
              className="group text-left w-full"
              type="button"
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-green-900/80 to-green-950/80 border border-green-500/30 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                <div className="absolute inset-0 bg-green-600/10 group-hover:bg-green-600/20 transition-all duration-500"></div>
                <CardContent className="relative p-8 lg:p-10">
                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 mb-6 rounded-xl overflow-hidden">
                    {/* Mobile hero image (shown on small screens) */}
                    <Image
                      src="/businesshero.png"
                      alt="Website Development, CRM Dashboard, Mobile Apps, Digital Marketing"
                      fill
                      className="object-cover md:hidden"
                    />
                    {/* Desktop hero image (shown on md+ screens) */}
                    <Image
                      src="/businesshero.png"
                      alt="Website Development, CRM Dashboard, Mobile Apps, Digital Marketing"
                      fill
                      className="object-cover hidden md:block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center">
                        <Building2 className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500/30 backdrop-blur-md text-white border-green-400/50">
                        For Business
                      </Badge>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    I Need Business Solutions
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Grow your business with websites, mobile apps, CRM software, SEO and digital marketing services.
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {businessFeatures.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-green-500/50 text-green-300 bg-green-500/10"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="w-full bg-green-600 hover:bg-green-700 text-white group-hover:shadow-lg group-hover:shadow-green-500/25 rounded-md h-10 inline-flex items-center justify-center font-medium transition-all">
                    Explore Business Solutions
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Trust/Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              Trusted by Hundreds
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Our Track Record
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center text-red-600 dark:text-red-400 mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold font-mono text-gray-900 dark:text-white mb-2">
                  {statsVisible ? <AnimatedCounter end={stat.value} suffix={stat.suffix} /> : "0"}
                </div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Procotech Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800">
              Why Procotech
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether you're looking to learn or grow your business, we have the right solution for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* For Students */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">For Students</h3>
                </div>
                <ul className="space-y-4">
                  {studentBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <benefit.icon className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">{benefit.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* For Businesses */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">For Businesses</h3>
                </div>
                <ul className="space-y-4">
                  {businessBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <benefit.icon className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">{benefit.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white">About Us</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Empowering Digital Futures
              </h2>
              <p className="text-red-100 text-lg mb-6">
                Proco Technologies is a leading computer institute and software development company based in Lucknow, Rajasthan & Jaipur. We bridge the gap between traditional education and digital skills demanded by today's workforce.
              </p>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <Link href="/about">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/proco_tech.jpg"
                alt="Proco Technologies Team"
                width={500}
                height={400}
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need Guidance?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Not sure which path is right for you? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact?type=student">
                Student Counseling
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/contact?type=business">
                Business Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

    </div>
  )
}