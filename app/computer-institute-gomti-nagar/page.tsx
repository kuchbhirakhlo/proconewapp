"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, CheckCircle, Star } from "lucide-react"

export default function ComputerInstituteGomtiNagarPage() {
  return (
    <>
      <Head>
        <title>Computer Institute in Gomti Nagar Lucknow | Best IT Training Center | Proco Technologies</title>
        <meta name="description" content="Top computer institute in Gomti Nagar Lucknow. ADCA, DCA, CCC, O Level, Digital Marketing courses. NIELIT certified training, job placement assistance, modern facilities." />
        <meta name="keywords" content="computer institute Gomti Nagar Lucknow, IT training center Gomti Nagar, computer courses Lucknow, ADCA course Gomti Nagar, DCA institute Lucknow, CCC training Gomti Nagar" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/computer-institute-gomti-nagar" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Proco Technologies - Gomti Nagar",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Gomti Nagar",
              "addressLocality": "Lucknow",
              "addressRegion": "Uttar Pradesh",
              "postalCode": "226010",
              "addressCountry": "IN"
            },
            "telephone": "+91-XXXXXXXXXX",
            "email": "theprocotech@gmail.com",
            "url": "https://proco.tech/computer-institute-gomti-nagar",
            "description": "Leading computer training institute in Gomti Nagar Lucknow offering ADCA, DCA, CCC, O Level, and Digital Marketing courses"
          })}
        </script>
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              Computer Institute Gomti Nagar Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Best Computer Institute in Gomti Nagar, Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join Proco Technologies - Lucknow's premier computer training institute in Gomti Nagar. Master IT skills with ADCA, DCA, CCC, O Level, and Digital Marketing courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Enroll Now - Gomti Nagar Institute
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Computer Institute in Gomti Nagar Lucknow?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Located in the heart of Gomti Nagar, Lucknow's most prestigious locality, Proco Technologies offers world-class computer education with modern facilities and experienced faculty. Our institute is easily accessible and provides a conducive learning environment for IT aspirants.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-semibold">Prime Location</p>
                      <p className="text-gray-600">Gomti Nagar, Lucknow - Uttar Pradesh's IT Hub</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-semibold">Flexible Timing</p>
                      <p className="text-gray-600">Morning, Evening & Weekend batches available</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-semibold">Modern Infrastructure</p>
                      <p className="text-gray-600">Latest computers, AC classrooms, high-speed internet</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Our Courses in Gomti Nagar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold text-lg">ADCA (Advanced Diploma)</h4>
                      <p className="text-gray-600">12 months | ₹15,000 | Complete computer proficiency</p>
                    </div>
                    <div className="border-l-4 border-green-600 pl-4">
                      <h4 className="font-semibold text-lg">DCA (Diploma)</h4>
                      <p className="text-gray-600">6 months | ₹10,000 | Basic computer skills</p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h4 className="font-semibold text-lg">CCC (NIELIT)</h4>
                      <p className="text-gray-600">3 months | ₹6,000 | Government certification</p>
                    </div>
                    <div className="border-l-4 border-orange-600 pl-4">
                      <h4 className="font-semibold text-lg">O Level (NIELIT)</h4>
                      <p className="text-gray-600">1 year | ₹25,000 | BCA equivalent</p>
                    </div>
                    <div className="border-l-4 border-pink-600 pl-4">
                      <h4 className="font-semibold text-lg">Digital Marketing</h4>
                      <p className="text-gray-600">4 months | ₹20,000 | SEO, SEM, Social Media</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Gomti Nagar Location */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Study at Computer Institute in Gomti Nagar Lucknow?</h2>
              <p className="text-xl text-gray-600">Strategic location advantages for quality education</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Premium Locality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Gomti Nagar is Lucknow's most developed and prestigious residential area, home to IT professionals, doctors, and business leaders. Study in an environment that motivates excellence.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Excellent Connectivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Well-connected by metro, buses, and major roads. Easy access from Indira Nagar, Aliganj, Hazratganj, and other parts of Lucknow. No transportation hassles for students.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">IT Industry Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Proximity to major IT companies, BPOs, and corporate offices in Gomti Nagar area. Great networking opportunities and industry connections for internships and jobs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Modern Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Access to shopping malls, restaurants, hospitals, and recreational facilities. Comfortable stay options for students from other cities. Safe and secure environment.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quality Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Located in an area known for educational excellence. Surrounded by reputed schools, colleges, and coaching institutes. Academic atmosphere conducive to learning.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Future Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Gomti Nagar is continuously developing with new IT parks and business centers. Studying here positions you for future career opportunities in Lucknow's growing tech sector.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">World-Class Facilities at Gomti Nagar Institute</h2>
              <p className="text-xl text-gray-600">Modern infrastructure for optimal learning experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Computer Lab</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Latest Intel i5/i7 computers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>High-speed broadband internet</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Licensed software (MS Office, Tally, etc.)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>UPS backup power supply</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Classroom</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Air-conditioned classrooms</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Projector and audio system</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Comfortable seating arrangement</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Wi-Fi connectivity</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact & Location */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Visit Our Gomti Nagar Computer Institute</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Located in the prime location of Gomti Nagar, Lucknow. Easy to reach from all parts of the city with excellent transportation facilities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p>Gomti Nagar, Lucknow</p>
                <p>Uttar Pradesh 226010</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p>+91-XXXXXXXXXX</p>
                <p>Mon-Sat: 9 AM - 6 PM</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p>theprocotech@gmail.com</p>
                <p>Quick response guaranteed</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Start Your IT Career at Gomti Nagar Institute</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join Lucknow's best computer institute in Gomti Nagar. Get certified, gain practical skills, and secure your future in the IT industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Apply for Admission - Gomti Nagar
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
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