import { db } from "./firebase"
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"

const NOTEPAD_COLLECTION = "shared_notepad"

export interface NotepadData {
  content: string
  updatedAt: Timestamp
  lastEditedBy: string
  topic: string
  themeColor: string
}

// Default theme colors for the notepad background
export const THEME_COLORS = [
  { name: "Slate", value: "slate", gradient: "from-slate-900 to-slate-800", editorBg: "bg-slate-800/50", border: "border-slate-700" },
  { name: "Emerald", value: "emerald", gradient: "from-emerald-950 to-emerald-900", editorBg: "bg-emerald-900/40", border: "border-emerald-800" },
  { name: "Blue", value: "blue", gradient: "from-blue-950 to-blue-900", editorBg: "bg-blue-900/40", border: "border-blue-800" },
  { name: "Purple", value: "purple", gradient: "from-purple-950 to-purple-900", editorBg: "bg-purple-900/40", border: "border-purple-800" },
  { name: "Rose", value: "rose", gradient: "from-rose-950 to-rose-900", editorBg: "bg-rose-900/40", border: "border-rose-800" },
  { name: "Amber", value: "amber", gradient: "from-amber-950 to-amber-900", editorBg: "bg-amber-900/40", border: "border-amber-800" },
  { name: "Cyan", value: "cyan", gradient: "from-cyan-950 to-cyan-900", editorBg: "bg-cyan-900/40", border: "border-cyan-800" },
  { name: "Green", value: "green", gradient: "from-green-950 to-green-900", editorBg: "bg-green-900/40", border: "border-green-800" },
]

export function getNotepadDocRef(topic: string) {
  const docId = topic.toLowerCase().replace(/[^a-z0-9-]/g, "-")
  return doc(db, NOTEPAD_COLLECTION, docId)
}

export async function initializeNotepad(topic: string, themeColor: string = "slate") {
  const docRef = getNotepadDocRef(topic)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      content: "",
      updatedAt: serverTimestamp(),
      lastEditedBy: "anonymous",
      topic,
      themeColor,
    })
  }

  return docRef
}

export async function getNotepadInfo(topic: string) {
  const docRef = getNotepadDocRef(topic)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data() as NotepadData
  }
  return null
}

export function subscribeToNotepad(topic: string, callback: (data: NotepadData | null) => void) {
  const docRef = getNotepadDocRef(topic)

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as NotepadData)
    } else {
      callback(null)
    }
  })
}

export async function updateNotepadContent(topic: string, content: string, editorName: string = "anonymous") {
  const docRef = getNotepadDocRef(topic)
  await setDoc(
    docRef,
    {
      content,
      updatedAt: serverTimestamp(),
      lastEditedBy: editorName,
    },
    { merge: true }
  )
}

export async function updateNotepadThemeColor(topic: string, themeColor: string) {
  const docRef = getNotepadDocRef(topic)
  await setDoc(
    docRef,
    {
      themeColor,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

export function isValidTopicSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && slug.length <= 100
}
