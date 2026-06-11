import type { Metadata } from "next"
import TopicNotepad from "@/app/notepad/[topic]/TopicNotepad"

interface Props {
  params: Promise<{ topic: string }>
  searchParams: Promise<{ color?: string; new?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params
  const displayName = topic
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  return {
    title: `${displayName} - Shared Notepad | Proco Notepad`,
    description: `Real-time collaborative notepad for "${displayName}". Anyone with the link can edit and see changes live.`,
  }
}

export default async function TopicPage({ params, searchParams }: Props) {
  const { topic } = await params
  const { color, new: isNew } = await searchParams

  return (
    <TopicNotepad
      topic={topic}
      initialColor={color || "slate"}
      isNew={isNew === "true"}
    />
  )
}