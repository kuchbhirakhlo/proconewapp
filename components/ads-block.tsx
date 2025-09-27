"use client"

import { useEffect, useRef } from 'react'

interface AdsBlockProps {
  slot: string
  className?: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
}

export default function AdsBlock({
  slot,
  className = "",
  format = 'auto',
  responsive = true
}: AdsBlockProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load AdSense script if not already loaded
    if (!document.querySelector('script[src*="adsbygoogle"]')) {
      const script = document.createElement('script')
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8434537394521880'
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }

    // Initialize ad after script loads
    const initializeAd = () => {
      if (adRef.current && (window as any).adsbygoogle) {
        try {
          ;(window as any).adsbygoogle.push({})
        } catch (e) {
          console.error('AdSense error:', e)
        }
      }
    }

    // Check if adsbygoogle is already available
    if ((window as any).adsbygoogle) {
      initializeAd()
    } else {
      // Wait for script to load
      const checkAdSense = setInterval(() => {
        if ((window as any).adsbygoogle) {
          clearInterval(checkAdSense)
          initializeAd()
        }
      }, 100)

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkAdSense)
      }, 10000)
    }
  }, [slot])

  const getAdFormat = () => {
    switch (format) {
      case 'rectangle':
        return '336x280'
      case 'vertical':
        return '120x600'
      case 'horizontal':
        return '728x90'
      default:
        return 'auto'
    }
  }

  return (
    <div className={`ads-block ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          ...(format !== 'auto' && { width: getAdFormat().split('x')[0] + 'px', height: getAdFormat().split('x')[1] + 'px' })
        }}
        data-ad-client="ca-pub-8434537394521880"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}

