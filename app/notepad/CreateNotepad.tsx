"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { THEME_COLORS } from "@/lib/notepad"
import { Edit3, ArrowRight, Sparkles, Check, Loader2 } from "lucide-react"

export default function CreateNotepad() {
  const [topic, setTopic] = useState("")
  const [selectedColor, setSelectedColor] = useState(THEME_COLORS[0].value)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleCreate = async () => {
    const slug = topic
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9- ]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

    if (!slug) {
      setError("Please enter a topic name")
      return
    }

    if (slug.length > 100) {
      setError("Topic name is too long (max 100 characters)")
      return
    }

    setIsCreating(true)
    setError("")

    // Navigate to the new notepad with the topic and color as query params
    router.push(`/notepad/${slug}?color=${selectedColor}&new=true`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreate()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Edit3 className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create a Shared Notepad</h1>
          <p className="text-slate-400">
            Create a topic and get a unique URL to share with anyone. Everyone can edit in real-time.
          </p>
        </div>

        {/* Create Form */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-6">
          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              What do you want to write about?
            </label>
            <div className="relative">
              <input
                type="text"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value)
                  setError("")
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g. coding, project notes, ideas, meeting notes..."
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                autoFocus
              />
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            </div>
            {topic && (
              <p className="mt-2 text-xs text-slate-500">
                Your notepad URL: <span className="text-emerald-400">procotech.in/notepad/{topic.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "..."}</span>
              </p>
            )}
            {error && (
              <p className="mt-2 text-xs text-red-400">{error}</p>
            )}
          </div>

          {/* Color Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Choose your notepad theme color
            </label>
            <div className="grid grid-cols-4 gap-3">
              {THEME_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`relative p-3 rounded-xl border transition-all ${
                    selectedColor === color.value
                      ? "border-emerald-500 ring-2 ring-emerald-500/30"
                      : "border-slate-600 hover:border-slate-500"
                  }`}
                >
                  <div className={`w-full h-8 rounded-lg bg-gradient-to-br ${color.gradient}`} />
                  <span className="block text-xs text-slate-400 mt-1.5 text-center">
                    {color.name}
                  </span>
                  {selectedColor === color.value && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            disabled={isCreating || !topic.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-medium transition-colors text-lg"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Notepad
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* How it works */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">1️⃣</div>
            <p className="text-xs text-slate-500">Enter a topic name</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">2️⃣</div>
            <p className="text-xs text-slate-500">Pick a color theme</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">3️⃣</div>
            <p className="text-xs text-slate-500">Share the unique URL</p>
          </div>
        </div>

        {/* Existing notepads hint */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-600">
            Try visiting an existing notepad directly:{" "}
            <a href="/notepad/coding" className="text-emerald-400 hover:underline">
              /notepad/coding
            </a>
            {" · "}
            <a href="/notepad/ideas" className="text-emerald-400 hover:underline">
              /notepad/ideas
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

