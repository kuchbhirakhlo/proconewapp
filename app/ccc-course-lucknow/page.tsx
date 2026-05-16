"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, CheckCircle, Star, Phone, Mail } from "lucide-react"

export default function CCCCoursePage() {
  return (
    <>
      <Head>
        <title>CCC Course in Lucknow | Course on Computer Concepts | NIELIT Certification</title>
        <meta name="description" content="Get CCC certification in Lucknow at Proco Technologies. Government recognized computer course, MS Office, internet skills. 3-month duration, NIELIT certified training." />
        <meta name="keywords" content="CCC course in Lucknow, Course on Computer Concepts Lucknow, NIELIT certification Lucknow, DOEACC CCC training Uttar Pradesh, computer basics course Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/ccc-course-lucknow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "CCC Course in Lucknow",
            "description": "Course on Computer Concepts (CCC) NIELIT certification training in Lucknow",
            "provider": {
              "@type": "Organization",
              "name": "Proco Technologies"
            },
            "courseMode": "full-time",
            "duration": "P3M",
            "inLanguage": "en",
            "offers": {
              "@type": "Offer",
              "price": "6000",
              "priceCurrency": "INR"
            }
          })}
        </script>
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              CCC Course in Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Course on Computer Concepts (CCC) - Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get NIELIT certified with our CCC course in Lucknow. Master computer basics, MS Office, and internet skills for government and private sector jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Enroll Now - CCC Course Lucknow
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose CCC Course in Lucknow?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  CCC (Course on Computer Concepts) is a government-recognized certification by NIELIT (National Institute of Electronics & Information Technology). Our CCC training in Lucknow prepares you for various government jobs and enhances your computer literacy skills.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Duration</p>
                      <p className="text-gray-600">3 Months</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Certification</p>
                      <p className="text-gray-600">NIELIT Recognized</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Batch Size</p>
                      <p className="text-gray-600">Limited to 25 Students</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Fees</p>
                      <p className="text-gray-600">₹6,000 (One-time Payment)</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Course Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Government recognized certification</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Mandatory for many government jobs</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Foundation for advanced computer courses</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Enhanced employability in private sector</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Online examination facility</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Lifetime validity of certification</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">CCC Course Syllabus - Lucknow</h2>
              <p className="text-xl text-gray-600">NIELIT prescribed curriculum for computer literacy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Introduction to Computer</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• What is Computer?</li>
                    <li>• Basic Applications of Computer</li>
                    <li>• Components of Computer System</li>
                    <li>• Central Processing Unit (CPU)</li>
                    <li>• Input/Output Devices</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Operating System</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Basics of Windows OS</li>
                    <li>• File and Folder Management</li>
                    <li>• Control Panel Settings</li>
                    <li>• System Tools</li>
                    <li>• Windows Accessories</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Word Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• MS Word Interface</li>
                    <li>• Creating & Editing Documents</li>
                    <li>• Formatting Text & Paragraphs</li>
                    <li>• Tables & Graphics</li>
                    <li>• Mail Merge</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Spreadsheets</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• MS Excel Interface</li>
                    <li>• Creating Worksheets</li>
                    <li>• Basic Formulas & Functions</li>
                    <li>• Charts & Graphs</li>
                    <li>• Data Sorting & Filtering</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Presentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• MS PowerPoint Basics</li>
                    <li>• Creating Slides</li>
                    <li>• Adding Content & Media</li>
                    <li>• Slide Transitions</li>
                    <li>• Presentation Delivery</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Internet & Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Internet Basics</li>
                    <li>• Web Browsing</li>
                    <li>• Email Communication</li>
                    <li>• Social Networking</li>
                    <li>• Cyber Security</li>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Opportunities with CCC Certification in Lucknow</h2>
              <p className="text-xl text-gray-600">Mandatory qualification for various government and private sector positions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Government Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Required for SSC, Banking, Railway, and other government examinations and jobs.</p>
                  <p className="font-semibold text-green-600">Eligibility Requirement</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Banking Sector</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Computer proficiency requirement for bank clerical and officer positions.</p>
                  <p className="font-semibold text-green-600">Mandatory Certification</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Private Sector</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Entry-level computer operator and administrative positions.</p>
                  <p className="font-semibold text-green-600">Salary: ₹12,000 - ₹20,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Teaching Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Computer teacher positions in schools and coaching institutes.</p>
                  <p className="font-semibold text-green-600">Additional Qualification</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Entry Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Freelance and office-based data entry operator positions.</p>
                  <p className="font-semibold text-green-600">Salary: ₹10,000 - ₹18,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Further Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Gateway to O Level, DCA, ADCA, and other advanced computer courses.</p>
                  <p className="font-semibold text-green-600">Foundation Course</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Why Proco Technologies for CCC Course in Lucknow?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Authorized NIELIT CCC training center in Lucknow with 100% exam pass guarantee and comprehensive exam preparation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">NIELIT Authorized</h3>
                <p>Official training center with certified instructors and study materials.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Pass Guarantee</h3>
                <p>Complete exam preparation with mock tests and doubt clearing sessions.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exam Registration</h3>
                <p>Assistance with online exam registration and center booking in Lucknow.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">CCC Course FAQ - Lucknow</h2>
              <p className="text-xl text-gray-600">Answers to common questions about NIELIT CCC certification</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is CCC course and who conducts it?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    CCC (Course on Computer Concepts) is a basic computer literacy course conducted by NIELIT (National Institute of Electronics & Information Technology), an autonomous body under Ministry of Electronics & IT, Government of India.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is CCC certification mandatory for government jobs?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, CCC certification is mandatory for various government jobs including SSC, Banking, Railway, and many state government positions. It demonstrates basic computer proficiency required for these roles.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is the exam pattern for CCC?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    CCC exam consists of 100 multiple choice questions to be completed in 90 minutes. The exam covers theory (50 marks) and practical (50 marks) aspects. Minimum passing marks are 30 in each section.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How to register for CCC exam?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    CCC exam registration is done online through NIELIT website. We provide complete assistance with registration process, exam center selection, and payment. The exam fee is approximately ₹500.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is the validity of CCC certificate?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    CCC certificate is valid for lifetime. Once obtained, you don't need to renew it. It serves as a permanent record of your basic computer literacy skills.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I give CCC exam without training?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    While it's possible to appear for the exam without formal training, we strongly recommend taking proper coaching to ensure success. Our structured training covers all syllabus topics with practical sessions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Your CCC Certification in Lucknow Today</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join Lucknow's premier NIELIT authorized CCC training center. Secure your future with government-recognized computer certification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Enroll Now - CCC Course Lucknow
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call: +91-XXXXXXXXXX
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                <Mail className="mr-2 h-4 w-4" />
                Email: theprocotech@gmail.com
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              NIELIT Authorized Training Center - Ground Floor D N Singh Complex, Semra Gauri, Aziz Nagar, Madiyanva, Lucknow, Uttar Pradesh 226020
            </p>
          </div>
        </section>
      </div>
    </>
  )
}