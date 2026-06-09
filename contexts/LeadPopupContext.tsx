"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

type PopupTrigger = "timer" | "exit-intent" | "card-click" | "manual" | null

interface LeadPopupContextType {
  isOpen: boolean
  trigger: PopupTrigger
  defaultLeadType: "Student" | "Business" | null
  openPopup: (trigger?: PopupTrigger, defaultType?: "Student" | "Business" | null) => void
  closePopup: () => void
  hasShownThisSession: boolean
  markShown: () => void
}

const LeadPopupContext = createContext<LeadPopupContextType | undefined>(undefined)

export function LeadPopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [trigger, setTrigger] = useState<PopupTrigger>(null)
  const [defaultLeadType, setDefaultLeadType] = useState<"Student" | "Business" | null>(null)
  const [hasShownThisSession, setHasShownThisSession] = useState(false)

  // Read session storage on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const shown = sessionStorage.getItem("proco_lead_popup_shown")
      if (shown === "true") {
        setHasShownThisSession(true)
      }
    } catch {
      // sessionStorage not available
    }
  }, [])

  const openPopup = useCallback(
    (newTrigger: PopupTrigger = "manual", defaultType: "Student" | "Business" | null = null) => {
      setTrigger(newTrigger)
      setDefaultLeadType(defaultType)
      setIsOpen(true)
    },
    []
  )

  const closePopup = useCallback(() => {
    setIsOpen(false)
    setTrigger(null)
    setDefaultLeadType(null)
  }, [])

  const markShown = useCallback(() => {
    setHasShownThisSession(true)
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("proco_lead_popup_shown", "true")
      } catch {
        // sessionStorage not available
      }
    }
  }, [])

  return (
    <LeadPopupContext.Provider
      value={{
        isOpen,
        trigger,
        defaultLeadType,
        openPopup,
        closePopup,
        hasShownThisSession,
        markShown,
      }}
    >
      {children}
    </LeadPopupContext.Provider>
  )
}

export function useLeadPopup() {
  const ctx = useContext(LeadPopupContext)
  if (!ctx) {
    throw new Error("useLeadPopup must be used inside <LeadPopupProvider>")
  }
  return ctx
}
