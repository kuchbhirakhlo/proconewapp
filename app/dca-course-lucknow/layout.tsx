import { dcaCourseMetadata } from "@/lib/seo-config"

export const metadata = dcaCourseMetadata

export default function DcaCourseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}