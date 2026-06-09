import { aboutMetadata } from "@/lib/seo-config"

export const metadata = aboutMetadata

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}