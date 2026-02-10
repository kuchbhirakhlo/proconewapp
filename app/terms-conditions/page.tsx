import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, AlertCircle, BookOpen, Award, User, CreditCard, Scale } from "lucide-react"

export default function TermsConditionsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              Legal Agreement
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-600">
              Please read these terms carefully. By using Proco Technologies services, you're agreeing to these guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-green-50 rounded-lg p-8 border-l-4 border-green-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Proco Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                Since 2019, we've been helping students build successful careers in technology. These Terms & Conditions 
                outline the rules and guidelines for using our website, courses, student portal, and all related services. 
                Think of this as our agreement to work together respectfully and professionally.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                By accessing or using Proco Technologies' services, you agree to be bound by these terms. If you don't 
                agree with any part of these terms, please don't use our services.
              </p>
            </div>

            {/* Using Our Services */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Using Our Services</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Our goal is to provide you with the best learning experience possible. Here's what we ask in return:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li>Provide accurate and complete information when creating your account</li>
                <li>Keep your account credentials secure and not share them with others</li>
                <li>Use our courses and materials only for your personal learning (unless explicitly permitted otherwise)</li>
                <li>Respect other students and maintain a positive learning environment</li>
                <li>Not attempt to hack, copy, or misuse our platform in any way</li>
                <li>Not distribute our course content without written permission</li>
              </ul>
            </div>

            {/* Your Account */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Account & Responsibilities</h2>
              </div>
              <p className="text-gray-600 mb-4">
                When you create an account with Proco Technologies, you're joining our learning community:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li><strong>Accuracy Matters:</strong> You agree to provide truthful information and keep it updated</li>
                <li><strong>Account Security:</strong> You're responsible for maintaining the confidentiality of your account</li>
                <li><strong>Activity Ownership:</strong> You're responsible for all activities under your account</li>
                <li><strong>Account Termination:</strong> We reserve the right to suspend or terminate accounts that violate these terms</li>
                <li><strong>Age Requirements:</strong> Users under 18 should have parental permission to create an account</li>
              </ul>
            </div>

            {/* Course Enrollments */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Course Enrollments</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Enrolling in a course with Proco Technologies is an exciting step in your learning journey:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li><strong>Enrollment Confirmation:</strong> Your enrollment is confirmed once payment is processed</li>
                <li><strong>Course Access:</strong> You'll get access to course materials based on your enrollment type</li>
                <li><strong>Student Portal:</strong> Your dashboard tracks progress, certificates, and course materials</li>
                <li><strong>Self-Paced Learning:</strong> Most courses are self-paced, but some may have scheduled sessions</li>
                <li><strong>Completion Requirements:</strong> To receive a certificate, complete all required coursework</li>
                <li><strong>Certificates:</strong> Upon completion, you'll receive a Proco Technologies certificate</li>
              </ul>
            </div>

            {/* Payments & Refunds */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <CreditCard className="h-6 w-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Payments & Refunds</h2>
              </div>
              <p className="text-gray-600 mb-4">
                We want to make payments simple and transparent:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li><strong>Payment Methods:</strong> We accept various payment methods as displayed during checkout</li>
                <li><strong>Course Fees:</strong> All fees are clearly displayed before you enroll</li>
                <li><strong>Currency:</strong> All prices are in Indian Rupees (INR) unless stated otherwise</li>
                <li><strong>Taxes:</strong> Applicable taxes may be added as per government regulations</li>
                <li><strong>Refund Policy:</strong> We offer refunds within 7 days of enrollment if you're not satisfied</li>
                <li><strong>Refund Process:</strong> To request a refund, contact us with your enrollment details</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <Award className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
              </div>
              <p className="text-gray-600 mb-4">
                All course content, materials, and resources are protected by intellectual property rights:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li><strong>Our Content:</strong> All courses, videos, documents, and materials are owned by Proco Technologies</li>
                <li><strong>License to Learn:</strong> You get a limited license to use materials for personal learning</li>
                <li><strong>No Redistribution:</strong> You cannot share, sell, or distribute our content without permission</li>
                <li><strong>Student Work:</strong> You retain ownership of projects you create during courses</li>
                <li><strong>Portfolio Use:</strong> With permission, we may showcase student work in our portfolio</li>
                <li><strong>Feedback:</strong> Suggestions or feedback you provide may be used to improve our services</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Disclaimer & Limitations</h2>
              </div>
              <p className="text-gray-600 mb-4">
                While we're committed to your success, we need to be clear about some limitations:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li><strong>Educational Purpose:</strong> Courses are for educational purposes only</li>
                <li><strong>Career Outcomes:</strong> While we provide career guidance, we cannot guarantee job placement</li>
                <li><strong>Third-Party Links:</strong> We may link to external resources we don't control</li>
                <li><strong>Technical Issues:</strong> We try to keep our platform running smoothly but can't guarantee 100% uptime</li>
                <li><strong>Accuracy:</strong> Course content is regularly updated but may occasionally have errors</li>
                <li><strong>Your Success:</strong> Your results depend on your effort, practice, and dedication</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gray-100 p-3 rounded-lg mr-4">
                  <Scale className="h-6 w-6 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
              </div>
              <p className="text-gray-600 mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li>Proco Technologies shall not be liable for any indirect, incidental, or consequential damages</li>
                <li>Our total liability is limited to the amount you paid for our services</li>
                <li>We are not responsible for any loss of data, income, or opportunities</li>
                <li>You agree to indemnify us from any claims arising from your use of our services</li>
              </ul>
            </div>

            {/* Changes to Terms */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Changes to These Terms</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We may update these Terms & Conditions from time to time to reflect changes in our services or legal 
                requirements. When we make significant changes, we'll notify you through our website or via email. 
                The date at the top of this page indicates when these terms were last updated. Your continued use of 
                our services after any changes means you accept the new terms.
              </p>
            </div>

            {/* Governing Law */}
            <div className="bg-gray-50 rounded-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms & Conditions are governed by the laws of India. Any disputes will be resolved through 
                arbitration in Lucknow, Uttar Pradesh. By using our services, you agree to this jurisdiction.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-blue-50 rounded-lg p-8 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms & Conditions, please reach out to us. We're happy to clarify 
                anything that's unclear.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <span className="text-gray-700 font-medium">Email: theprocotech@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            <strong>Last Updated:</strong> February 2025
          </p>
          <p className="text-gray-500 text-sm mt-2">
            These Terms & Conditions are effective as of February 2025 for all users of Proco Technologies services.
          </p>
        </div>
      </section>
    </div>
  )
}
