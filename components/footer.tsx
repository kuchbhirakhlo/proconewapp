import Link from "next/link"
import { Code, GraduationCap, Monitor, Smartphone, Globe, Mail, Phone, MapPin, Award, Users, BookOpen } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Software Development & Computer Institute */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                <Code className="h-8 w-8 text-red-400" />
                <GraduationCap className="h-8 w-8 text-green-400" />
              </div>
              <span className="font-bold text-lg">Proco Technologies</span>
            </Link>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              <strong className="text-white">Top software development company & computer institute in Lucknow, Uttar Pradesh.</strong> We provide professional IT training and digital solutions under one roof.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                <span className="text-gray-300 text-sm">
                  <strong className="text-white">Lucknow, Uttar Pradesh</strong> & Jaipur, Rajasthan
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400 shrink-0" />
                <span className="text-gray-300 text-sm">theprocotech@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Our Services - Software Development */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-red-400" />
              <span>Software Development</span>
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/website-development-lucknow" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-gray-500" />
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/ecommerce-website-lucknow" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <Smartphone className="h-3.5 w-3.5 text-gray-500" />
                  Ecommerce Websites
                </Link>
              </li>
              <li>
                <Link href="/seo-services-lucknow" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-gray-500" />
                  SEO Services Lucknow
                </Link>
              </li>
              <li>
                <Link href="/google-ads-service-lucknow" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <Monitor className="h-3.5 w-3.5 text-gray-500" />
                  Google Ads Service
                </Link>
              </li>
              <li>
                <Link href="/digital-marketing-lucknow" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-gray-500" />
                  Digital Marketing Lucknow
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-gray-500" />
                  Business Solutions
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-gray-500" />
                  Our Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Computer Courses - Institute */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-green-400" />
              <span>Computer Courses</span>
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/adca-course-lucknow" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                  ADCA Course in Lucknow
                </Link>
              </li>
              <li>
                <Link href="/dca-course-lucknow" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                  DCA Course in Lucknow
                </Link>
              </li>
              <li>
                <Link href="/ccc-course-lucknow" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                  CCC Course in Lucknow
                </Link>
              </li>
              <li>
                <Link href="/o-level-course-lucknow" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                  O Level Course in Lucknow
                </Link>
              </li>
              <li>
                <Link href="/digital-marketing-course-lucknow" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                  Digital Marketing Course
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                  All Computer Courses
                </Link>
              </li>
              <li>
                <Link href="/typing-test-online" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                  Free Typing Test
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Locations */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-400" />
              <span>Our Locations</span>
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/computer-institute-aliganj" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-500" />
                  Computer Institute Aliganj
                </Link>
              </li>
              <li>
                <Link href="/computer-institute-indira-nagar" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-500" />
                  Computer Institute Indira Nagar
                </Link>
              </li>
              <li>
                <Link href="/computer-institute-gomti-nagar" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-500" />
                  Computer Institute Gomti Nagar
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-gray-500" />
                  About Our Institute
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gray-500" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                  Our Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm font-medium">Follow Us:</span>
              <div className="flex space-x-3">
                <Link href="https://www.facebook.com/procotechnologies" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                  <Image src="/icons/facebook.svg" alt="Facebook" width={22} height={22} />
                </Link>
                <Link href="https://www.instagram.com/proco_technologies" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                  <Image src="/icons/instagram.svg" alt="Instagram" width={22} height={22} />
                </Link>
                <Link href="https://www.linkedin.com/company/procotechnologies" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                  <Image src="/icons/linkedin.svg" alt="LinkedIn" width={22} height={22} />
                </Link>
                <Link href="https://www.youtube.com/@procotechnologies" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                  <Image src="/icons/youtube.svg" alt="YouTube" width={22} height={22} />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2019-2025 <span className="text-white font-medium">Proco Technologies</span> — 
            <span className="text-gray-400"> Best <strong className="text-gray-300">software development company</strong> and <strong className="text-gray-300">computer institute in Lucknow, Uttar Pradesh</strong>.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}