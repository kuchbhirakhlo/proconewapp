"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Phone, Mail, Globe, Code, Smartphone, ShoppingCart } from "lucide-react"

export default function WebsiteDevelopmentLucknowPage() {
  return (
    <>
      <Head>
        <title>Website Development Company in Lucknow | Professional Web Design Services</title>
        <meta name="description" content="Leading website development company in Lucknow. Custom web design, e-commerce, mobile apps. Affordable pricing, expert developers, SEO optimized websites." />
        <meta name="keywords" content="website development company Lucknow, web design services Lucknow, e-commerce website Lucknow, custom website development Uttar Pradesh, website design company Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/website-development-lucknow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Proco Technologies",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Ground Floor D N Singh Complex, Semra Gauri, Aziz Nagar, Madiyanva",
              "addressLocality": "Lucknow",
              "addressRegion": "Uttar Pradesh",
              "postalCode": "226020",
              "addressCountry": "IN"
            },
            "telephone": "+91-XXXXXXXXXX",
            "email": "theprocotech@gmail.com",
            "url": "https://proco.tech",
            "description": "Professional website development and digital marketing company in Lucknow",
            "service": [
              "Website Development",
              "Web Design",
              "E-commerce Solutions",
              "SEO Services",
              "Digital Marketing"
            ]
          })}
        </script>
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              Website Development Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Professional Website Development Company in Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transform your business with custom websites designed by Lucknow's leading web development company. Affordable, responsive, and SEO-optimized solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Web Development Services in Lucknow</h2>
              <p className="text-xl text-gray-600">From concept to launch, we handle every aspect of your website development</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-blue-600" />
                    Custom Website Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Unique, professional website designs tailored to your business needs and brand identity.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Responsive design for all devices</li>
                    <li>• Modern UI/UX principles</li>
                    <li>• Brand-consistent design</li>
                    <li>• Fast loading optimization</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Code className="mr-2 h-5 w-5 text-green-600" />
                    Web Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Robust backend development with latest technologies and secure coding practices.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• HTML5, CSS3, JavaScript</li>
                    <li>• PHP, Node.js, Python</li>
                    <li>• Database integration</li>
                    <li>• API development</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5 text-purple-600" />
                    E-commerce Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Complete online store setup with payment gateways and inventory management.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Shopping cart functionality</li>
                    <li>• Payment gateway integration</li>
                    <li>• Inventory management</li>
                    <li>• Order tracking system</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Smartphone className="mr-2 h-5 w-5 text-orange-600" />
                    Mobile Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Native and hybrid mobile apps for iOS and Android platforms.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• iOS app development</li>
                    <li>• Android app development</li>
                    <li>• Cross-platform solutions</li>
                    <li>• App store deployment</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SEO Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Built-in SEO features to improve your website's search engine rankings.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• On-page SEO setup</li>
                    <li>• Meta tags optimization</li>
                    <li>• URL structure optimization</li>
                    <li>• Performance optimization</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Maintenance & Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ongoing website maintenance and technical support services.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Regular updates</li>
                    <li>• Security monitoring</li>
                    <li>• Performance optimization</li>
                    <li>• 24/7 technical support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Affordable Website Development Packages</h2>
              <p className="text-xl text-gray-600">Transparent pricing with no hidden costs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Basic Website</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹15,000</span>
                    <p className="text-gray-600">One-time</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Up to 5 pages
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Responsive design
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Basic SEO setup
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Contact form
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      6 months support
                    </li>
                  </ul>
                  <Button className="w-full mt-4">Choose Basic</Button>
                </CardContent>
              </Card>

              <Card className="border-blue-500 border-2">
                <CardHeader>
                  <CardTitle className="text-center">Professional Website</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹35,000</span>
                    <p className="text-gray-600">One-time</p>
                  </div>
                  <Badge className="w-fit mx-auto">Most Popular</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Up to 15 pages
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Advanced design
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      CMS integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Social media integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      1 year support
                    </li>
                  </ul>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Choose Professional</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">E-commerce Website</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">₹65,000</span>
                    <p className="text-gray-600">One-time</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Complete online store
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Payment gateway
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Inventory management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Admin panel
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      1 year support
                    </li>
                  </ul>
                  <Button className="w-full mt-4">Choose E-commerce</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Success Stories</h2>
              <p className="text-xl text-gray-600">Real results from our website development projects</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Local Business Website</CardTitle>
                  <CardDescription>Restaurant website with online ordering system</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "Proco Technologies created a stunning website for our restaurant. The online ordering system has increased our sales by 40% in just 3 months."
                  </p>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-2">5.0 Rating</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>E-commerce Platform</CardTitle>
                  <CardDescription>Complete online store for fashion retailer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "The e-commerce website exceeded our expectations. User-friendly interface and smooth payment processing. Highly recommended!"
                  </p>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-2">5.0 Rating</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose Proco Technologies?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Lucknow's trusted website development company with 5+ years of experience and 500+ successful projects.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Experienced Team</h3>
                <p>Skilled developers with expertise in latest technologies and frameworks.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Latest Technologies</h3>
                <p>Using cutting-edge tools and technologies for modern, scalable websites.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p>Dedicated support team available round the clock for all your needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Build Your Website?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact Lucknow's best website development company today. Get a free consultation and quote for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call: +91-XXXXXXXXXX
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                <Mail className="mr-2 h-4 w-4" />
                Email: theprocotech@gmail.com
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Ground Floor D N Singh Complex, Semra Gauri, Aziz Nagar, Madiyanva, Lucknow, Uttar Pradesh 226020
            </p>
          </div>
        </section>
      </div>
    </>
  )
}