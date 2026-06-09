"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Code, Smartphone, Database, Cloud, TrendingUp, Users, Briefcase, Building2,
  ArrowRight, Target, Award, Clock, Rocket, Search, Send, MessageCircle
} from "lucide-react"

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
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
  { value: 50, suffix: "+", label: "Projects Delivered", icon: Briefcase },
  { value: 30, suffix: "+", label: "Happy Clients", icon: Users },
  { value: 95, suffix: "%", label: "Client Retention", icon: Award },
  { value: 4, suffix: "+", label: "Years Experience", icon: Clock },
]

const services = [
  { icon: Code, title: "Website Development", description: "Custom websites using React, Next.js, and modern frameworks. Responsive, fast, and SEO-optimized.", color: "from-green-500 to-emerald-700" },
  { icon: Smartphone, title: "Mobile App Development", description: "Native and cross-platform mobile apps for iOS and Android with React Native and Flutter.", color: "from-blue-500 to-cyan-700" },
  { icon: Database, title: "CRM Software", description: "Custom CRM solutions to streamline your customer relationships and boost productivity.", color: "from-purple-500 to-indigo-700" },
  { icon: Search, title: "SEO Services", description: "Rank higher on Google with our data-driven SEO strategies and content optimization.", color: "from-orange-500 to-red-700" },
  { icon: TrendingUp, title: "Google Ads & SMM", description: "Drive qualified leads with strategic Google Ads campaigns and social media marketing.", color: "from-pink-500 to-rose-700" },
  { icon: Building2, title: "Digital Marketing", description: "Build your brand and engage customers across all digital channels for maximum ROI.", color: "from-teal-500 to-green-700" },
]

const whyChoose = [
  { icon: Code, title: "Custom Development", description: "Tailored solutions built for your specific business needs" },
  { icon: TrendingUp, title: "Affordable Pricing", description: "Competitive rates with flexible payment options" },
  { icon: Users, title: "Dedicated Support", description: "Ongoing maintenance and support after delivery" },
  { icon: Cloud, title: "Modern Technologies", description: "Built with the latest frameworks and best practices" },
  { icon: Target, title: "Results-Driven", description: "Focused on delivering measurable business outcomes" },
  { icon: Award, title: "Quality Assured", description: "Rigorous testing and quality assurance processes" },
]

const industries = [
  "E-commerce", "Healthcare", "Education", "Real Estate",
  "Manufacturing", "Hospitality", "Finance", "Retail"
]

const processSteps = [
  { step: 1, title: "Consultation", description: "We discuss your business goals and project requirements" },
  { step: 2, title: "Planning", description: "Detailed project plan with timeline, milestones, and deliverables" },
  { step: 3, title: "Development", description: "Agile development with regular updates and feedback loops" },
  { step: 4, title: "Launch & Support", description: "Deployment, monitoring, and ongoing technical support" },
]

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "A typical business website takes 2-4 weeks depending on complexity. Custom web applications may take 6-12 weeks. We provide detailed timelines during the planning phase."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes! We offer comprehensive post-launch support including bug fixes, updates, security patches, and feature enhancements. Our support plans start from basic maintenance to full managed services."
  },
  {
    question: "What is your pricing model?",
    answer: "We offer flexible pricing based on project scope - fixed price for well-defined projects and hourly/monthly retainers for ongoing work. We provide transparent quotes with no hidden costs after a free consultation."
  },
  {
    question: "Can you work with my existing team?",
    answer: "Absolutely. We frequently collaborate with in-house teams, providing additional development capacity, specialized expertise, or taking ownership of specific modules. We're flexible and adapt to your workflow."
  },
  {
    question: "Do you sign NDAs and own the code?",
    answer: "Yes, we sign NDAs to protect your intellectual property. Upon project completion, you own 100% of the code, designs, and assets. We also provide full source code and documentation."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in modern web technologies (React, Next.js, Node.js), mobile development (React Native, Flutter), cloud platforms (AWS, Firebase, Azure), and digital marketing tools (Google Ads, SEO, Analytics)."
  },
]

export default function BusinessPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

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
        body: JSON.stringify({ ...formData, inquiryType: 'business', source: 'business-landing-page' }),
      })
      if (response.ok) {
        setSubmitMessage("Thank you! We'll get back to you within 24 hours.")
        setFormData({ name: "", email: "", phone: "", service: "", message: "" })
      } else {
        setSubmitMessage("Something went wrong. Please try again or call us directly.")
      }
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again or call us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30">
                For Businesses & Entrepreneurs
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Grow Your Business with Technology
              </h1>
              <p className="text-lg md:text-xl text-green-100 mb-8">
                Custom websites, mobile apps, CRM software, SEO, and digital marketing solutions that drive real results for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-green-900 hover:bg-green-50">
                  <Link href="/portfolio">View Portfolio <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900 bg-transparent" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Free Consultation
                </Button>
              </div>
            </div>
            <div className="relative lg:block">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                {/* Mobile hero image */}
                <Image src="/mobilebusinesshero.png" alt="Business Solutions" fill className="object-cover lg:hidden" />
                {/* Desktop hero image */}
                <Image src="/businesshero.png" alt="Business Solutions" fill className="object-cover hidden lg:block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Trusted by Businesses</h2>
            <p className="text-gray-600 dark:text-gray-300">Numbers that demonstrate our commitment to client success</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-lg transition-shadow">
                <div className="flex justify-center text-green-600 dark:text-green-400 mb-4">
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

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Our Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Complete Digital Solutions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Everything you need to build, launch, and grow your digital presence</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <CardContent className="p-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">Why Choose Us</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Businesses Trust Procotech</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => (
              <Card key={index} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Domain expertise across multiple verticals</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <Building2 className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300">Our Process</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">How We Work</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-green-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Get Started</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Request Free Consultation</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Tell us about your project and we'll get back to you within 24 hours</p>
          </div>
          <Card className="shadow-xl">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
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
                  <Label htmlFor="service">Service Interested In *</Label>
                  <select id="service" name="service" value={formData.service} onChange={handleInputChange} required className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                    <option value="">Select a service</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="CRM Software">CRM Software</option>
                    <option value="SEO Services">SEO Services</option>
                    <option value="Google Ads & SMM">Google Ads & SMM</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Project Details (Optional)</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your project, goals, and timeline..." rows={4} />
                </div>
                {submitMessage && (
                  <div className={`p-4 rounded-lg text-sm ${submitMessage.includes('Thank you') ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                    {submitMessage}
                  </div>
                )}
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800" disabled={submitting}>
                  {submitting ? 'Submitting...' : <>Request Free Consultation <Send className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">FAQs</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Common questions about working with us</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400">
                  <span>{faq.question}</span>
                  <span className="ml-2 text-green-600 dark:text-green-400 group-open:rotate-180 transition-transform">▼</span>
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Rocket className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-green-100 mb-8">Let's build something amazing together. Get a free consultation and custom quote for your project.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-900 hover:bg-green-50">
              <Link href="/portfolio">View Our Work <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900 bg-transparent">
              <Link href="/contact">Contact Us</Link>
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
