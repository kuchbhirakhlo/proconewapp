import { contactMetadata } from "@/lib/seo-config"

export const metadata = contactMetadata

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}