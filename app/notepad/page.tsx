import CreateNotepad from "./CreateNotepad"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create a Shared Notepad - Real-time Collaboration",
  description: "Create a topic-based shared notepad with a unique URL. Anyone with the link can edit in real-time.",
}

export default function NotepadHomePage() {
  return <CreateNotepad />
}