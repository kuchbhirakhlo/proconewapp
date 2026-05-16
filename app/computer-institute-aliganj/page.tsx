"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, CheckCircle, Star } from "lucide-react"

export default function ComputerInstituteAliganjPage() {
  return (
    <>
      <Head>
        <title>Computer Institute in Aliganj Lucknow | Best IT Training Center | Proco Technologies</title>
        <meta name="description" content="Leading computer institute in Aliganj Lucknow. ADCA, DCA, CCC, O Level, Digital Marketing courses. Expert faculty, modern labs, job placement assistance." />
        <meta name="keywords" content="computer institute Aliganj Lucknow, IT training Aliganj, computer courses Lucknow, ADCA course Aliganj, DCA institute Lucknow, CCC training Aliganj" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/computer-institute-aliganj" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Proco Technologies - Aliganj",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Aliganj",
              "addressRegion": "Lucknow",
              "addressCountry": "IN"
            },
            "telephone": "+91-XXXXXXXXXX",
            "email": "theprocotech@gmail.com",
            "url": "https://proco.tech/computer-institute-aliganj",
            "description": "Premier computer training institute in Aliganj Lucknow offering comprehensive IT education"
          })}
        </script>
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              Computer Institute Aliganj Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Best Computer Institute in Aliganj, Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover excellence in IT education at Proco Technologies, Aliganj's premier computer training institute. Comprehensive courses with industry-relevant skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Enroll Now - Aliganj Institute
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call for Admission
              </Button>
            </div>
          </div>
        </section>

        {/* Institute Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Computer Institute in Aliganj Lucknow?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Situated in the vibrant locality of Aliganj, Lucknow's educational and commercial hub, our institute provides exceptional computer education with state-of-the-art facilities and dedicated mentorship.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Central Location</p>
                      <p className="text-gray-600">Aliganj, Lucknow - Heart of the City</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Convenient Timing</p>
                      <p className="text-gray-600">Multiple batches throughout the day</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Advanced Technology</p>
                      <p className="text-gray-600">Latest software and hardware training</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Available Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold text-lg">ADCA Course</h4>
                      <p className="text-gray-600">12 months | ₹15,000 | Advanced computer applications</p>
                    </div>
                    <div className="border-l-4 border-green-600 pl-4">
                      <h4 className="font-semibold text-lg">DCA Course</h4>
                      <p className="text-gray-600">6 months | ₹10,000 | Basic computer skills</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h4 className="font-semibold text-lg">CCC Course</h4>
                      <p className="text-gray-600">3 months | ₹6,000 | NIELIT certification</p>
                    </div>
                    <div className="border-l-4 border-orange-600 pl-4">
                      <h4 className="font-semibold text-lg">O Level Course</h4>
                      <p className="text-gray-600">1 year | ₹25,000 | BCA equivalent</p>
                    </div>
                    <div className="border-l-4 border-pink-600 pl-4">
                      <h4 className="font-semibold text-lg">Digital Marketing</h4>
                      <p className="text-gray-600">4 months | ₹20,000 | Complete online marketing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Aliganj */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Advantages of Studying in Aliganj Lucknow</h2>
              <p className="text-xl text-gray-600">Prime location benefits for computer education</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Educational Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Aliganj is renowned for its concentration of educational institutions, creating an academic atmosphere perfect for focused learning and skill development.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Business District</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Located in Lucknow's primary business district with easy access to corporate offices, providing excellent internship and job placement opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Transportation Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Excellent connectivity with metro stations, bus stands, and major roads. Convenient for students from all parts of Lucknow and nearby areas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Modern Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Access to shopping complexes, healthcare facilities, and entertainment options. Comfortable accommodation options for outstation students.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Safe Environment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Well-lit streets, security presence, and community vigilance make Aliganj one of Lucknow's safest localities for students and professionals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Growing IT Sector</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Increasing number of IT companies and startups in Aliganj area, providing real-world exposure and employment opportunities for computer graduates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Aliganj's Leading Computer Institute</h2>
            <p className="text-xl text-gray-600 mb-8">
              Start your IT journey at Proco Technologies in Aliganj Lucknow. Get certified, skilled, and job-ready with our comprehensive computer courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Apply for Admission - Aliganj
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                <Mail className="mr-2 h-4 w-4" />
                Send Inquiry
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}