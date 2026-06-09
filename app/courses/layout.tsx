import { fullStackCourseMetadata } from "@/lib/seo-config"

export const metadata = fullStackCourseMetadata

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}