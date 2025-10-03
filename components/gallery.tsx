"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const galleryImages = [
    {
      src: "https://res.cloudinary.com/dwfctknuj/image/upload/v1759487605/adxvn7xfexbixgabvmlu.jpg",
      alt: "",
      title: "",
    },
    {
      src: "https://res.cloudinary.com/dwfctknuj/image/upload/v1759487605/rk4xwynkdwwnejvjdru5.jpg",
      alt: "",
      title: "",
    },
    {
      src: "https://res.cloudinary.com/dwfctknuj/image/upload/v1758625647/crutuhrxrrtlvl3tnrnu.jpg",
      alt: "",
      title: "",
    },
    {
      src: "https://res.cloudinary.com/dwfctknuj/image/upload/v1758625647/eltsahfjzjvln6hwvhzn.jpg",
      alt: "",
      title: "",
    },
    {
      src: "https://res.cloudinary.com/dwfctknuj/image/upload/v1758625646/g4edzbyhtr1m6d8tusji.jpg",
      alt: "",
      title: "",
    },
    {
      src: "https://res.cloudinary.com/dwfctknuj/image/upload/v1758625646/rupsgw1czthbk67buxkw.jpg",
      alt: "",
      title: "",
    },
    {
      src: "https://res.cloudinary.com/dwfctknuj/image/upload/v1758625646/i7udig67eoujmtfmfkvb.jpg",
      alt: "",
      title: "",
    },
    {
      src: "https://res.cloudinary.com/dwfctknuj/image/upload/v1759487621/rzlmvi8qui7mgtlpci4t.jpg",
      alt: "",
      title: "",
    },
    {
      src: "https://res.cloudinary.com/dwfctknuj/image/upload/v1758626171/epltb4gqswsa3amn0urv.jpg",
      alt: "",
      title: "",
    },
    {
      src: "https://res.cloudinary.com/dwfctknuj/image/upload/v1758626170/isfypmgilmw21sdlitea.jpg",
      alt: "",
      title: "",
    },
  ]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scrollStep = 1
    const scrollInterval = 30

    const autoScroll = () => {
      scrollAmount += scrollStep
      scrollContainer.scrollLeft = scrollAmount

      // Reset scroll when reaching the end
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0
      }
    }

    const interval = setInterval(autoScroll, scrollInterval)

    // Pause on hover
    const handleMouseEnter = () => clearInterval(interval)
    const handleMouseLeave = () => {
      clearInterval(interval)
      const newInterval = setInterval(autoScroll, scrollInterval)
      return newInterval
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", () => {
      const newInterval = setInterval(autoScroll, scrollInterval)
    })

    return () => {
      clearInterval(interval)
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-green-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Learning Environment</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a glimpse into our modern facilities, collaborative learning spaces, and success stories
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-hidden scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Duplicate images for seamless loop */}
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative w-80 h-60 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {galleryImages.slice(0, 5).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating elements for visual appeal */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float" />
      <div
        className="absolute bottom-10 right-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-float"
        style={{ animationDelay: "4s" }}
      />
    </section>
  )
}
