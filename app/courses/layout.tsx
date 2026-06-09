import { fullStackCourseMetadata } from "@/lib/seo-config"
import { fullStackCourseJsonLd } from "@/lib/jsonld"

export const metadata = fullStackCourseMetadata

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD Structured Data — Full Stack Development Course */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={fullStackCourseJsonLd()}
      />
      {children}
    </>
  )
}
