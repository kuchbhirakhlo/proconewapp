"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Photo {
  id: string
  url: string
  width?: number
  height?: number
  alt: string
  attribution?: string
}

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [placeInfo, setPlaceInfo] = useState<{ name: string; rating: number; totalReviews: number } | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/google-photos')
      const data = await response.json()

      if (data.photos && data.photos.length > 0) {
        setPhotos(data.photos)
        if (data.name) {
          setPlaceInfo({
            name: data.name,
            rating: data.rating || 0,
            totalReviews: data.totalReviews || 0
          })
        }
      } else {
        setPhotos(getLocalPlaceholderPhotos())
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
      setPhotos(getLocalPlaceholderPhotos())
    } finally {
      setLoading(false)
    }
  }

  const getLocalPlaceholderPhotos = (): Photo[] => {
    return [
      {
        id: 'local-1',
        url: '/placeholder.svg',
        alt: 'Proco Technologies - Modern Learning Environment'
      },
      {
        id: 'local-2',
        url: '/placeholder.svg',
        alt: 'Proco Technologies - Computer Lab'
      },
      {
        id: 'local-3',
        url: '/placeholder.svg',
        alt: 'Proco Technologies - Training Session'
      },
      {
        id: 'local-4',
        url: '/placeholder.svg',
        alt: 'Proco Technologies - Student Area'
      },
      {
        id: 'local-5',
        url: '/placeholder.svg',
        alt: 'Proco Technologies - Front Entrance'
      },
      {
        id: 'local-6',
        url: '/placeholder.svg',
        alt: 'Proco Technologies - Team'
      }
    ]
  }

  const scrollToIndex = (index: number) => {
    if (scrollRef.current && photos.length > 0) {
      const containerWidth = scrollRef.current.offsetWidth
      const itemWidth = 320 + 24 // width + gap
      const scrollPosition = index * itemWidth
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const scrollNext = () => {
    if (photos.length > 0) {
      const nextIndex = (currentIndex + 1) % photos.length
      scrollToIndex(nextIndex)
    }
  }

  const scrollPrev = () => {
    if (photos.length > 0) {
      const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
      scrollToIndex(prevIndex)
    }
  }

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || photos.length === 0) return

    let animationId: number
    let scrollPos = 0
    const scrollSpeed = 0.3

    const scroll = () => {
      if (isAutoScrolling && scrollContainer) {
        scrollPos += scrollSpeed
        const maxScroll = scrollContainer.scrollWidth / 2
        if (scrollPos >= maxScroll) {
          scrollPos = 0
        }
        scrollContainer.scrollLeft = scrollPos
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isAutoScrolling, photos.length])

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsAutoScrolling(!document.hidden)
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const visiblePhotos = photos.length > 0 ? photos : getLocalPlaceholderPhotos()

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-200">Gallery</Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Learning Environment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a glimpse into our modern facilities, collaborative learning spaces, and success stories
          </p>
          {placeInfo && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge variant="secondary" className="flex items-center gap-1 bg-red-100 text-red-700">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
                {placeInfo.name}
              </Badge>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-semibold">{placeInfo.rating}</span>
                <span className="text-gray-500">({placeInfo.totalReviews} reviews)</span>
              </div>
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Gallery Carousel with Arrows */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-red-200 -ml-4 md:-ml-6"
          >
            <ChevronLeft className="w-6 h-6 text-red-600" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-red-200 -mr-4 md:-mr-6"
          >
            <ChevronRight className="w-6 h-6 text-red-600" />
          </button>

          {/* Gallery Container */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-hidden scrollbar-hide cursor-pointer"
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Duplicate images for seamless loop */}
            {[...visiblePhotos, ...visiblePhotos].map((photo, index) => (
              <div
                key={`${photo.id}-${index}`}
                className="flex-shrink-0 relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-80 h-60 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={photo.url || "/placeholder.svg"}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="font-semibold text-lg mb-1">{photo.alt}</h3>
                    {photo.attribution && (
                      <p className="text-sm text-gray-200">{photo.attribution}</p>
                    )}
                  </div>
                  {/* Google Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#4285F4">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {visiblePhotos.slice(0, Math.min(10, visiblePhotos.length)).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-red-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* View on Google Maps link */}
        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps/place/CR1CwMe6H668EBE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>View on Google Maps</span>
          </a>
        </div>
      </div>

      {/* Floating elements for visual appeal */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-float" />
      <div
        className="absolute bottom-10 right-10 w-16 h-16 bg-red-300 rounded-full opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-12 h-12 bg-red-200 rounded-full opacity-20 animate-float"
        style={{ animationDelay: "4s" }}
      />
    </section>
  )
}
