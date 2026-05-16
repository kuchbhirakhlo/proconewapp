"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Mail, Search, TrendingUp, Target } from "lucide-react"

export default function SEOServiceLucknowPage() {
  return (
    <>
      <Head>
        <title>SEO Services in Lucknow | Search Engine Optimization Company Uttar Pradesh</title>
        <meta name="description" content="Professional SEO services in Lucknow. Improve website rankings, increase traffic, boost online visibility. Local SEO, technical SEO, content optimization by experts." />
        <meta name="keywords" content="SEO services Lucknow, search engine optimization Lucknow, SEO company Uttar Pradesh, local SEO Lucknow, website SEO services Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/seo-services-lucknow" />
      </Head>
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-green-50 to-teal-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              SEO Services Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Professional SEO Services in Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Boost your website rankings and drive organic traffic with Lucknow's leading SEO company. Proven strategies for sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get SEO Audit
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call for Consultation
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
                    <Search className="mr-2 h-5 w-5 text-green-600" />
                    On-Page SEO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Keyword research & optimization</li>
                    <li>• Meta tags & descriptions</li>
                    <li>• Content optimization</li>
                    <li>• Internal linking</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                    Off-Page SEO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Link building campaigns</li>
                    <li>• Social media signals</li>
                    <li>• Brand mentions</li>
                    <li>• Guest posting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Target className="mr-2 h-5 w-5 text-purple-600" />
                    Local SEO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Google My Business optimization</li>
                    <li>• Local citations</li>
                    <li>• Location-based keywords</li>
                    <li>• Local content creation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">SEO Packages</h2>
              <p className="text-xl text-gray-600">Comprehensive SEO solutions for businesses of all sizes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Basic SEO</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹8,000</span>
                    <p className="text-gray-600">per month</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      On-page optimization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Basic keyword research
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Monthly reporting
                    </li>
                  </ul>
                  <Button className="w-full">Choose Basic</Button>
                </CardContent>
              </Card>

              <Card className="border-green-500 border-2">
                <CardHeader>
                  <CardTitle className="text-center">Professional SEO</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹18,000</span>
                    <p className="text-gray-600">per month</p>
                  </div>
                  <Badge className="w-fit mx-auto">Most Popular</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Complete SEO audit
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Link building
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Content optimization
                    </li>
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Choose Professional</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Enterprise SEO</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹35,000</span>
                    <p className="text-gray-600">per month</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Advanced link building
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Technical SEO
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      International SEO
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Improve Your Search Rankings</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get professional SEO services in Lucknow. Drive organic traffic and increase conversions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start SEO Today
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
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