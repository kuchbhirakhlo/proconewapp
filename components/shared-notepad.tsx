"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { subscribeToNotepad, updateNotepadContent, initializeNotepad } from "@/lib/notepad"
import { Users, Edit3, Loader2 } from "lucide-react"

export default function SharedNotepad() {
  const [content, setContent] = useState("")
  const [lastEditedBy, setLastEditedBy] = useState("")
  const [editorName, setEditorName] = useState("")
  const [showNameInput, setShowNameInput] = useState(true)
  const [activeUsers, setActiveUsers] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isRemoteUpdate = useRef(false)
  const lastSentContent = useRef("")
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  // Initialize the notepad doc and subscribe to real-time updates
  useEffect(() => {
    async function init() {
      await initializeNotepad()
      setIsInitialized(true)
    }
    init()
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    const unsubscribe = subscribeToNotepad((data) => {
      if (data) {
        isRemoteUpdate.current = true
        setContent(data.content || "")
        setLastEditedBy(data.lastEditedBy || "anonymous")
        isRemoteUpdate.current = false
      }
    })

    return () => unsubscribe()
  }, [isInitialized])

  // Broadcast active users via localStorage (simple approach)
  useEffect(() => {
    if (!isInitialized) return

    const channel = new BroadcastChannel("notepad_active_users")
    const heartbeat = setInterval(() => {
      channel.postMessage({ type: "ping", id: editorName })
    }, 2000)

    channel.onmessage = (event) => {
      if (event.data.type === "ping") {
        // We just track locally - this is a simplified approach
      }
    }

    return () => {
      clearInterval(heartbeat)
      channel.close()
    }
  }, [isInitialized, editorName])

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value
      setContent(newContent)

      if (isRemoteUpdate.current) return

      // Debounce firestore writes
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      typingTimeoutRef.current = setTimeout(async () => {
        if (newContent !== lastSentContent.current) {
          setIsSaving(true)
          try {
            await updateNotepadContent(newContent, editorName)
            lastSentContent.current = newContent
          } catch (err) {
            console.error("Failed to sync:", err)
          } finally {
            setIsSaving(false)
          }
        }
      }, 300)
    },
    [editorName]
  )

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

        {/* Notepad Editor */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
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
            Works like codeshare.io or a collaborative pastebin.
          </p>
        </div>
      </div>
    </div>
  )
}