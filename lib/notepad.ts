import { db } from "./firebase"
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"

const NOTEPAD_DOC_ID = "shared-notepad"
const NOTEPAD_COLLECTION = "shared_notepad"

export interface NotepadData {
  content: string
  updatedAt: Timestamp
  lastEditedBy: string
}

export function getNotepadDocRef() {
  return doc(db, NOTEPAD_COLLECTION, NOTEPAD_DOC_ID)
}

export async function initializeNotepad() {
  const docRef = getNotepadDocRef()
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      content: "",
      updatedAt: serverTimestamp(),
      lastEditedBy: "anonymous",
    })
  }

  return docRef
}

export function subscribeToNotepad(callback: (data: NotepadData | null) => void) {
  const docRef = getNotepadDocRef()

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as NotepadData)
    } else {
      callback(null)
    }
  })
}

export async function updateNotepadContent(content: string, editorName: string = "anonymous") {
  const docRef = getNotepadDocRef()
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