"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, CheckCircle, Star, Phone, Mail } from "lucide-react"

export default function DCACoursePage() {
  return (
    <>
      <Head>
        <title>DCA Course in Lucknow | Diploma in Computer Applications | Proco Technologies</title>
        <meta name="description" content="Enroll in DCA course in Lucknow at Proco Technologies. Learn MS Office, basic programming, and computer fundamentals. 6-month duration, affordable fees, job-ready skills." />
        <meta name="keywords" content="DCA course in Lucknow, Diploma in Computer Applications Lucknow, computer diploma Lucknow, IT training Uttar Pradesh, DCA institute Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/dca-course-lucknow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "DCA Course in Lucknow",
            "description": "Diploma in Computer Applications training in Lucknow",
            "provider": {
              "@type": "Organization",
              "name": "Proco Technologies"
            },
            "courseMode": "full-time",
            "duration": "P6M",
            "inLanguage": "en",
            "offers": {
              "@type": "Offer",
              "price": "10000",
              "priceCurrency": "INR"
            }
          })}
        </script>
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              DCA Course in Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Diploma in Computer Applications (DCA) - Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Start your IT career with our comprehensive DCA course in Lucknow. Master essential computer skills and become job-ready in just 6 months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Enroll Now - DCA Course Lucknow
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose DCA Course in Lucknow?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  The Diploma in Computer Applications (DCA) course in Lucknow is designed for beginners who want to acquire fundamental computer skills quickly. Located in Uttar Pradesh's capital, our program focuses on practical training that leads to immediate employment opportunities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Duration</p>
                      <p className="text-gray-600">6 Months</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Certification</p>
                      <p className="text-gray-600">Recognized Diploma</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Class Size</p>
                      <p className="text-gray-600">Limited to 20 Students</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Fees</p>
                      <p className="text-gray-600">₹10,000 (Flexible Payment)</p>
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
                      <span>Complete MS Office proficiency</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Internet and email skills</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Basic programming concepts</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Typing and computer fundamentals</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Practical assignments and projects</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Job interview preparation</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">DCA Course Syllabus - Lucknow</h2>
              <p className="text-xl text-gray-600">Comprehensive curriculum for computer literacy and basic IT skills</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Computer Fundamentals</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Introduction to Computers</li>
                    <li>• Hardware & Software Concepts</li>
                    <li>• Operating Systems (Windows)</li>
                    <li>• File Management</li>
                    <li>• Basic Troubleshooting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">MS Office Suite</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Microsoft Word (Documents)</li>
                    <li>• Excel (Spreadsheets)</li>
                    <li>• PowerPoint (Presentations)</li>
                    <li>• Basic Formulas & Charts</li>
                    <li>• Document Formatting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Internet & Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Internet Browsing</li>
                    <li>• Email Management</li>
                    <li>• Social Media Basics</li>
                    <li>• Online Safety</li>
                    <li>• Digital Communication</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Typing Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Touch Typing Techniques</li>
                    <li>• Speed Building Exercises</li>
                    <li>• Accuracy Improvement</li>
                    <li>• English & Hindi Typing</li>
                    <li>• Certificate Programs</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Programming</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Programming Logic</li>
                    <li>• Basic C Language</li>
                    <li>• HTML Fundamentals</li>
                    <li>• Simple Algorithms</li>
                    <li>• Problem Solving</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Practical Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Lab Sessions</li>
                    <li>• Project Assignments</li>
                    <li>• Resume Building</li>
                    <li>• Interview Preparation</li>
                    <li>• Certification Exams</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Prospects After DCA in Lucknow</h2>
              <p className="text-xl text-gray-600">Immediate job opportunities in Lucknow's growing IT sector</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Computer Operator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Handle day-to-day computer operations and data management tasks.</p>
                  <p className="font-semibold text-purple-600">Salary: ₹12,000 - ₹20,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Entry Operator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Enter and manage data in various formats for organizations.</p>
                  <p className="font-semibold text-purple-600">Salary: ₹10,000 - ₹18,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Office Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Support administrative tasks with computer proficiency.</p>
                  <p className="font-semibold text-purple-600">Salary: ₹12,000 - ₹22,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Receptionist (Computer Savvy)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Handle front desk operations with computer skills.</p>
                  <p className="font-semibold text-purple-600">Salary: ₹11,000 - ₹19,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Junior Clerk</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Entry-level administrative position in government/private sector.</p>
                  <p className="font-semibold text-purple-600">Salary: ₹13,000 - ₹25,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Further Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Gateway to ADCA, BCA, or specialized IT courses.</p>
                  <p className="font-semibold text-purple-600">Higher Education Path</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Why Proco Technologies for DCA Course in Lucknow?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              As Lucknow's leading computer training institute, we focus on practical skills that employers demand in today's digital workplace.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Experienced Trainers</h3>
                <p>Learn from industry experts with 8+ years of teaching experience in Lucknow.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Job Placement Support</h3>
                <p>100% placement assistance with tie-ups with local companies in Lucknow.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Individual Attention</h3>
                <p>Small batch sizes ensure personalized training and doubt clearing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">DCA Course FAQ - Lucknow</h2>
              <p className="text-xl text-gray-600">Frequently asked questions about DCA training</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is the duration of DCA course in Lucknow?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The DCA course duration is 6 months (approximately 200 hours) including theory classes, practical sessions, and assessments. Weekend batches are available for working students.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is DCA course suitable for beginners?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, DCA is perfect for beginners with no prior computer knowledge. We start from basic computer fundamentals and gradually build up your skills through hands-on practice.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is the fee for DCA course in Lucknow?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The total course fee is ₹10,000. Payment can be made in installments: ₹4,000 at admission and ₹3,000 each after 2 months. Special discounts available for early bird registrations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What jobs can I get after DCA course?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    After DCA, you can work as Computer Operator, Data Entry Operator, Office Assistant, Receptionist, or Junior Clerk in various companies, banks, and government offices in Lucknow.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you provide DCA course materials?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, all study materials, practice assignments, and software access are provided. Students also get access to our computer lab for additional practice sessions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I take DCA course online?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Currently, we offer classroom-based training in Lucknow for better interaction and practical learning. However, we provide recorded lectures for revision purposes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Start Your IT Career with DCA Course in Lucknow</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the fastest-growing computer training institute in Lucknow. Transform your career with job-ready computer skills in just 6 months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Enroll Now - DCA Course Lucknow
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call: +91-XXXXXXXXXX
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                <Mail className="mr-2 h-4 w-4" />
                Email: theprocotech@gmail.com
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Location: Ground Floor D N Singh Complex, Semra Gauri, Aziz Nagar, Madiyanva, Lucknow, Uttar Pradesh 226020
            </p>
          </div>
        </section>
      </div>
    </>
  )
}