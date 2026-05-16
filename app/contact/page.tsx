"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, CheckCircle, X } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry')
      }

      // Show thank you modal
      setShowThankYou(true)

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit inquiry. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Head>
        <title>Contact Proco Technologies in Lucknow - Best IT Courses in Uttar Pradesh</title>
        <meta name="description" content="Contact Proco Technologies for top IT courses in Lucknow, Uttar Pradesh. Enroll in ADCA, Digital Marketing, Software Development courses. Get in touch today!" />
        <meta name="keywords" content="contact proco technologies lucknow, IT courses lucknow, ADCA course lucknow, digital marketing course lucknow, software development course lucknow, computer courses uttar pradesh, training institute lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/contact" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Proco Technologies",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Ground Floor D N Singh Complex, Semra Gauri, Aziz Nagar, Madiyanva",
              "addressLocality": "Lucknow",
              "addressRegion": "Uttar Pradesh",
              "postalCode": "226020",
              "addressCountry": "IN"
            },
            "email": "theprocotech@gmail.com",
            "url": "https://proco.tech",
            "description": "Leading IT training institute in Lucknow offering ADCA, Digital Marketing, and Software Development courses.",
            "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-16:00"
          })}
        </script>
      </Head>
      <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4" variant="secondary">
            Contact Us
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your journey or have a project in mind? We'd love to hear from you. Reach out to us and let's
            discuss how we can help you achieve your goals.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Your First Name" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Your Last Name" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Mobile Number" value={formData.phone} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Course Inquiry / Project Discussion" value={formData.subject} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements or questions..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">
                        Ground Floor D N Singh Complex,Semra Gauri, Aziz Nagar,
                        <br />
                        Madiyanva,Lucknow
                        <br />
                        Uttar Pradesh 226020
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Branch Office</h3>
                      <p className="text-gray-600">
                        14 Shree Colony ,Near Ever Bright School,
                        <br />
                        JaiSingh Pura Khor
                        <br />
                        Jaipur Rajasthan 302027
                      </p>
                    </div>
                  </div>


                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">theprocotech@gmail.com</p>                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions about our courses and services.</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are the prerequisites for your courses?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Most of our beginner courses require no prior experience. For intermediate and advanced courses, we
                  recommend basic programming knowledge. Each course page lists specific prerequisites.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer job placement assistance?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! We have a dedicated career services team that helps with resume building, interview preparation,
                  and job placement. We maintain partnerships with local tech companies and have a 95% job placement
                  rate within 6 months of graduation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I take courses online or are they only in-person?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer both online and in-person classes to accommodate different learning preferences and
                  schedules. Our online courses include live sessions, recorded lectures, and interactive assignments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is your refund policy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee if you're not satisfied with your course. After 30 days,
                  refunds are considered on a case-by-case basis depending on circumstances.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses in Lucknow Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Best IT Courses in Lucknow, Uttar Pradesh</h2>
            <p className="text-xl text-gray-600">
              Discover top-rated computer courses and IT training programs in Lucknow. Join Proco Technologies for career-oriented education in Uttar Pradesh's capital city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ADCA Course */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">ADCA Course in Lucknow</CardTitle>
                <CardDescription>Advanced Diploma in Computer Applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Master essential computer skills with our comprehensive ADCA course in Lucknow. Learn MS Office, Tally, internet applications, and programming basics. Perfect for beginners looking to enter the IT field.
                </p>
                <h4 className="font-semibold mb-2">Why Choose ADCA in Lucknow?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• High demand for computer literacy skills</li>
                  <li>• Flexible timing for working professionals</li>
                  <li>• Industry-recognized certification</li>
                  <li>• Job placement assistance in Lucknow</li>
                </ul>
              </CardContent>
            </Card>

            {/* Digital Marketing Course */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Digital Marketing Course in Lucknow</CardTitle>
                <CardDescription>Master Online Marketing Skills</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn SEO, social media marketing, Google Ads, and content marketing with our digital marketing course in Lucknow. Become a certified digital marketer and help businesses grow online.
                </p>
                <h4 className="font-semibold mb-2">Why Choose Digital Marketing in Lucknow?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Growing demand for digital skills</li>
                  <li>• Freelance and remote work opportunities</li>
                  <li>• Practical projects and real campaigns</li>
                  <li>• Local business networking in Uttar Pradesh</li>
                </ul>
              </CardContent>
            </Card>

            {/* Software Development Course */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Software Development Course in Lucknow</CardTitle>
                <CardDescription>Full Stack Development Training</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Build websites and applications with our software development course in Lucknow. Learn HTML, CSS, JavaScript, React, Node.js, and database management. Start your coding career today.
                </p>
                <h4 className="font-semibold mb-2">Why Choose Software Development in Lucknow?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• High-paying tech jobs in Lucknow</li>
                  <li>• Hands-on coding projects</li>
                  <li>• Industry-standard tools and technologies</li>
                  <li>• Career support and internship opportunities</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              Located in the heart of Lucknow, Uttar Pradesh, Proco Technologies offers state-of-the-art computer training facilities with modern classrooms and experienced instructors. Our courses are designed to meet industry standards and prepare you for successful careers in IT.
            </p>
            <p className="text-gray-600">
              Contact us today to enroll in any of our IT courses in Lucknow or learn more about our comprehensive computer education programs in Uttar Pradesh.
            </p>
          </div>
        </div>
      </section>

      {/* Thank You Modal */}
      {showThankYou && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowThankYou(false)}
        >
          <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="text-center">
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Thank You!</CardTitle>
              <CardDescription className="text-base mt-2">
                Your inquiry has been received
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Thank you for reaching out to us. We appreciate your interest and will review your inquiry shortly.
              </p>
              <p className="text-sm text-gray-500">
                Our team will contact you within 24 hours at the email and phone number you provided.
              </p>
              <Button
                onClick={() => setShowThankYou(false)}
                className="w-full"
              >
                Got it, thanks!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
    </>
  )
}
