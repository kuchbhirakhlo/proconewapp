"use client"

import { useEffect, useRef } from "react"
import { useLeadPopup } from "@/contexts/LeadPopupContext"

const TIMER_DELAY_MS = 5000 // 5 seconds
const EXIT_INTENT_THRESHOLD = 30 // mouse must leave from top with negative Y

/**
 * Auto-shows the lead popup after 5 seconds OR on exit-intent.
 * Mount this once on the homepage.
 */
export default function LeadPopupController() {
  const { isOpen, hasShownThisSession, openPopup } = useLeadPopup()
  const timerRef = useRef<number | null>(null)
  const exitIntentFiredRef = useRef(false)

  // 5-second auto-open
  useEffect(() => {
    if (hasShownThisSession || isOpen) return
    timerRef.current = window.setTimeout(() => {
      if (!isOpen && !hasShownThisSession) {
        openPopup("timer", null)
      }
    }, TIMER_DELAY_MS)
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [hasShownThisSession, isOpen, openPopup])

  // Exit intent (mouse leaves viewport from the top)
  useEffect(() => {
    if (hasShownThisSession || isOpen) return
    if (typeof window === "undefined") return

    // Only enable on desktop (pointer:fine)
    const isFinePointer = window.matchMedia("(pointer:fine)").matches
    if (!isFinePointer) return

    const onMouseLeave = (e: MouseEvent) => {
      if (exitIntentFiredRef.current) return
      if (hasShownThisSession || isOpen) return
      if (e.clientY <= EXIT_INTENT_THRESHOLD && e.relatedTarget == null) {
        exitIntentFiredRef.current = true
        openPopup("exit-intent", null)
      }
    }
    document.documentElement.addEventListener("mouseleave", onMouseLeave)
    return () => {
      document.documentElement.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [hasShownThisSession, isOpen, openPopup])

  return null
}
