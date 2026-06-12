
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { homepageMetadata } from "@/lib/seo-config"
import { lucknowBranchJsonLd, jaipurBranchJsonLd } from "@/lib/jsonld"
import Script from "next/script"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import CanonicalTag from "@/components/canonical-tag"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", 
  preload: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Proco Technologies - Best Computer Institute & Software Development Company",
    template: "%s | Proco Technologies",
  },
  description: "Proco Technologies is a premier computer institute and software development company offering professional courses in web development, mobile app development, and comprehensive IT training. Learn from industry experts and build your career in tech.",
  generator: 'procotech',
  applicationName: "Proco Technologies",
  manifest: "/manifest.json",
  // Meta keywords tag intentionally omitted — Google ignores it since 2009,
  // and long keyword lists harm credibility. Keywords are instead used in
  // page content, headings, image alt text, and JSON-LD structured data.
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
  alternates: {
    canonical: "https://www.procotech.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.procotech.in",
    siteName: "Proco Technologies",
    title: "Proco Technologies - Best Computer Institute & Software Development Company",
    description: "Premier computer institute offering web development, mobile app development, and IT training courses. Build your career with industry-expert instructors.",
    images: [
      {
        url: "/proco_tech.jpg",
        width: 192,
        height: 192,
        alt: "Proco Technologies Logo",
      },
      {
        url: "/proco_tech.jpg",
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
    images: ["/proco_tech.jpg"],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster connection */}
        <link rel="preconnect" href="https://www.procotech.in" />
        <link rel="dns-prefetch" href="https://www.procotech.in" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Defer non-critical scripts to reduce render blocking */}
        <Script
          strategy="lazyOnload"
          src="https://www.procotech.in/__/firebase/8.7.0/firebase-app.js"
        />
        <Script
          strategy="lazyOnload"
          src="https://www.procotech.in/__/firebase/8.7.0/firebase-auth.js"
        />
        <Script
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof firebase !== 'undefined') {
                firebase.initializeApp(firebaseConfig);
              }
            `,
          }}
        />
        {/* Google Analytics - deferred for performance */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-7LMD5WF7XW"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7LMD5WF7XW');
            `,
          }}
        />
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1362109172400001');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1362109172400001&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {/* Google AdSense Script - Already using lazyOnload */}
        <Script
          id="google-adsense-script"
          async
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8434537394521880"
          crossOrigin="anonymous"
        />
        {/* JSON-LD Structured Data — Lucknow Branch */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={lucknowBranchJsonLd()}
        />
        {/* JSON-LD Structured Data — Jaipur Branch */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jaipurBranchJsonLd()}
        />
      </head>
      <body className={inter.className}>
        <CanonicalTag />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
