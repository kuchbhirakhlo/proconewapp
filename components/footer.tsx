import Link from "next/link"
import { Code, GraduationCap, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                <Code className="h-9 w-9 text-red-400" />
                <GraduationCap className="h-9 w-9 text-green-400" />
              </div>
              <span className="font-bold text-xl">Proco Technologies</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Leading computer institute and software development company providing quality education and innovative
              solutions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">+91 8383811977</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">avi.sr00@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">Maharishi Nagar 
                Lucknow Uttar Pradesh 226020</span>
              </div>
              <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-red-400" />
              <span className="text-gray-300">Jaisinghpura Khor
                Jaipur Rajasthan 302027</span>
                </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
            {/* Social Media */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/procotechnologies" target="_blank" className="text-gray-300 hover:text-white transition-colors">
                <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="https://www.instagram.com/proco_technologies" target="_blank" className="text-gray-300 hover:text-white transition-colors">
                <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="https://www.linkedin.com/company/procotechnologies" target="_blank" className="text-gray-300 hover:text-white transition-colors">
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
              </Link>
              <Link href="https://www.youtube.com/@procotechnologies" target="_blank" className="text-gray-300 hover:text-white transition-colors">
                <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} />
              </Link>
              </div>
              </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Web Development</li>
              <li className="text-gray-300">Mobile Apps</li>
              <li className="text-gray-300">Software Training</li>
              <li className="text-gray-300">IT Consulting</li>
            </ul>
             <Image src={"/msme.png"} alt="Proco Technologies Logo" width={150} height={50} className="bg-white text-right mt-4" />
          </div>
          
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2019-2025 Proco Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
