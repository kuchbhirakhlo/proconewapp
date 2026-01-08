import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Proco Technologies - Best Computer Institute & Software Development Company",
    template: "%s | Proco Technologies",
  },
  description: "Proco Technologies is a premier computer institute and software development company offering professional courses in web development, mobile app development, and comprehensive IT training. Learn from industry experts and build your career in tech.",
  generator: 'procotech',
  applicationName: "Proco Technologies",
  manifest: "/manifest.json",
  keywords: [
    "computer institute",
    "computer training institute",
    "computer learning center",
    "software development company",
    "web development course",
    "web development training",
    "full stack web development",
    "mobile app development course",
    "programming course",
    "coding classes",
    "IT training institute",
    "software training",
    "learn programming",
    "computer coding course",
    "python training",
    "javascript course",
    "react js training",
    "next js course",
    "node js training",
    "flutter app development",
    "android development course",
    "ios development training",
    "database management course",
    "cloud computing training",
    "diploma in computer application",
    "ADCA course",
    "DCA course",
    "professional IT courses",
    "job oriented training",
    "best computer institute",
    "affordable coding course",
    "online programming course",
    "computer certification course",
    "Proco Technologies",
    "software solutions provider",
    "custom software development",
    "business software solutions",
  ],
  authors: [{ name: "Proco Technologies" }],
  creator: "Proco Technologies",
  publisher: "Proco Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://procotech.in",
    siteName: "Proco Technologies",
    title: "Proco Technologies - Best Computer Institute & Software Development Company",
    description: "Premier computer institute offering web development, mobile app development, and IT training courses. Build your career with industry-expert instructors.",
    images: [
      {
        url: "/logo.png",
        width: 192,
        height: 192,
        alt: "Proco Technologies Logo",
      },
      {
        url: "/main-pic.png",
        width: 1200,
        height: 630,
        alt: "Proco Technologies Office",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proco Technologies - Best Computer Institute & Software Development",
    description: "Learn web development, mobile apps, and IT skills from industry experts. 95% job placement rate.",
    images: ["/main-pic.png"],
    creator: "@procotech",
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Proco Technologies",
    "description": "Premier computer institute and software development company offering professional IT training and custom software solutions.",
    "url": "https://procotech.in",
    "logo": "https://procotech.in/logo.png",
    "image": "https://procotech.in/main-pic.png",
    "telephone": "+91-XXXXXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "India",
      "addressCountry": "IN"
    },
    "areaServed": "Worldwide",
    "sameAs": [
      "https://www.facebook.com/procotech",
      "https://www.instagram.com/procotech",
      "https://www.linkedin.com/company/procotech",
      "https://www.youtube.com/@procotech"
    ],
    "offers": {
      "@type": "AggregateOffer",
      "offers": [
        {
          "@type": "Offer",
          "name": "Full Stack Web Development Course",
          "description": "Comprehensive web development training from beginner to advanced level",
          "price": "9999",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "name": "Mobile App Development Course",
          "description": "Cross-platform mobile app development training",
          "price": "7999",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "name": "ADCA - Advanced Diploma in Computer Application",
          "description": "1-year advanced computer application diploma course",
          "price": "8999",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "name": "DCA - Diploma in Computer Application",
          "description": "6-month computer application diploma course",
          "price": "3999",
          "priceCurrency": "INR"
        }
      ]
    }
  }

  return (
    <html lang="en">
      <head>
        {/* ✅ Google AdSense Script */}
        <Script
          id="google-adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8434537394521880"
          crossOrigin="anonymous"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
