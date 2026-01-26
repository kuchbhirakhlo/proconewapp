"use client"

import React, { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const CHATBOT_RESPONSES: Record<string, string> = {
  courses: `We offer comprehensive IT and software development courses at Proco Technologies:

**Popular Courses:**
- Full Stack Web Development: Master HTML, CSS, JavaScript, React, Node.js, and databases. Build real-world web applications from scratch.
- Mobile App Development: Learn cross-platform app development with Flutter and React Native.
- Advanced Diploma in Computer Application (ADCA): 1-year advanced diploma covering all modern technologies.
- Diploma in Computer Application (DCA): 6-month foundational diploma for beginners.
- Python Training: Learn Python for web development, data science, and automation.
- React.js & Next.js: Master modern JavaScript frameworks for frontend development.
- Cloud Computing: AWS, Google Cloud, and Azure fundamentals.

**Course Benefits:**
✓ 95% Job Placement Rate
✓ Industry Expert Instructors
✓ Hands-on Project Experience
✓ Certification Upon Completion
✓ Flexible Online & Offline Classes`,

  portfolio: `Proco Technologies Portfolio - What We've Created:

**Web Applications:**
- Custom SaaS Platforms for startups and enterprises
- E-commerce Solutions with payment gateway integration
- Enterprise Management Systems
- Real-time Dashboard Applications

**Mobile Applications:**
- iOS and Android apps across various industries
- Cross-platform mobile solutions using Flutter and React Native
- Healthcare, Finance, and E-commerce mobile apps

**Software Solutions:**
- Business Management Systems
- ERP Solutions for manufacturing and retail
- CRM Systems for sales and customer management
- Educational Platforms for online learning

**Our Technology Stack:**
Frontend: React, Next.js, Vue.js, Flutter
Backend: Node.js, Python, Java, C#
Databases: MongoDB, PostgreSQL, Firebase
Cloud: AWS, Google Cloud Platform, Azure

**Case Studies:**
We've successfully completed 100+ projects with 98% client satisfaction rate.`,

  student: `Proco Technologies Online Learning Platform for Students:

**Platform Features:**
✓ Interactive Online Courses with video lectures
✓ Live Classes with Industry Experts
✓ Hands-on Coding Labs and Projects
✓ Progress Tracking Dashboard
✓ Peer Collaboration Tools
✓ Doubt Solving Sessions
✓ Certificate of Completion
✓ Job Assistance & Placement Support

**Student Benefits:**
- Learn at your own pace with lifetime access to course materials
- Get mentored by industry professionals
- Build real-world projects for your portfolio
- Access to exclusive job opportunities
- Community of 5000+ active learners
- 24/7 Support Team

**Learning Paths:**
1. Web Development Path: Complete journey from HTML to deployment
2. App Development Path: Build iOS and Android apps
3. Backend Development Path: Master server-side technologies
4. Full Stack Path: Become a complete developer

**Student Success:**
- 95% completion rate
- Average salary increase after course: 45%
- 1000+ students placed in top companies`,

  features: `Key Features of Proco Technologies Platform:

**For Students:**
- Video Tutorials with Playback Speed Control
- Downloadable Resources and Source Code
- Quizzes and Assignments with Auto-grading
- Discussion Forums for Peer Support
- Live Coding Sessions (Monthly)
- Certificate Verification System
- Job Board with Exclusive Listings
- Internship Opportunities

**For Professionals:**
- Upskilling Courses
- Advanced Technical Training
- Corporate Training Programs
- Custom Course Development

**Technical Excellence:**
- Modern, Responsive UI
- Secure Cloud Infrastructure
- 99.9% Uptime Guarantee
- Fast Content Delivery
- Mobile-First Approach`,

  pricing: `Course Pricing at Proco Technologies:

**Full Stack Web Development**
- Price: ₹9,999
- Duration: 3 months
- Modules: 25+
- Projects: 5+

**Mobile App Development**
- Price: ₹7,999
- Duration: 2.5 months
- Modules: 20+
- Projects: 4+

**Advanced Diploma (ADCA)**
- Price: ₹8,999
- Duration: 1 year
- Modules: 50+
- Projects: 10+

**Diploma (DCA)**
- Price: ₹3,999
- Duration: 6 months
- Modules: 30+
- Projects: 6+

**Special Offers:**
- Early Bird Discount: 20% off
- Group Discounts Available
- EMI Options Available
- Money-Back Guarantee (7 days)
- Lifetime Access to Course Materials

Contact our sales team for customized packages!`,

  placement: `Job Placement & Career Support at Proco Technologies:

**Placement Statistics:**
- 95% Job Placement Rate
- Average CTC: ₹4.5 LPA for freshers
- Maximum CTC: ₹15+ LPA
- 1000+ students placed

**Placement Process:**
1. Resume Preparation & Optimization
2. Interview Preparation & Mock Interviews
3. Company Networking Events
4. Direct Job Referrals
5. Salary Negotiation Support
6. Career Counseling

**Partner Companies:**
We have partnerships with 200+ companies including:
- Startups (100+ active)
- MNCs and Fortune 500 companies
- IT Consulting Firms
- Product-based Companies

**Roles Available:**
- Frontend Developer
- Backend Developer
- Full Stack Developer
- Mobile App Developer
- Data Scientist
- DevOps Engineer
- QA Engineer`,

  contact: `Contact Proco Technologies:

**Phone:** +91-8383811977
**Email:** theprocotech@gmail.com
**Website:** procotech.in

**Office Locations:**
India - Multiple Cities

**Office Hours:**
Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 4:00 PM
Sunday: Closed

**Get in Touch:**
- For Course Inquiries: Call or Email
- For Admission: Visit Our Website
- For Support: Contact Support Team
- Follow Us On: Facebook, Instagram, LinkedIn, YouTube`,

  hello: `👋 Hi! Welcome to Proco Technologies! 

I'm your AI Assistant here to help you learn about our courses, portfolio, student platform, and more. You can ask me about:

📚 Courses - Our comprehensive IT training programs
🎯 Portfolio - Projects we've created
👨‍🎓 Student Platform - Our online learning environment
💼 Placement - Job assistance and career support
💰 Pricing - Course fees and offers
✨ Features - Platform capabilities
📞 Contact - How to reach us

What would you like to know about?`,

  default: `Thank you for your question! I appreciate your interest in Proco Technologies.

Here's what I can help you with:
- **Courses**: Learn about our comprehensive training programs
- **Portfolio**: Explore projects we've created
- **Student Platform**: Discover our online learning environment
- **Placement**: Find out about job assistance
- **Pricing**: Check course fees and special offers
- **Features**: Learn about platform capabilities
- **Contact**: Get our contact information

Please ask me about any of these topics, or feel free to ask "hi" to see all options!`
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showBlink, setShowBlink] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Blinking animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowBlink((prev) => !prev)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Initialize with greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: Message = {
        id: "initial-" + Date.now(),
        text: CHATBOT_RESPONSES.hello,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages([initialMessage])
    }
  }, [isOpen, messages.length])

  const getBotResponse = (userText: string): string => {
    const lowercaseText = userText.toLowerCase().trim()

    // Check for keyword matches
    for (const [keyword, response] of Object.entries(CHATBOT_RESPONSES)) {
      if (keyword === "default" || keyword === "hello") continue
      if (lowercaseText.includes(keyword)) {
        return response
      }
    }

    // Check for synonyms and related terms
    if (lowercaseText.match(/course|training|class|program|learn/i)) {
      return CHATBOT_RESPONSES.courses
    }
    if (lowercaseText.match(/portfolio|project|created|work|solution/i)) {
      return CHATBOT_RESPONSES.portfolio
    }
    if (lowercaseText.match(/student|platform|learn|dashboard|class/i)) {
      return CHATBOT_RESPONSES.student
    }
    if (lowercaseText.match(/price|cost|fee|paid|discount|offer/i)) {
      return CHATBOT_RESPONSES.pricing
    }
    if (lowercaseText.match(/job|placement|career|opportunity|interview/i)) {
      return CHATBOT_RESPONSES.placement
    }
    if (lowercaseText.match(/phone|email|address|location|reach/i)) {
      return CHATBOT_RESPONSES.contact
    }
    if (lowercaseText.match(/feature|function|capability|tool/i)) {
      return CHATBOT_RESPONSES.features
    }
    if (lowercaseText.match(/hi|hello|hey|greet/i)) {
      return CHATBOT_RESPONSES.hello
    }

    return CHATBOT_RESPONSES.default
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: "user-" + Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate bot thinking delay
    setTimeout(() => {
      const botResponse = getBotResponse(input)
      const botMessage: Message = {
        id: "bot-" + Date.now(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 rounded-full p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            {/* Blinking dot */}
            <div
              className={`absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 transition-opacity duration-500 ${
                showBlink ? "opacity-100" : "opacity-50"
              }`}
            />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 max-h-[600px] flex flex-col shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-t-lg text-white">
            <h3 className="font-bold text-lg">Proco Tech Chatbot</h3>
            <p className="text-sm text-blue-100">Ask about courses, portfolio & more!</p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-lg p-3 break-words ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs mt-1 block opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg rounded-bl-none p-3">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask about courses, portfolio..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Try asking about: courses, portfolio, student platform, pricing, placement
            </p>
          </div>
        </Card>
      )}

      {/* Greeting animation text when button is visible */}
      {!isOpen && (
        <div
          className={`fixed bottom-24 right-6 z-30 text-sm font-semibold text-gray-800 bg-white px-3 py-2 rounded-lg shadow-lg transition-all duration-500 ${
            showBlink ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          👋 Hi! Ask me anything
        </div>
      )}
    </>
  )
}
