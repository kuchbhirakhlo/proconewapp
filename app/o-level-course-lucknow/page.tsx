"use client"
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, CheckCircle, Star, Phone, Mail } from "lucide-react"

export default function OLevelCoursePage() {
  return (
    <>
      <Head>
        <title>O Level Course Lucknow | NIELIT O Level Certification | IT Training Institute</title>
        <meta name="description" content="Enroll in NIELIT O Level course in Lucknow. Equivalent to BCA, programming, databases, networking. 1-year duration, government certification, career in IT sector." />
        <meta name="keywords" content="O Level course Lucknow, NIELIT O Level certification Lucknow, DOEACC O Level training Uttar Pradesh, IT foundation course Lucknow, BCA equivalent course Lucknow" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://proco.tech/o-level-course-lucknow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "O Level Course in Lucknow",
            "description": "NIELIT O Level IT certification training in Lucknow",
            "provider": {
              "@type": "Organization",
              "name": "Proco Technologies"
            },
            "courseMode": "full-time",
            "duration": "P1Y",
            "inLanguage": "en",
            "offers": {
              "@type": "Offer",
              "price": "25000",
              "priceCurrency": "INR"
            }
          })}
        </script>
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4" variant="secondary">
              O Level Course in Lucknow
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              NIELIT 'O' Level Course - Lucknow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Start your IT career with NIELIT 'O' Level certification in Lucknow. Equivalent to BCA, comprehensive programming and IT skills training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Enroll Now - O Level Course Lucknow
              </Button>
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose O Level Course in Lucknow?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  NIELIT 'O' Level is a foundation course in IT equivalent to BCA (Bachelor of Computer Applications). This government-recognized certification opens doors to higher education and excellent career opportunities in the IT sector.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="font-semibold">Duration</p>
                      <p className="text-gray-600">1 Year (2 Semesters)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="font-semibold">Certification</p>
                      <p className="text-gray-600">NIELIT Government</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="font-semibold">Batch Size</p>
                      <p className="text-gray-600">Limited to 20 Students</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="font-semibold">Fees</p>
                      <p className="text-gray-600">₹25,000 (Semester-wise)</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Course Advantages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Equivalent to BCA degree</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Government recognized certification</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Direct entry to A Level (MCA equivalent)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Strong foundation in programming</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Career in software development</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Industry-relevant skills</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">O Level Course Syllabus - Lucknow</h2>
              <p className="text-xl text-gray-600">Comprehensive IT curriculum equivalent to BCA foundation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Semester 1 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Semester 1: Foundation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">IT Tools and Business Systems</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Computer Appreciation</li>
                        <li>• MS Office (Word, Excel, PowerPoint)</li>
                        <li>• Internet & Web Technologies</li>
                        <li>• PC Assembly & Maintenance</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Internet Technology and Web Design</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• HTML & CSS</li>
                        <li>• JavaScript Basics</li>
                        <li>• Web Page Design</li>
                        <li>• Internet Security</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Semester 2 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Semester 2: Programming & Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Programming and Problem Solving</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• C Programming Language</li>
                        <li>• Data Structures</li>
                        <li>• Algorithms</li>
                        <li>• Problem Solving Techniques</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Application of Software</h4>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• DBMS with SQL</li>
                        <li>• Linux OS</li>
                        <li>• Software Engineering</li>
                        <li>• Project Work</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Practical Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Lab Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Hands-on practice in computer labs with latest software and tools.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Project Work</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Real-world projects and assignments to apply theoretical knowledge.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Industry Exposure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Case studies and industry-standard practices implementation.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Career Opportunities */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Prospects with O Level Certification in Lucknow</h2>
              <p className="text-xl text-gray-600">Excellent job opportunities in IT industry and higher education pathways</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Junior Programmer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Entry-level programming positions in software companies.</p>
                  <p className="font-semibold text-orange-600">Salary: ₹20,000 - ₹35,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Web Developer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Frontend web development using HTML, CSS, JavaScript.</p>
                  <p className="font-semibold text-orange-600">Salary: ₹25,000 - ₹40,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Database Administrator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Managing databases and SQL operations for organizations.</p>
                  <p className="font-semibold text-orange-600">Salary: ₹22,000 - ₹38,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">IT Support Engineer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Technical support and system maintenance roles.</p>
                  <p className="font-semibold text-orange-600">Salary: ₹18,000 - ₹32,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Software Tester</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Quality assurance and software testing positions.</p>
                  <p className="font-semibold text-orange-600">Salary: ₹20,000 - ₹35,000/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Higher Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Direct admission to A Level, BCA final year, or MCA programs.</p>
                  <p className="font-semibold text-orange-600">Academic Advancement</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-orange-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Why Proco Technologies for O Level Course in Lucknow?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Authorized NIELIT training center with experienced faculty, modern infrastructure, and guaranteed certification success.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">NIELIT Authorized</h3>
                <p>Official training partner with certified curriculum and examination facilities.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
                <p>Industry professionals with 10+ years experience in software development and training.</p>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Support</h3>
                <p>100% placement assistance, interview preparation, and industry connections in Lucknow.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">O Level Course FAQ - Lucknow</h2>
              <p className="text-xl text-gray-600">Important information about NIELIT O Level certification</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is NIELIT O Level course?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    NIELIT 'O' Level is a foundation level IT certification course equivalent to BCA. It provides comprehensive knowledge in computer applications, programming, and IT fundamentals, recognized by government and industry.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is O Level equivalent to BCA degree?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, NIELIT 'O' Level is considered equivalent to BCA (Bachelor of Computer Applications) degree for employment purposes. It provides the same knowledge base and skills required for entry-level IT positions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is the eligibility for O Level course?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Students who have passed 10+2 (or equivalent) in any stream with Mathematics are eligible for O Level course. Working professionals with basic computer knowledge can also apply.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How is the O Level examination conducted?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    O Level examination consists of theory and practical papers for each semester. Theory exams are conducted at NIELIT accredited centers, while practical examinations are held at authorized institutes like ours.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What are the job opportunities after O Level?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    O Level graduates can work as Junior Programmer, Web Developer, Database Assistant, IT Support Engineer, Software Tester, and other entry-level IT positions with starting salaries ranging from ₹20,000 to ₹35,000 per month.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I pursue higher education after O Level?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, O Level qualification allows direct admission to NIELIT 'A' Level (equivalent to MCA), BCA final year in many universities, and MCA programs. It also provides lateral entry to B.Tech programs in some institutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Start Your IT Career with O Level Certification in Lucknow</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join Lucknow's leading NIELIT authorized training center. Get BCA equivalent certification and launch your career in software development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Enroll Now - O Level Course Lucknow
              </Button>
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call: +91-8383811977
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