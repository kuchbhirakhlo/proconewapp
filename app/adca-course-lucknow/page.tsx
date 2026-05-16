"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, CheckCircle, Star, Phone, Mail } from "lucide-react"

export default function ADCACoursePage() {
  return (
    <>
      <Head>
        <title>ADCA Course in Lucknow | Advanced Diploma in Computer Applications | Proco Technologies</title>
        <meta name="description" content="Join the best ADCA course in Lucknow at Proco Technologies. Learn MS Office, Tally, programming, and more. 12-month duration, affordable fees, job placement assistance." />
        <meta name="keywords" content="ADCA course in Lucknow, Advanced Diploma in Computer Applications Lucknow, computer training Lucknow, IT courses Uttar Pradesh, ADCA training institute Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/adca-course-lucknow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "ADCA Course in Lucknow",
            "description": "Advanced Diploma in Computer Applications training in Lucknow",
            "provider": {
              "@type": "Organization",
              "name": "Proco Technologies"
            },
            "courseMode": "full-time",
            "duration": "P12M",
            "inLanguage": "en",
            "offers": {
              "@type": "Offer",
              "price": "15000",
              "priceCurrency": "INR"
            }
          })}
        </script>
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              ADCA Course in Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Advanced Diploma in Computer Applications (ADCA) - Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master essential computer skills with our comprehensive ADCA course in Lucknow. Perfect for beginners and professionals looking to enhance their IT proficiency in Uttar Pradesh's capital city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Enroll Now - ADCA Course Lucknow
              </Button>
              <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose ADCA Course in Lucknow?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  The Advanced Diploma in Computer Applications (ADCA) course in Lucknow is designed to provide students with comprehensive knowledge of computer applications and programming concepts. Located in the heart of Uttar Pradesh, our institute offers hands-on training that prepares you for the digital workplace.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-semibold">Duration</p>
                      <p className="text-gray-600">12 Months</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-semibold">Certification</p>
                      <p className="text-gray-600">Industry Recognized</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-semibold">Class Size</p>
                      <p className="text-gray-600">Limited to 15 Students</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-semibold">Fees</p>
                      <p className="text-gray-600">₹15,000 (Installments Available)</p>
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
                      <span>Comprehensive MS Office training</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Tally ERP 9 certification included</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Programming fundamentals (C, C++, Java)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Internet and web technologies</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Database management with SQL</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Project work and portfolio development</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">ADCA Course Syllabus - Lucknow</h2>
              <p className="text-xl text-gray-600">Comprehensive curriculum covering all essential computer skills</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Module 1: MS Office Suite</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Microsoft Word (Advanced)</li>
                    <li>• Excel (Formulas & Functions)</li>
                    <li>• PowerPoint (Presentations)</li>
                    <li>• Access Database</li>
                    <li>• Outlook Email Management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Module 2: Accounting Software</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Tally ERP 9 Fundamentals</li>
                    <li>• GST Implementation</li>
                    <li>• Inventory Management</li>
                    <li>• Payroll Processing</li>
                    <li>• Financial Reporting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Module 3: Programming</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• C Programming Language</li>
                    <li>• C++ Object Oriented Programming</li>
                    <li>• Java Basics</li>
                    <li>• HTML & CSS Web Development</li>
                    <li>• JavaScript Fundamentals</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Module 4: Internet Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Internet Basics & Browsing</li>
                    <li>• Email Communication</li>
                    <li>• Social Media Management</li>
                    <li>• Online Security & Privacy</li>
                    <li>• E-commerce Fundamentals</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Module 5: Database Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• SQL Fundamentals</li>
                    <li>• MySQL Database Design</li>
                    <li>• Data Manipulation</li>
                    <li>• Query Optimization</li>
                    <li>• Database Administration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Module 6: Project Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Real-world Projects</li>
                    <li>• Portfolio Development</li>
                    <li>• Industry Case Studies</li>
                    <li>• Final Project Presentation</li>
                    <li>• Certification Preparation</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Opportunities After ADCA in Lucknow</h2>
              <p className="text-xl text-gray-600">Launch your IT career with promising job prospects in Uttar Pradesh</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Computer Operator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Handle data entry, document processing, and office automation tasks.</p>
                  <p className="font-semibold text-red-600">Salary: ₹15,000 - ₹25,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Entry Specialist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Manage databases, spreadsheets, and information systems for organizations.</p>
                  <p className="font-semibold text-red-600">Salary: ₹18,000 - ₹30,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Junior Accountant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Assist in accounting tasks using Tally and Excel for small businesses.</p>
                  <p className="font-semibold text-red-600">Salary: ₹20,000 - ₹35,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">IT Support Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Provide technical support and troubleshoot computer-related issues.</p>
                  <p className="font-semibold text-red-600">Salary: ₹22,000 - ₹35,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Office Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Handle administrative tasks with advanced computer proficiency.</p>
                  <p className="font-semibold text-red-600">Salary: ₹18,000 - ₹28,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Further Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Foundation for BCA, MCA, or specialized IT certifications.</p>
                  <p className="font-semibold text-red-600">Higher Studies Opportunity</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Why Proco Technologies for ADCA Course in Lucknow?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Located in the heart of Lucknow, Uttar Pradesh, we provide industry-relevant training with modern facilities and experienced faculty.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
                <p>Learn from certified professionals with 10+ years of industry experience in Lucknow.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Placement Support</h3>
                <p>Dedicated placement cell helps you find jobs in Lucknow and surrounding areas.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Modern Infrastructure</h3>
                <p>State-of-the-art computer labs with latest software and high-speed internet.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">ADCA Course FAQ - Lucknow</h2>
              <p className="text-xl text-gray-600">Common questions about our ADCA training program</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is the duration of ADCA course in Lucknow?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The ADCA course duration is 12 months (approximately 400 hours) including theory, practical sessions, and project work. We offer flexible timing options for working professionals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What are the eligibility criteria for ADCA course?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Students who have completed 10th or 12th standard are eligible for ADCA course. Basic computer knowledge is preferred but not mandatory as we start from fundamentals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is the fee structure for ADCA course in Lucknow?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The total course fee is ₹15,000. We offer installment options: ₹5,000 at admission, ₹5,000 after 4 months, and ₹5,000 after 8 months. Scholarships are available for meritorious students.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you provide placement assistance after ADCA course?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, we provide 100% placement assistance. Our dedicated placement cell conducts mock interviews, resume building, and connects students with companies in Lucknow and nearby areas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What certifications will I receive after completing ADCA?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You will receive ADCA certification from Proco Technologies, MS Office certification, Tally certification, and programming language certificates. These are industry-recognized credentials.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I do ADCA course online from Lucknow?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Currently, we offer classroom training in Lucknow. However, we provide recorded sessions and online doubt-clearing sessions for students who miss classes due to unavoidable circumstances.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your ADCA Journey in Lucknow?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the best ADCA course in Lucknow and unlock exciting career opportunities in the IT sector. Limited seats available for our upcoming batch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Enroll Now - ADCA Course Lucknow
              </Button>
              <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call: +91-XXXXXXXXXX
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