"use client"

import { useState, useEffect } from "react"

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide splash screen after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex flex-col items-center justify-center z-[9999]">
      {/* Circle decorations */}
      <div className="absolute w-40 h-40 border-2 border-white/10 rounded-full animate-spin" />
      <div className="absolute w-60 h-60 border-2 border-white/10 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />

      <div className="relative w-30 h-30 animate-pulse">
        <img
          src="/proco_tech.jpg"
          alt="Proco Technologies"
          className="w-20 h-20 object-contain rounded-2xl shadow-2xl"
        />
      </div>

      <h1 className="mt-6 text-2xl lg:text-3xl font-bold text-white tracking-wider uppercase">
        Proco Technologies
      </h1>
      <p className="mt-3 text-sm text-white/80 tracking-wide">
        Innovate. Create. Transform.
      </p>

      <div className="flex gap-2 mt-8">
        <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" />
        <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  )
}
