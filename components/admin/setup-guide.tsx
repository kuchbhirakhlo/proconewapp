"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Copy, ExternalLink, Database, Shield, User } from "lucide-react"

export default function SetupGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps((prev) => (prev.includes(stepIndex) ? prev.filter((i) => i !== stepIndex) : [...prev, stepIndex]))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const setupSteps = [
    {
      title: "Create Admin User in Firebase Authentication",
      description: "First, create an admin user account in Firebase Console",
      icon: User,
      steps: [
        "Go to Firebase Console → Authentication → Users",
        "Click 'Add User'",
        "Email: admin@procotech.com",
        "Password: [Choose a secure password]",
        "Copy the User UID after creation",
      ],
      link: "https://console.firebase.google.com/project/procotech-879c2/authentication/users",
    },
    {
      title: "Add Admin Document to Firestore",
      description: "Create an admin document in the 'admins' collection",
      icon: Database,
      steps: [
        "Go to Firebase Console → Firestore Database",
        "Create collection named 'admins'",
        "Document ID: [Paste the User UID from step 1]",
        "Add the following fields:",
      ],
      code: `{
  "email": "admin@procotech.com",
  "role": "admin",
  "fullName": "Admin User",
  "createdAt": "2024-01-15T10:00:00Z",
  "permissions": {
    "courses": true,
    "portfolio": true,
    "students": true,
    "analytics": true
  }
}`,
      link: "https://console.firebase.google.com/project/procotech-879c2/firestore",
    },
    {
      title: "Configure Firestore Security Rules",
      description: "Set up security rules to protect your data",
      icon: Shield,
      steps: [
        "Go to Firebase Console → Firestore Database → Rules",
        "Replace the existing rules with the provided security rules",
        "Click 'Publish' to apply the rules",
      ],
      code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /admins/{adminId} {
      allow read, write: if request.auth != null && request.auth.uid == adminId;
    }
    
    match /courses/{courseId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    match /portfolio/{portfolioId} {
      allow read: if true;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    match /students/{studentId} {
      allow read: if request.auth != null && 
        (request.auth.uid == studentId || 
         exists(/databases/$(database)/documents/admins/$(request.auth.uid)));
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    match /enrollments/{enrollmentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
  }
}`,
      link: "https://console.firebase.google.com/project/procotech-879c2/firestore/rules",
    },
  ]

  const isStepCompleted = (index: number) => completedSteps.includes(index)
  const allStepsCompleted = completedSteps.length === setupSteps.length

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Firebase Setup Guide</h1>
        <p className="text-lg text-gray-600">Follow these steps to configure your Firebase database and admin access</p>
        <div className="mt-4">
          <Badge variant={allStepsCompleted ? "default" : "secondary"}>
            {completedSteps.length} of {setupSteps.length} steps completed
          </Badge>
        </div>
      </div>

      {allStepsCompleted && (
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            🎉 Setup complete! You can now access the admin panel at{" "}
            <a href="/admin/login" className="font-semibold underline">
              /admin/login
            </a>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {setupSteps.map((step, index) => {
          const Icon = step.icon
          const completed = isStepCompleted(index)

          return (
            <Card key={index} className={`transition-all ${completed ? "border-green-500 bg-green-50" : ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleStep(index)}
                      className={`p-2 rounded-full transition-colors ${
                        completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                    </button>
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon className="h-5 w-5" />
                        <span>
                          Step {index + 1}: {step.title}
                        </span>
                      </CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                  {step.link && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={step.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Firebase
                      </a>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    {step.steps.map((stepItem, stepIndex) => (
                      <li key={stepIndex}>{stepItem}</li>
                    ))}
                  </ol>

                  {step.code && (
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => copyToClipboard(step.code!)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm overflow-x-auto pr-12">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  )}

                  <Button
                    onClick={() => toggleStep(index)}
                    variant={completed ? "outline" : "default"}
                    className="w-full"
                  >
                    {completed ? "Mark as Incomplete" : "Mark as Complete"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-blue-800">
            <p>If you encounter any issues during setup:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Check the Firebase Console for any error messages</li>
              <li>Ensure your Firebase project has Firestore enabled</li>
              <li>Verify that Authentication is enabled with Email/Password provider</li>
              <li>Make sure you're using the correct project ID in the configuration</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
