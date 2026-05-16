"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Mail, Target, TrendingUp, DollarSign } from "lucide-react"

export default function GoogleAdsServiceLucknowPage() {
  return (
    <>
      <Head>
        <title>Google Ads Services in Lucknow | PPC Advertising Agency Uttar Pradesh</title>
        <meta name="description" content="Expert Google Ads services in Lucknow. PPC campaign management, keyword research, ad optimization. Certified Google Ads specialists driving results for businesses." />
        <meta name="keywords" content="Google Ads services Lucknow, PPC advertising Lucknow, pay per click Lucknow, Google Ads agency Uttar Pradesh, PPC campaign management Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/google-ads-service-lucknow" />
      </Head>
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              Google Ads Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Professional Google Ads Services in Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Maximize your ROI with expert Google Ads management in Lucknow. Certified specialists creating high-converting PPC campaigns for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                Start Google Ads Campaign
              </Button>
              <Button size="lg" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Free Strategy Call
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
                    <Target className="mr-2 h-5 w-5 text-yellow-600" />
                    Campaign Setup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Account structure setup</li>
                    <li>• Keyword research & selection</li>
                    <li>• Ad copy creation</li>
                    <li>• Landing page optimization</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                    Performance Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Bid management</li>
                    <li>• A/B testing</li>
                    <li>• Conversion tracking</li>
                    <li>• Performance monitoring</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-blue-600" />
                    ROI Focused
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Cost per acquisition</li>
                    <li>• Quality score improvement</li>
                    <li>• Budget optimization</li>
                    <li>• Monthly reporting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Google Ads Packages</h2>
              <p className="text-xl text-gray-600">Flexible PPC advertising solutions for every budget</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Starter Campaign</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹10,000</span>
                    <p className="text-gray-600">setup + ₹5,000/month</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Campaign setup
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Basic optimization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Monthly reporting
                    </li>
                  </ul>
                  <Button className="w-full">Choose Starter</Button>
                </CardContent>
              </Card>

              <Card className="border-yellow-500 border-2">
                <CardHeader>
                  <CardTitle className="text-center">Professional Campaign</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹20,000</span>
                    <p className="text-gray-600">setup + ₹10,000/month</p>
                  </div>
                  <Badge className="w-fit mx-auto">Most Popular</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Advanced campaign setup
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Daily optimization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Conversion tracking
                    </li>
                  </ul>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Choose Professional</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Enterprise Campaign</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹35,000</span>
                    <p className="text-gray-600">setup + ₹20,000/month</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Multi-campaign management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Advanced analytics
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Drive Quality Traffic to Your Website</h2>
            <p className="text-xl text-gray-600 mb-8">
              Professional Google Ads management in Lucknow. Get more customers, increase sales, and maximize your advertising budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                Launch Google Ads
              </Button>
              <Button size="lg" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
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