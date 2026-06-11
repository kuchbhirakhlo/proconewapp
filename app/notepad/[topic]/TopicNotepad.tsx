"use client"

import { useEffect, useRef } from "react"
import { initializeNotepad, isValidTopicSlug } from "@/lib/notepad"
import SharedNotepad from "@/components/shared-notepad"
import { useRouter } from "next/navigation"

interface TopicNotepadProps {
  topic: string
  initialColor?: string
  isNew?: boolean
}

export default function TopicNotepad({ topic, initialColor = "slate", isNew = false }: TopicNotepadProps) {
  const router = useRouter()
  const initializedRef = useRef(false)

  useEffect(() => {
    // Validate the topic slug
    if (!isValidTopicSlug(topic)) {
      router.push("/notepad")
      return
    }

    // Initialize the notepad document only once when it's a new notepad
    if (isNew && !initializedRef.current) {
      initializedRef.current = true
      initializeNotepad(topic, initialColor).catch((err) => {
        console.error("Failed to initialize notepad:", err)
      })
    }
  }, [topic, initialColor, isNew, router])

  if (!isValidTopicSlug(topic)) {
    return null // will redirect
  }

  return <SharedNotepad topic={topic} initialColor={initialColor} isNew={isNew} />
}