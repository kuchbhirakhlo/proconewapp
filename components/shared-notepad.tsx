"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { subscribeToNotepad, updateNotepadContent, initializeNotepad } from "@/lib/notepad"
import { Users, Edit3, Loader2 } from "lucide-react"

export default function SharedNotepad() {
  const [lastEditedBy, setLastEditedBy] = useState("")
  const [editorName, setEditorName] = useState("")
  const [showNameInput, setShowNameInput] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isRemoteUpdateRef = useRef(false)
  const lastSentRef = useRef("")
  const isInitialSyncRef = useRef(true)
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const pendingSyncRef = useRef(false)
  const initialContentSetRef = useRef(false)

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

  // Initialize the notepad doc
  useEffect(() => {
    async function init() {
      await initializeNotepad()
      setIsInitialized(true)
    }
    init()
  }, [])

  // Sync content to Firestore
  const syncToFirestore = useCallback(async () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const text = textarea.value

    // Don't sync if nothing changed since last sync
    if (text === lastSentRef.current) return

    pendingSyncRef.current = false
    setIsSaving(true)
    try {
      await updateNotepadContent(text, editorName)
      lastSentRef.current = text
    } catch (err) {
      console.error("Failed to sync:", err)
    } finally {
      setIsSaving(false)
    }
  }, [editorName])

  // Subscribe to real-time updates from Firestore
  useEffect(() => {
    if (!isInitialized) return

    const unsubscribe = subscribeToNotepad((data) => {
      if (!data) return

      const remoteContent = data.content || ""
      lastSentRef.current = remoteContent

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
    })

    return () => unsubscribe()
  }, [isInitialized])

  // Handle local typing
  const handleInput = useCallback(() => {
    if (isRemoteUpdateRef.current) return

    const textarea = textareaRef.current
    if (!textarea) return

    setCharCount(textarea.value.length)

    // Mark that we need to sync
    pendingSyncRef.current = true

    // Debounce Firestore sync
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
    }

    typingTimerRef.current = setTimeout(() => {
      syncToFirestore()
    }, 500)
  }, [syncToFirestore])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditorName(e.target.value)
  }

  const handleNameSubmit = () => {
    if (editorName.trim()) {
      localStorage.setItem("notepad_editor_name", editorName.trim())
      setShowNameInput(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Edit3 className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white">Proco Notepad</h1>
          </div>
          <div className="flex items-center gap-4">
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
                Last edited by: <span className="text-slate-300">{lastEditedBy}</span>
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
            <div className="flex gap-2">
              <input
                type="text"
                value={editorName}
                onChange={handleNameChange}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="Enter your name"
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                autoFocus
              />
              <button
                onClick={handleNameSubmit}
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
            defaultValue=""
            onInput={handleInput}
            placeholder="Start typing here... Everyone viewing this page will see your changes in real-time!"
            className="w-full h-[70vh] p-6 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none font-mono text-sm leading-relaxed"
            spellCheck={true}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-500">Live collaboration active</span>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-4 text-center text-xs text-slate-600">
          <p>
            Shared notepad — anything written here is visible to everyone viewing this page in real-time.
            {charCount > 0 && ` (${charCount} characters)`}
          </p>
        </div>
      </div>
    </div>
  )
}