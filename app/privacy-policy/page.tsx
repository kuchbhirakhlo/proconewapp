import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Mail, Users, BookOpen, RefreshCw, BarChart, Target, Globe } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              Your Privacy Matters to Us
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              At Proco Technologies, we believe your privacy is fundamental. Here's how we protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Proco Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                We started Proco Technologies back in 2019 with a simple belief: technology education should be 
                accessible, transparent, and built on trust. This Privacy Policy reflects that commitment. We want you 
                to feel confident that when you share your information with us, whether it's for enrolling in a course, 
                signing up for our newsletter, or using our typing practice tools, we handle it with care and respect.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Information You Share With Us</h2>
              </div>
              <p className="text-gray-600 mb-4">
                We collect information you provide directly to us. When you explore our courses, enroll in a program, 
                or reach out through our contact forms, you might share:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li><strong>Basic Details:</strong> Your name, email address, phone number, and any other contact information you choose to share</li>
                <li><strong>Educational Background:</strong> Information about your learning goals and previous experience</li>
                <li><strong>Payment Information:</strong> When you enroll, we collect payment details (though actual card numbers are processed securely through our payment partners)</li>
                <li><strong>Student Portal Data:</strong> Your progress, certificates, and course materials access through our student dashboard</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Everything we do with your information is aimed at giving you a better learning experience:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li><strong>Creating Your Account:</strong> Setting up your student profile so you can access courses and track progress</li>
                <li><strong>Personalizing Your Journey:</strong> Recommending courses based on your interests and career goals</li>
                <li><strong>Communication:</strong> Sending updates about your courses, new programs, and important notices</li>
                <li><strong>Improving Our Services:</strong> Understanding how students use our platform to make it better</li>
                <li><strong>Certificates & Verification:</strong> Generating and verifying your course completion certificates</li>
              </ul>
            </div>

            {/* How We Protect Your Data */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <Lock className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Keeping Your Information Safe</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Your trust is earned, not given. That's why we take security seriously:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>We use industry-standard encryption to protect your data during transmission</li>
                <li>Our servers are secured with modern firewall protection</li>
                <li>Regular security updates and monitoring keep our systems current</li>
                <li>Only authorized team members can access your personal information</li>
                <li>We never sell your data to third parties or advertisers</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
              </div>
              <p className="text-gray-600 mb-4">
                You have control over your information. Here's what you can do:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correct:</strong> Update or correct any inaccurate information</li>
                <li><strong>Delete:</strong> Request deletion of your account and associated data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing emails at any time</li>
                <li><strong>Export:</strong> Download your course progress and certificate data</li>
              </ul>
            </div>

            {/* Cookies & Tracking */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Eye className="h-6 w-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Cookies & Tracking Technologies</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Like most modern websites, we use cookies and similar tracking technologies to improve your experience:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li><strong>Essential Cookies:</strong> Required for the site to function properly (logging in, course access, session management)</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (pages visited, time spent, error reports)</li>
                <li><strong>Preference Cookies:</strong> Remember your settings, language preferences, and customized features</li>
                <li><strong>Functionality Cookies:</strong> Enable enhanced features like remembering your login status and preferences</li>
              </ul>
              <p className="text-gray-600 mt-4">
                <strong>Managing Cookies:</strong> You can control cookies through your browser settings. Most browsers allow you to 
                block all cookies, accept all cookies, or notify you when a cookie is set. Please note that blocking essential 
                cookies may prevent you from using certain features of our website.
              </p>
            </div>

            {/* Google AdSense & Third-Party Ads */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <Target className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Google AdSense & Third-Party Advertising</h2>
              </div>
              <p className="text-gray-600 mb-4">
                To keep our services free and accessible, we display advertisements on our website through Google AdSense 
                and other third-party ad networks. Here's how advertising works on our platform:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li><strong>Google AdSense:</strong> We use Google AdSense to serve ads on our website. Google uses cookies to 
                    serve ads based on your previous visits to our site or other websites.</li>
                <li><strong>Personalized Advertising:</strong> Google may use your browsing history to show personalized ads 
                    based on your interests. You can opt-out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a>.</li>
                <li><strong>Non-Personalized Ads:</strong> We may also display non-personalized ads that are not based on your interests.</li>
                <li><strong>Third-Party Ad Networks:</strong> Other advertising partners may also place cookies and similar 
                    technologies to deliver relevant advertisements across different websites.</li>
                <li><strong>Behavioral Targeting:</strong> Our advertising partners use cookies and tracking pixels to measure 
                    ad effectiveness and show you ads that are more relevant to your interests.</li>
              </ul>
              <p className="text-gray-600 mt-4">
                <strong>Your Choices:</strong> You can opt-out of interest-based advertising through the <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Digital Advertising Alliance</a> 
                or <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Your Online Choices</a> (EU users).
              </p>
            </div>

            {/* Data Usage & Analytics */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                  <BarChart className="h-6 w-6 text-cyan-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Data Usage & Analytics</h2>
              </div>
              <p className="text-gray-600 mb-4">
                We use analytics tools to understand how visitors interact with our website and improve user experience:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li><strong>Google Analytics:</strong> We use Google Analytics to analyze website traffic, track user behavior, 
                    and measure marketing campaign effectiveness. Google Analytics collects information such as:
                </li>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-8">
                    <li>Pages you visit and time spent on each page</li>
                    <li>How you found our website (search engines, direct visits, referrals)</li>
                    <li>Device and browser information</li>
                    <li>General location (country/city level)</li>
                </ul>
                <li><strong>Data Retention:</strong> We retain analytics data for a limited period to improve our services.
                    Anonymous data may be kept longer for trend analysis.</li>
                <li><strong>IP Anonymization:</strong> Where possible, we anonymize IP addresses to protect your privacy 
                    while still gaining useful insights.</li>
                <li><strong>Do Not Track:</strong> Some browsers offer a "Do Not Track" signal. Currently, there is no 
                    industry standard for handling these signals, so our website may not respond to them.</li>
              </ul>
            </div>

            {/* Third-Party Services */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <Globe className="h-6 w-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Third-Party Services & Data Sharing</h2>
              </div>
              <p className="text-gray-600 mb-4">
                We work with trusted third-party service providers to deliver our services. Here's who we share data with and why:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                <li><strong>Payment Processors:</strong> For processing course enrollments and payments securely</li>
                <li><strong>Cloud Hosting Providers:</strong> For storing your data and ensuring website availability</li>
                <li><strong>Email Service Providers:</strong> For sending course updates and communications</li>
                <li><strong>Analytics Providers:</strong> To understand website performance and user behavior</li>
                <li><strong>Advertising Partners:</strong> For displaying relevant advertisements (see AdSense section above)</li>
              </ul>
              <p className="text-gray-600 mt-4">
                <strong>We NEVER sell your personal data to anyone.</strong> We only share data with service providers 
                who help us operate our business, and they are contractually obligated to protect your information.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-rose-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Children's Privacy</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Proco Technologies is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe your child 
                has provided us with personal information, please contact us immediately. Upon verification, we will 
                promptly delete such information from our records.
              </p>
            </div>

            {/* Updates to Policy */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <RefreshCw className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How We Update This Policy</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                As our services grow and technology evolves, we may update this Privacy Policy. When we make meaningful 
                changes, we'll notify you through our website or via email. We encourage you to review this page 
                periodically. Your continued use of our services after any changes indicates your acceptance of the new terms.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-lg p-8 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions? We'd Love to Hear From You</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate 
                to reach out. We're here to help and will respond as quickly as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">theprocotech@gmail.com</span>
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
            This Privacy Policy is effective as of February 2025 and applies to all information collected through 
            our website, courses, student portal, and related services.
          </p>
        </div>
      </section>
    </div>
  )
}
