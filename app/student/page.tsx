"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  GraduationCap,
  Users,
  Award,
  Briefcase,
  Clock,
  Code,
  ArrowRight,
  Star,
  BookOpen,
  Target,
  Phone,
  Rocket,
  Trophy,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Send,
  MessageCircle,
  Pencil,
  Keyboard,
  CheckCircle2
} from "lucide-react"

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let startTime: number
    let animationFrame: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)
    return () => { if (animationFrame) cancelAnimationFrame(animationFrame) }
  }, [isVisible, end, duration])

  return <div ref={ref}><span>{count}{suffix}</span></div>
}

const stats = [
  { value: 500, suffix: "+", label: "Students Trained", icon: Users },
  { value: 100, suffix: "+", label: "Certificates Issued", icon: Award },
  { value: 50, suffix: "+", label: "Internships Completed", icon: Briefcase },
  { value: 4, suffix: "+", label: "Years of Excellence", icon: Trophy },
]

const popularCourses = [
  {
    title: "ADCA",
    fullName: "Advanced Diploma in Computer Applications",
    description: "Comprehensive computer applications diploma covering office tools, internet, and basic programming.",
    duration: "12 Months",
    level: "Beginner to Advanced",
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "DCA",
    fullName: "Diploma in Computer Applications",
    description: "Foundation course in computer applications perfect for beginners starting their IT journey.",
    duration: "6 Months",
    level: "Beginner",
    color: "from-green-500 to-green-700",
  },
  {
    title: "Full Stack Development",
    fullName: "Full Stack Web Development",
    description: "Master front-end and back-end technologies with React, Next.js, Node.js, and databases.",
    duration: "12 Months",
    level: "Intermediate",
    color: "from-purple-500 to-purple-700",
  },
  {
    title: "Digital Marketing",
    fullName: "Digital Marketing Course",
    description: "Learn SEO, social media marketing, Google Ads, and content strategy.",
    duration: "6 Months",
    level: "Beginner to Intermediate",
    color: "from-pink-500 to-pink-700",
  },
  {
    title: "Graphic Designing",
    fullName: "Graphic Design & Visual Communication",
    description: "Master Adobe Photoshop, Illustrator, and modern design principles.",
    duration: "6 Months",
    level: "Beginner",
    color: "from-orange-500 to-orange-700",
  },
  {
    title: "MS Office Professional",
    fullName: "Microsoft Office Specialist",
    description: "Excel, Word, PowerPoint mastery for office productivity and government job preparation.",
    duration: "3 Months",
    level: "Beginner",
    color: "from-cyan-500 to-cyan-700",
  },
]

const internships = [
  { title: "45-Day Internship", description: "Quick industry exposure with hands-on training on real-world projects.", duration: "45 Days" },
  { title: "90-Day Internship", description: "Comprehensive internship program with deeper learning and project ownership.", duration: "90 Days" },
  { title: "Live Project Training", description: "Work on actual client projects and gain real industry experience.", duration: "Flexible" },
]

const internshipFeatures = [
  "Real Projects",
  "Industry Mentorship",
  "Internship Certificate",
  "Practical Learning",
  "Career Guidance",
]

const whyChoose = [
  { icon: BookOpen, title: "Practical Learning", description: "Hands-on training with real projects" },
  { icon: Users, title: "Experienced Trainers", description: "Learn from industry professionals" },
  { icon: Briefcase, title: "Internship Opportunities", description: "Real-world work experience" },
  { icon: Code, title: "Project-Based Training", description: "Build portfolio-worthy projects" },
  { icon: Award, title: "Certification Programs", description: "Industry-recognized certificates" },
  { icon: Target, title: "Placement Assistance", description: "Career guidance and support" },
]

const testimonials = [
  { name: "Rahul Sharma", course: "Full Stack Development", review: "Procotech transformed my career. The practical training and internship helped me land a developer job within 3 months of completing the course.", rating: 5 },
  { name: "Priya Verma", course: "Digital Marketing", review: "The instructors are amazing and the curriculum is up-to-date. I started freelancing during the course itself!", rating: 5 },
  { name: "Amit Kumar", course: "ADCA", review: "Best computer institute in Lucknow. The certificate I received helped me get a government job.", rating: 5 },
  { name: "Sneha Gupta", course: "Graphic Designing", review: "Excellent training with personal attention. The projects we built gave me confidence to start my own design business.", rating: 5 },
]

const careers = ["Web Development", "Digital Marketing", "Graphic Designing", "Data Entry", "Office Administration", "Freelancing", "Software Industry", "Government Jobs"]

const admissionSteps = [
  { step: 1, title: "Choose Course", description: "Browse our courses and select the one that fits your career goals" },
  { step: 2, title: "Submit Admission Form", description: "Fill out the admission form with your details and preferences" },
  { step: 3, title: "Counseling Session", description: "Get personalized guidance from our career counselors" },
  { step: 4, title: "Start Learning", description: "Begin your journey to a successful IT career" },
]

const faqs = [
  { question: "What is the course duration?", answer: "Course durations vary from 3 months to 12 months depending on the program. Short-term certificate courses are 3 months, diploma courses are 6 months, and advanced diploma courses are 12 months." },
  { question: "Will I receive a certificate?", answer: "Yes! Upon successful completion of any course, you will receive an industry-recognized certificate from Procotech Technologies. You can also verify your certificate online through our certificate verification portal." },
  { question: "Do you provide internships?", answer: "Absolutely! We offer 45-day, 90-day, and live project internship programs. Students get real industry experience with mentorship from working professionals." },
  { question: "Is placement assistance available?", answer: "Yes, we provide comprehensive placement assistance including resume building, interview preparation, and direct connections with our hiring partners. Our students have a 95% placement success rate." },
  { question: "Can beginners join?", answer: "Yes, beginners are absolutely welcome! We have courses designed for all skill levels - from absolute beginners to advanced learners. Our instructors provide personalized attention to ensure everyone learns effectively." },
  { question: "What is the fee structure?", answer: "Our courses are affordably priced with flexible payment options. Fees vary by course - please contact our admissions team for detailed fee structure and any available scholarships." },
]

export default function StudentPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", course: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitMessage("")
    try {
      const response = await fetch('/api/contact-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, inquiryType: 'student', source: 'student-landing-page' }),
      })
      if (response.ok) {
        setSubmitMessage("Thank you! Your admission inquiry has been submitted. We'll contact you soon.")
        setFormData({ name: "", phone: "", email: "", course: "", message: "" })
      } else {
        setSubmitMessage("Something went wrong. Please try again or call us directly.")
      }
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again or call us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                For Students & Learners
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Launch Your IT Career with Procotech
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Learn industry-ready skills through professional computer courses, internships, certifications, and practical training programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  <Link href="/courses">View Courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent" onClick={() => document.getElementById('admission-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Enroll Now
                </Button>
              </div>
            </div>
            <div className="relative lg:block">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                {/* Mobile hero image */}
                <Image src="/mobilestudenthero.png" alt="Students Learning" fill className="object-cover lg:hidden" />
                {/* Desktop hero image */}
                <Image src="/studenthero.png" alt="Students Learning" fill className="object-cover hidden lg:block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stats */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Student Success Stats</h2>
            <p className="text-gray-600 dark:text-gray-300">Numbers that reflect our commitment to student success</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:shadow-lg transition-shadow">
                <div className="flex justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <stat.icon className="h-10 w-10" />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-mono text-gray-900 dark:text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Popular Courses</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Build Your Future with Our Top Courses</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Industry-aligned curriculum designed to make you job-ready from day one</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`bg-gradient-to-r ${course.color} text-white border-0`}>{course.level}</Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{course.title}</CardTitle>
                  <CardDescription className="text-sm font-medium">{course.fullName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{course.description}</p>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1" size="sm"><Link href="/courses">View Course</Link></Button>
                    <Button className="flex-1" size="sm" onClick={() => document.getElementById('admission-form')?.scrollIntoView({ behavior: 'smooth' })}>Enroll Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Programs */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">Internship Programs</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Gain Real Industry Experience</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Work on real projects with industry mentorship</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {internships.map((internship, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">{internship.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">{internship.duration}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{internship.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">What You'll Get</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {internshipFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/contact?type=internship">Apply for Internship <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Typing Practice & Certificate Verification */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-shadow bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
              <CardHeader>
                <div className="w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <Keyboard className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Improve Your Typing Speed</CardTitle>
                <CardDescription>Practice typing online and improve your speed and accuracy. Perfect for government job aspirants.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                  <Link href="/typing-test-online">Start Typing Test <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Verify Your Certificate Online</CardTitle>
                <CardDescription>Students can instantly verify their certificates using our online verification system.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/verify-certificate">Verify Certificate <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Procotech */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Why Choose Us</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Procotech?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">What makes our training programs stand out</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => (
              <Card key={index} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Students Say</h2>
          </div>
          <Card className="relative">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center italic mb-8">
                &ldquo;{testimonials[currentTestimonial].review}&rdquo;
              </p>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{testimonials[currentTestimonial].name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[currentTestimonial].course}</p>
              </div>
            </CardContent>
            <div className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-4">
              <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-4">
              <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">Career Paths</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Where Our Students Work</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Our alumni work across diverse industries and roles</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {careers.map((career, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{career}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">Admission Process</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">How to Get Admitted</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Simple 4-step admission process</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {admissionSteps.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
                {index < admissionSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Form */}
      <section id="admission-form" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Apply Now</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Admission Form</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Fill in your details and our team will contact you within 24 hours</p>
          </div>
          <Card className="shadow-xl">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Student Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course Interested In *</Label>
                  <select id="course" name="course" value={formData.course} onChange={handleInputChange} required className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                    <option value="">Select a course</option>
                    <option value="ADCA">ADCA</option>
                    <option value="DCA">DCA</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Graphic Designing">Graphic Designing</option>
                    <option value="MS Office Professional">MS Office Professional</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Any specific questions or requirements..." rows={4} />
                </div>
                {submitMessage && (
                  <div className={`p-4 rounded-lg text-sm ${submitMessage.includes('Thank you') ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                    {submitMessage}
                  </div>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Submitting...' : <>Apply Now <Send className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">FAQs</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                  <span>{faq.question}</span>
                  <span className="ml-2 text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Rocket className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Start Your Career Journey Today</h2>
          <p className="text-xl text-blue-100 mb-8">Join hundreds of successful students and kickstart your IT career with Procotech</p>
          <div
 className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              <Link href="/courses">Enroll Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent">
              <Link href="/contact">Contact Counselor</Link>
            </Button>
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
              <a href="https://wa.me/918383811977" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
