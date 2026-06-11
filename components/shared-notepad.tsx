"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { subscribeToNotepad, updateNotepadContent, updateNotepadThemeColor, THEME_COLORS } from "@/lib/notepad"
import type { NotepadData } from "@/lib/notepad"
import { Users, Edit3, Loader2, Copy, Check, ExternalLink, Palette } from "lucide-react"
import Link from "next/link"

interface SharedNotepadProps {
  topic: string
  initialColor?: string
  isNew?: boolean
}

export default function SharedNotepad({ topic, initialColor = "slate", isNew = false }: SharedNotepadProps) {
  const [content, setContent] = useState("")
  const [lastEditedBy, setLastEditedBy] = useState("")
  const [editorName, setEditorName] = useState("")
  const [showNameInput, setShowNameInput] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [themeColor, setThemeColor] = useState(initialColor)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isRemoteUpdateRef = useRef(false)
  const lastSentRef = useRef("")
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null)

  const theme = THEME_COLORS.find((t) => t.value === themeColor) || THEME_COLORS[0]

  // Get or create a persistent anonymous name for this session
  useEffect(() => {
    let saved = localStorage.getItem("notepad_editor_name")
    if (!saved) {
      const names = ["Anonymous", "Guest", "User", "Editor", "Writer"]
      saved = names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 1000)
      localStorage.setItem("notepad_editor_name", saved)
    }
    setEditorName(saved)
    setShowNameInput(false)
  }, [])

  // Subscribe to real-time updates from Firestore
  useEffect(() => {
    const unsubscribe = subscribeToNotepad(topic, (data) => {
      if (!data) return

      const remoteContent = data.content || ""
      lastSentRef.current = remoteContent

      if (data.themeColor) {
        setThemeColor(data.themeColor)
      }

      const textarea = textareaRef.current
      if (!textarea) return

      // Save cursor position and selection before modifying
      const cursorPos = textarea.selectionStart
      const isFocused = document.activeElement === textarea

      // Apply remote content directly to DOM (bypasses React controlled-value)
      isRemoteUpdateRef.current = true
      textarea.value = remoteContent
      setCharCount(remoteContent.length)
      setLastEditedBy(data.lastEditedBy || "anonymous")

      // Restore cursor position if user was focused on the textarea
      if (isFocused && cursorPos !== null) {
        const safePos = Math.min(cursorPos, remoteContent.length)
        textarea.setSelectionRange(safePos, safePos)
      }

      // Reset flag after a tick so React doesn't interfere
      requestAnimationFrame(() => {
        isRemoteUpdateRef.current = false
      })

      setIsInitialized(true)
    })

    return () => unsubscribe()
  }, [topic])

  // Sync content to Firestore
  const syncToFirestore = useCallback(async () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const text = textarea.value

    // Don't sync if nothing changed since last sync
    if (text === lastSentRef.current) return

    setIsSaving(true)
    try {
      await updateNotepadContent(topic, text, editorName)
      lastSentRef.current = text
    } catch (err) {
      console.error("Failed to sync:", err)
    } finally {
      setIsSaving(false)
    }
  }, [topic, editorName])

  // Handle local typing
  const handleInput = useCallback(() => {
    if (isRemoteUpdateRef.current) return

    const textarea = textareaRef.current
    if (!textarea) return

    setCharCount(textarea.value.length)

    // Debounce Firestore sync
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
    }

    typingTimerRef.current = setTimeout(() => {
      syncToFirestore()
    }, 500)
  }, [syncToFirestore])

  const copyLink = () => {
    const url = `${window.location.origin}/notepad/${topic}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const topicDisplay = topic
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Edit3 className="w-6 h-6 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                {topicDisplay} Notepad
              </h1>
              <p className="text-xs text-slate-400">/{topic}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme Color Picker */}
            <div className="relative group">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
                title="Change theme color"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Theme</span>
              </button>
              <div className="absolute right-0 top-full mt-2 p-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl hidden group-hover:block hover:block z-50 min-w-[200px]">
                <div className="grid grid-cols-4 gap-1.5">
                  {THEME_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        setThemeColor(color.value)
                        updateNotepadThemeColor(topic, color.value)
                      }}
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color.gradient} border-2 transition-all ${
                        themeColor === color.value
                          ? "border-white scale-110"
                          : "border-transparent hover:border-slate-500"
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Link
                </>
              )}
            </button>
            <Link
              href="/notepad"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              New Notepad
            </Link>
            {isSaving && (
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <Loader2 className="w-3 h-3 animate-spin" />
                saving...
              </span>
            )}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Users className="w-4 h-4" />
              <span>Live</span>
            </div>
            {lastEditedBy && (
              <span className="text-xs text-slate-500">
                by <span className="text-slate-300">{lastEditedBy}</span>
              </span>
            )}
          </div>
        </div>

        {/* Name Editor */}
        {showNameInput && (
          <div className="mb-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your display name:
            </label>
            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                value={editorName}
                onChange={(e) => setEditorName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && editorName.trim()) {
                    localStorage.setItem("notepad_editor_name", editorName.trim())
                    setShowNameInput(false)
                  }
                }}
                placeholder="Enter your name"
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                autoFocus
              />
              <button
                onClick={() => {
                  if (editorName.trim()) {
                    localStorage.setItem("notepad_editor_name", editorName.trim())
                    setShowNameInput(false)
                  }
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Set Name
              </button>
            </div>
          </div>
        )}

        {/* Notepad Editor - Uncontrolled textarea */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            defaultValue={content}
            onInput={handleInput}
            placeholder="Start typing here... Everyone viewing this page will see your changes in real-time!"
            className={`w-full h-[70vh] p-6 ${theme.editorBg} ${theme.border} border rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none font-mono text-sm leading-relaxed`}
            spellCheck={true}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-500">Live collaboration</span>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-4 text-center text-xs text-slate-600">
          <p>
            Shared notepad — anything written here is visible to everyone viewing{" "}
            <a href={`/notepad/${topic}`} className="text-emerald-400 hover:underline">
              procotech.in/notepad/{topic}
            </a>{" "}
            in real-time.
            {charCount > 0 && ` (${charCount} characters)`}
          </p>
        </div>
      </div>
    </div>
  )
}