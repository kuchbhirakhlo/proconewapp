import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, BookOpen, Phone, ArrowLeft, Code, GraduationCap } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo/Brand */}
        <div className="flex justify-center items-center space-x-2 mb-8">
          <div className="flex items-center space-x-1">
            <Code className="h-10 w-10 text-blue-600" />
            <GraduationCap className="h-10 w-10 text-green-600" />
          </div>
          <span className="font-bold text-2xl text-gray-900">Proco Technologies</span>
        </div>

        {/* 404 Animation */}
        <div className="relative">
          <div className="text-9xl font-bold text-gray-200 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🔍</div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void. Don't worry, even the
            best developers encounter 404s!
          </p>
        </div>

        {/* Helpful Suggestions */}
        <Card className="text-left">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-600" />
              What can we help you find?
            </CardTitle>
            <CardDescription>Here are some popular destinations that might interest you:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/"
                className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors group"
              >
                <Home className="h-5 w-5 mr-3 text-blue-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-medium">Homepage</div>
                  <div className="text-sm text-gray-500">Back to our main page</div>
                </div>
              </Link>

              <Link
                href="/courses"
                className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors group"
              >
                <BookOpen className="h-5 w-5 mr-3 text-green-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-medium">Courses</div>
                  <div className="text-sm text-gray-500">Explore our programs</div>
                </div>
              </Link>

              <Link
                href="/about"
                className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors group"
              >
                <GraduationCap className="h-5 w-5 mr-3 text-purple-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-medium">About Us</div>
                  <div className="text-sm text-gray-500">Learn our story</div>
                </div>
              </Link>

              <Link
                href="/contact"
                className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors group"
              >
                <Phone className="h-5 w-5 mr-3 text-orange-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-medium">Contact</div>
                  <div className="text-sm text-gray-500">Get in touch</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="group">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="bg-transparent group">
            <Link href="/contact">
              <Phone className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Report Issue
            </Link>
          </Button>
        </div>

        {/* Fun Developer Message */}
        <div className="bg-gray-100 rounded-lg p-6 text-left">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">For Developers:</h3>
              <p className="text-sm text-gray-600 mb-2">
                If you're a developer and think this is a bug, here are some debugging tips:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check the URL for typos</li>
                <li>• Verify the route exists in your Next.js app</li>
                <li>• Check if the page was recently moved or renamed</li>
                <li>• Look for any redirect rules that might be interfering</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-sm text-gray-500">
          <p>
            Still can't find what you're looking for?
            <Link href="/contact" className="text-blue-600 hover:text-blue-500 ml-1">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-green-200 rounded-full opacity-10 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-200 rounded-full opacity-10 animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>
    </div>
  )
}
