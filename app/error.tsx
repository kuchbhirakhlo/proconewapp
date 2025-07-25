"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <AlertTriangle className="h-20 w-20 text-red-500 animate-pulse" />
            <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping" />
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Oops! Something went wrong</h1>
          <p className="text-lg text-gray-600">We encountered an unexpected error while loading this page.</p>
        </div>

        {/* Error Details */}
        {process.env.NODE_ENV === "development" && (
          <Card className="text-left bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800 text-sm">Development Error Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-100 rounded p-3 font-mono text-xs text-red-800 overflow-auto max-h-32">
                {error.message}
              </div>
            </CardContent>
          </Card>
        )}

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

        {/* Help Text */}
        <div className="text-sm text-gray-500">
          <p>
            If this problem persists, please
            <Link href="/contact" className="text-blue-600 hover:text-blue-500 ml-1">
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
