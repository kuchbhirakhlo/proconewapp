"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, CheckCircle, Star } from "lucide-react"

export default function ComputerInstituteIndiraNagarPage() {
  return (
    <>
      <Head>
        <title>Computer Institute in Indira Nagar Lucknow | IT Training Center | Proco Technologies</title>
        <meta name="description" content="Excellent computer institute in Indira Nagar Lucknow. Professional IT courses, ADCA, DCA, CCC, O Level training. Career guidance and placement support." />
        <meta name="keywords" content="computer institute Indira Nagar Lucknow, IT training Indira Nagar, computer courses Lucknow, ADCA course Indira Nagar, DCA institute Lucknow, CCC training Indira Nagar" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/computer-institute-indira-nagar" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Proco Technologies - Indira Nagar",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Indira Nagar",
              "addressRegion": "Lucknow",
              "addressCountry": "IN"
            },
            "telephone": "+91-8383811977",
            "email": "theprocotech@gmail.com",
            "url": "https://proco.tech/computer-institute-indira-nagar",
            "description": "Professional computer training institute in Indira Nagar Lucknow offering comprehensive IT education"
          })}
        </script>
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-violet-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              Computer Institute Indira Nagar Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Premier Computer Institute in Indira Nagar, Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Excel in IT education at Proco Technologies, Indira Nagar's trusted computer training institute. Transform your career with industry-standard computer skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Enroll Now - Indira Nagar Institute
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Computer Institute in Indira Nagar Lucknow?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Nestled in the peaceful and well-planned locality of Indira Nagar, our institute offers a serene learning environment with focus on individual attention and skill development.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Peaceful Location</p>
                      <p className="text-gray-600">Indira Nagar, Lucknow - Residential Excellence</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Personalized Learning</p>
                      <p className="text-gray-600">Small batch sizes for better attention</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Quality Education</p>
                      <p className="text-gray-600">Focus on practical skills and concepts</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Course Offerings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold text-lg">ADCA Program</h4>
                      <p className="text-gray-600">12 months | ₹15,000 | Comprehensive IT training</p>
                    </div>
                    <div className="border-l-4 border-green-600 pl-4">
                      <h4 className="font-semibold text-lg">DCA Program</h4>
                      <p className="text-gray-600">6 months | ₹10,000 | Essential computer skills</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h4 className="font-semibold text-lg">CCC Certification</h4>
                      <p className="text-gray-600">3 months | ₹6,000 | Government approved</p>
                    </div>
                    <div className="border-l-4 border-orange-600 pl-4">
                      <h4 className="font-semibold text-lg">O Level Certification</h4>
                      <p className="text-gray-600">1 year | ₹25,000 | Professional standard</p>
                    </div>
                    <div className="border-l-4 border-pink-600 pl-4">
                      <h4 className="font-semibold text-lg">Digital Marketing</h4>
                      <p className="text-gray-600">4 months | ₹20,000 | Online business skills</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Indira Nagar */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Studying in Indira Nagar Lucknow</h2>
              <p className="text-xl text-gray-600">Ideal location for focused learning and skill development</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Residential Area</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Indira Nagar is a well-planned residential colony with peaceful surroundings, ideal for students who prefer a calm environment for serious study.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Family Atmosphere</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Safe and secure locality with community feel, making it comfortable for students from smaller towns and those staying away from home.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Growing Tech Scene</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Increasing presence of IT companies and startups in and around Indira Nagar, providing excellent internship and job opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Educational Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Area known for its emphasis on education with numerous coaching centers and training institutes, creating a competitive learning environment.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Well-maintained roads, reliable electricity supply, and good basic amenities make it convenient for daily commuting and studies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Strong community network with local businesses and services supporting educational initiatives and student welfare programs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Begin Your IT Journey at Indira Nagar Institute</h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose Proco Technologies in Indira Nagar Lucknow for quality computer education. Get expert guidance and launch your successful IT career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Apply for Admission - Indira Nagar
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
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