"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function CanonicalTag() {
  const pathname = usePathname()

  useEffect(() => {
    // Remove any existing canonical tag to avoid duplicates
    const existingTag = document.querySelector('link[rel="canonical"]')
    if (existingTag) {
      existingTag.remove()
    }

    // Create and append the new canonical tag
    const link = document.createElement("link")
    link.rel = "canonical"
    link.href = `https://www.procotech.in${pathname}`
    document.head.appendChild(link)

    // Cleanup: remove the tag when component unmounts or pathname changes
    return () => {
      const tagToRemove = document.querySelector('link[rel="canonical"]')
      if (tagToRemove) {
        tagToRemove.remove()
      }
    }
  }, [pathname])

  // This component doesn't render anything visible
  return null
}