"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home, Code, GraduationCap } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl w-full text-center space-y-8">
            {/* Logo/Brand */}
            <div className="flex justify-center items-center space-x-2 mb-8">
              <div className="flex items-center space-x-1">
                <Code className="h-10 w-10 text-blue-600" />
                <GraduationCap className="h-10 w-10 text-green-600" />
              </div>
              <span className="font-bold text-2xl text-gray-900">Proco Technologies</span>
            </div>

            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <AlertTriangle className="h-24 w-24 text-red-500 animate-pulse" />
                <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping" />
              </div>
            </div>

            {/* Main Message */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Something Went Wrong</h1>
              <p className="text-xl text-gray-600 max-w-lg mx-auto">
                We encountered an unexpected error. Our development team has been notified and is working on a fix.
              </p>
            </div>

            {/* Error Details Card */}
            <Card className="text-left bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Error Details
                </CardTitle>
                <CardDescription className="text-red-600">Technical information for debugging</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-red-100 rounded-lg p-4 font-mono text-sm text-red-800 overflow-auto">
                  <div className="mb-2">
                    <strong>Error:</strong> {error.message || "Unknown error occurred"}
                  </div>
                  {error.digest && (
                    <div>
                      <strong>Error ID:</strong> {error.digest}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={reset} className="group">
                <RefreshCw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Help Section */}
            <div className="bg-gray-100 rounded-lg p-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🛠️</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What happened?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    This error occurred while processing your request. Here's what you can do:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Try refreshing the page using the "Try Again" button</li>
                    <li>• Check your internet connection</li>
                    <li>• Clear your browser cache and cookies</li>
                    <li>• Try accessing the site from a different browser</li>
                    <li>• Contact our support team if the problem persists</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="text-sm text-gray-500">
              <p>
                If this error continues to occur, please
                <Link href="/contact" className="text-blue-600 hover:text-blue-500 ml-1">
                  contact our technical support team
                </Link>
                {error.digest && (
                  <span>
                    {" "}
                    and include the Error ID: <code className="bg-gray-200 px-1 rounded">{error.digest}</code>
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Floating Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-200 rounded-full opacity-10 animate-float" />
            <div
              className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-200 rounded-full opacity-10 animate-float"
              style={{ animationDelay: "2s" }}
            />
          </div>
        </div>
      </body>
    </html>
  )
}
