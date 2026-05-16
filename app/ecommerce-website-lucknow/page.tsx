"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Mail, ShoppingCart, CreditCard, Truck } from "lucide-react"

export default function EcommerceWebsiteLucknowPage() {
  return (
    <>
      <Head>
        <title>E-commerce Website Development in Lucknow | Online Store Creation Services</title>
        <meta name="description" content="Professional e-commerce website development in Lucknow. Custom online stores, shopping carts, payment gateways. Secure, responsive, SEO-optimized e-commerce solutions." />
        <meta name="keywords" content="e-commerce website Lucknow, online store development Lucknow, shopping cart website Uttar Pradesh, e-commerce development company Lucknow, custom online store Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/ecommerce-website-lucknow" />
      </Head>
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              E-commerce Development Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              E-commerce Website Development in Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Launch your online store with professional e-commerce website development services in Lucknow. Secure, scalable, and conversion-optimized solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Start E-commerce Project
              </Button>
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Free Consultation
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete E-commerce Solutions</h2>
                <p className="text-lg text-gray-600 mb-6">
                  From product catalog to payment processing, we build comprehensive online stores that drive sales and provide excellent customer experience.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <ShoppingCart className="h-6 w-6 text-orange-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Shopping Cart</h3>
                      <p className="text-gray-600">Advanced cart functionality with wishlist and checkout options.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CreditCard className="h-6 w-6 text-orange-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Payment Gateway</h3>
                      <p className="text-gray-600">Secure payment processing with multiple gateway options.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Truck className="h-6 w-6 text-orange-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Inventory Management</h3>
                      <p className="text-gray-600">Complete stock management and order processing system.</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>E-commerce Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Product catalog with categories</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>User accounts and profiles</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Search and filtering options</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Order tracking system</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Admin dashboard</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Mobile-responsive design</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">E-commerce Packages</h2>
              <p className="text-xl text-gray-600">Choose the right e-commerce solution for your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Basic Store</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹45,000</span>
                    <p className="text-gray-600">One-time</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Up to 50 products
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Basic payment gateway
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Mobile responsive
                    </li>
                  </ul>
                  <Button className="w-full">Choose Basic</Button>
                </CardContent>
              </Card>

              <Card className="border-orange-500 border-2">
                <CardHeader>
                  <CardTitle className="text-center">Professional Store</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹85,000</span>
                    <p className="text-gray-600">One-time</p>
                  </div>
                  <Badge className="w-fit mx-auto">Most Popular</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Unlimited products
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Advanced payment options
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Inventory management
                    </li>
                  </ul>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Choose Professional</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Enterprise Store</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹1,50,000</span>
                    <p className="text-gray-600">One-time</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Custom features
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Multi-vendor support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Advanced analytics
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Launch Your Online Store Today</h2>
            <p className="text-xl text-gray-600 mb-8">
              Professional e-commerce website development in Lucknow. Turn your business into a 24/7 online sales machine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Get E-commerce Quote
              </Button>
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
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