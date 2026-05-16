"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Mail, Palette, Monitor, Users } from "lucide-react"

export default function WebsiteDesignLucknowPage() {
  return (
    <>
      <Head>
        <title>Website Design Services in Lucknow | Professional Web Design Company</title>
        <meta name="description" content="Expert website design services in Lucknow. Custom responsive web design, UI/UX design, creative website development. Affordable packages, professional designers." />
        <meta name="keywords" content="website design services Lucknow, web design company Lucknow, UI/UX design Lucknow, custom website design Uttar Pradesh, professional web designer Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/website-design-lucknow" />
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              Website Design Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Professional Website Design Services in Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Create stunning, user-friendly websites with Lucknow's top web design company. Custom designs that convert visitors into customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Start Your Design Project
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call for Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Creative Web Design Solutions</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our web design services combine creativity with functionality to deliver websites that not only look great but also perform exceptionally well.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Palette className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Custom Design</h3>
                      <p className="text-gray-600">Unique designs tailored to your brand and business goals.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Monitor className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Responsive Layout</h3>
                      <p className="text-gray-600">Mobile-friendly designs that work perfectly on all devices.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">User Experience</h3>
                      <p className="text-gray-600">Intuitive navigation and user-friendly interfaces.</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Design Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
                      <span>Requirement Analysis & Planning</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
                      <span>Wireframing & Mockup Design</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
                      <span>Visual Design & Development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">4</div>
                      <span>Testing & Final Delivery</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Web Design Packages</h2>
              <p className="text-xl text-gray-600">Choose the perfect design package for your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Basic Design</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹8,000</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Up to 5 pages design
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Responsive design
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      2 design revisions
                    </li>
                  </ul>
                  <Button className="w-full">Choose Basic</Button>
                </CardContent>
              </Card>

              <Card className="border-purple-500 border-2">
                <CardHeader>
                  <CardTitle className="text-center">Professional Design</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹18,000</span>
                  </div>
                  <Badge className="w-fit mx-auto">Most Popular</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Up to 15 pages design
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Advanced UI/UX
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      5 design revisions
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Choose Professional</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Premium Design</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹35,000</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Unlimited pages
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Premium design
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Unlimited revisions
                    </li>
                  </ul>
                  <Button className="w-full">Choose Premium</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Transform Your Online Presence</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get professional website design services in Lucknow. Contact us today for a free design consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Get Design Quote
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}