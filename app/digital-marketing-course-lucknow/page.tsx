"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, CheckCircle, Star, Phone, Mail } from "lucide-react"

export default function DigitalMarketingCoursePage() {
  return (
    <>
      <Head>
        <title>Digital Marketing Course in Lucknow | SEO, Social Media, Google Ads Training</title>
        <meta name="description" content="Master digital marketing in Lucknow. Learn SEO, SEM, social media marketing, Google Ads, content marketing. 4-month course, certification, job placement assistance." />
        <meta name="keywords" content="digital marketing course Lucknow, SEO training Lucknow, social media marketing course Uttar Pradesh, Google Ads certification Lucknow, online marketing institute Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/digital-marketing-course-lucknow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Digital Marketing Course in Lucknow",
            "description": "Comprehensive digital marketing training in Lucknow covering SEO, SEM, social media, and online advertising",
            "provider": {
              "@type": "Organization",
              "name": "Proco Technologies"
            },
            "courseMode": "full-time",
            "duration": "P4M",
            "inLanguage": "en",
            "offers": {
              "@type": "Offer",
              "price": "20000",
              "priceCurrency": "INR"
            }
          })}
        </script>
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              Digital Marketing Course in Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Digital Marketing Course - Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Become a certified digital marketing expert in Lucknow. Learn SEO, Google Ads, social media marketing, and grow your career in the booming digital industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                Enroll Now - Digital Marketing Lucknow
              </Button>
              <Button size="lg" variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call for Details
              </Button>
            </div>
          </div>
        </section>

        {/* Course Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Digital Marketing Course in Lucknow?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Digital marketing is one of the fastest-growing industries in India. Our comprehensive course in Lucknow equips you with practical skills in SEO, SEM, social media marketing, and online advertising to help businesses grow digitally.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-pink-600" />
                    <div>
                      <p className="font-semibold">Duration</p>
                      <p className="text-gray-600">4 Months</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6 text-pink-600" />
                    <div>
                      <p className="font-semibold">Certification</p>
                      <p className="text-gray-600">Industry Recognized</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-pink-600" />
                    <div>
                      <p className="font-semibold">Batch Size</p>
                      <p className="text-gray-600">Limited to 15 Students</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-pink-600" />
                    <div>
                      <p className="font-semibold">Fees</p>
                      <p className="text-gray-600">₹20,000 (EMI Available)</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Course Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Complete SEO training (On-page & Off-page)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Google Ads & PPC campaign management</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Social media marketing (Facebook, Instagram, LinkedIn)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Content marketing & email marketing</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Analytics & conversion optimization</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Live projects & portfolio development</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Syllabus */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Digital Marketing Course Syllabus - Lucknow</h2>
              <p className="text-xl text-gray-600">Complete curriculum covering all aspects of digital marketing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Search Engine Optimization (SEO)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• On-page SEO techniques</li>
                    <li>• Off-page SEO strategies</li>
                    <li>• Keyword research & analysis</li>
                    <li>• Technical SEO</li>
                    <li>• Local SEO optimization</li>
                    <li>• SEO tools & reporting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Search Engine Marketing (SEM)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Google Ads fundamentals</li>
                    <li>• PPC campaign setup</li>
                    <li>• Bid management & optimization</li>
                    <li>• Ad copy writing</li>
                    <li>• Conversion tracking</li>
                    <li>• Performance analysis</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Social Media Marketing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Facebook marketing</li>
                    <li>• Instagram advertising</li>
                    <li>• LinkedIn B2B marketing</li>
                    <li>• Twitter & TikTok marketing</li>
                    <li>• Community management</li>
                    <li>• Social media analytics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Marketing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Content strategy development</li>
                    <li>• Blog writing & optimization</li>
                    <li>• Video content creation</li>
                    <li>• Infographics & visual content</li>
                    <li>• Content distribution</li>
                    <li>• Content management systems</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Email Marketing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Email marketing fundamentals</li>
                    <li>• List building strategies</li>
                    <li>• Email automation</li>
                    <li>• Campaign design & A/B testing</li>
                    <li>• Email deliverability</li>
                    <li>• Analytics & reporting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analytics & Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Google Analytics</li>
                    <li>• Google Search Console</li>
                    <li>• Social media insights</li>
                    <li>• Marketing automation tools</li>
                    <li>• CRM integration</li>
                    <li>• Performance reporting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Career Opportunities */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Opportunities in Digital Marketing - Lucknow</h2>
              <p className="text-xl text-gray-600">High-demand jobs with excellent growth prospects in Uttar Pradesh</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SEO Specialist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Optimize websites for search engines and improve organic rankings.</p>
                  <p className="font-semibold text-pink-600">Salary: ₹25,000 - ₹50,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PPC Executive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Manage Google Ads and PPC campaigns for clients.</p>
                  <p className="font-semibold text-pink-600">Salary: ₹20,000 - ₹45,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Social Media Manager</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Handle social media accounts and create engaging content.</p>
                  <p className="font-semibold text-pink-600">Salary: ₹18,000 - ₹40,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Marketing Specialist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Create and manage content marketing strategies.</p>
                  <p className="font-semibold text-pink-600">Salary: ₹22,000 - ₹45,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Digital Marketing Executive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Comprehensive digital marketing role in companies.</p>
                  <p className="font-semibold text-pink-600">Salary: ₹25,000 - ₹55,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Freelance Consultant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Work independently with multiple clients and projects.</p>
                  <p className="font-semibold text-pink-600">Income: ₹30,000 - ₹1,00,000/month</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Why Proco Technologies for Digital Marketing Course in Lucknow?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Learn from industry experts with real-world experience and get hands-on training with live campaigns and projects.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Industry Experts</h3>
                <p>Trainers with 8+ years experience running successful digital campaigns in Lucknow.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Projects</h3>
                <p>Work on real client projects and build a professional portfolio during training.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Job Placement</h3>
                <p>100% placement support with connections to top companies and agencies in Lucknow.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Digital Marketing Course FAQ - Lucknow</h2>
              <p className="text-xl text-gray-600">Answers to frequently asked questions about digital marketing training</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is digital marketing and why is it important?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Digital marketing involves promoting products and services through digital channels like search engines, social media, email, and websites. It's crucial because 80% of consumers research online before making purchase decisions, making digital presence essential for businesses.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do I need prior marketing experience for this course?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    No prior marketing experience is required. Our course starts from basics and is designed for beginners. However, basic computer skills and English communication are recommended for better learning experience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is the fee structure for digital marketing course?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The total course fee is ₹20,000. We offer flexible payment options: ₹7,000 at admission, ₹7,000 after 2 months, and ₹6,000 after course completion. EMI options are also available through partner banks.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Will I get practical training with real campaigns?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, our course includes hands-on training with live projects. Students work on real client campaigns for SEO, Google Ads, and social media marketing, building a professional portfolio in the process.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What certifications will I receive after completion?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You will receive Proco Technologies digital marketing certification, Google Ads certification, and HubSpot Academy certificates. These are industry-recognized credentials that enhance your job prospects.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is digital marketing a good career option in Lucknow?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Absolutely! Lucknow has a growing digital marketing industry with increasing demand for skilled professionals. Local businesses, startups, and agencies are actively hiring digital marketers with salaries starting from ₹20,000 per month.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Launch Your Digital Marketing Career in Lucknow</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join Lucknow's best digital marketing training institute. Get certified, gain practical experience, and start your career in the booming digital industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                Enroll Now - Digital Marketing Lucknow
              </Button>
              <Button size="lg" variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call: +91-8383811977
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                <Mail className="mr-2 h-4 w-4" />
                Email: theprocotech@gmail.com
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Address: Ground Floor D N Singh Complex, Semra Gauri, Aziz Nagar, Madiyanva, Lucknow, Uttar Pradesh 226020
            </p>
          </div>
        </section>
      </div>
    </>
  )
}