import SharedNotepad from "@/components/shared-notepad"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Proco Notepad - Real-time Collaborative Notes",
  description: "A real-time collaborative notepad. Write anything and everyone can see it live!",
}

export default function NotepadPage() {
  return <SharedNotepad />
}