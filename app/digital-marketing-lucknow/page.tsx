"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Mail, TrendingUp, Users, Target } from "lucide-react"

export default function DigitalMarketingLucknowPage() {
  return (
    <>
      <Head>
        <title>Digital Marketing Services in Lucknow | Complete Online Marketing Solutions</title>
        <meta name="description" content="Comprehensive digital marketing services in Lucknow. SEO, social media, PPC, content marketing. Drive leads, increase sales, grow your business online." />
        <meta name="keywords" content="digital marketing services Lucknow, online marketing Lucknow, SEO services Lucknow, social media marketing Uttar Pradesh, PPC advertising Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/digital-marketing-lucknow" />
      </Head>
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              Digital Marketing Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Complete Digital Marketing Services in Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Grow your business with comprehensive digital marketing solutions. From SEO to social media, we handle all your online marketing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Marketing Strategy
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Free Consultation
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                    SEO Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Keyword research & optimization</li>
                    <li>• On-page & off-page SEO</li>
                    <li>• Local SEO for Lucknow</li>
                    <li>• Technical SEO audits</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-green-600" />
                    Social Media Marketing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Facebook & Instagram ads</li>
                    <li>• Content creation & scheduling</li>
                    <li>• Community management</li>
                    <li>• Influencer marketing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Target className="mr-2 h-5 w-5 text-purple-600" />
                    PPC Advertising
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Google Ads campaigns</li>
                    <li>• Display & video advertising</li>
                    <li>• Remarketing campaigns</li>
                    <li>• Performance tracking</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Digital Marketing Packages</h2>
              <p className="text-xl text-gray-600">Tailored solutions for businesses of all sizes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Starter Package</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹15,000</span>
                    <p className="text-gray-600">per month</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Social media management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Basic SEO optimization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Monthly reporting
                    </li>
                  </ul>
                  <Button className="w-full">Choose Starter</Button>
                </CardContent>
              </Card>

              <Card className="border-blue-500 border-2">
                <CardHeader>
                  <CardTitle className="text-center">Growth Package</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹30,000</span>
                    <p className="text-gray-600">per month</p>
                  </div>
                  <Badge className="w-fit mx-auto">Most Popular</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Complete SEO services
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Social media advertising
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Content marketing
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Choose Growth</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Enterprise Package</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹60,000</span>
                    <p className="text-gray-600">per month</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Full-service digital marketing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Advanced PPC campaigns
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Custom strategies
                    </li>
                  </ul>
                  <Button className="w-full">Choose Enterprise</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Boost Your Online Presence</h2>
            <p className="text-xl text-gray-600 mb-8">
              Professional digital marketing services in Lucknow. Drive traffic, generate leads, and increase revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Digital Marketing
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
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