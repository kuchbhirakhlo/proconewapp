"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const galleryImages = [
    {
      src: "https://scontent.fvns1-1.fna.fbcdn.net/v/t39.30808-6/515184052_122112195590920787_4690477494707656984_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=IrTteCSybeoQ7kNvwE83Rii&_nc_oc=AdkaUyL5QHQqw9DZ5ETkQ1Hq-ltALcYAHCpDqJeKaKyIyo7f0DrFsuaBo_y6ufh9P_IkzDnzfALkKyZa6GHdVYkT&_nc_zt=23&_nc_ht=scontent.fvns1-1.fna&_nc_gid=BR1Mk_EaX3oPWfLMS0Xfaw&oh=00_AfR8bmEi8ZIYPGQBf1MYUSYlAIfiBWRIHG-4X2dcSAhdmw&oe=6886609F",
      alt: "Students collaborating on coding project",
      title: "Collaborative Learning",
    },
    {
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
      alt: "Modern computer lab with students",
      title: "State-of-the-art Lab",
    },
    {
      src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop",
      alt: "Web development on multiple screens",
      title: "Web Development",
    },
    {
      src: "https://scontent.fvns1-1.fna.fbcdn.net/v/t39.30808-6/513998769_122108336312920787_3794298719727765403_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cdLvICi8Rg8Q7kNvwFh_BFr&_nc_oc=AdksdIT5KkKELemOliFAbh_WPV7dSsy81rYZFabvAKUqrz0I-zLoX6kHJng1jB-bx0ZPwZpOU9D2dnDk0XvzqfJm&_nc_zt=23&_nc_ht=scontent.fvns1-1.fna&_nc_gid=rHY23U4omiz43y66uR89cg&oh=00_AfQlGdS6T_bk_UQeLqo_bYREaHmFHLzNgVCJDv1FtkD_hQ&oe=68868632",
      alt: "Mobile app development",
      title: "Mobile Development",
    },
    {
      src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
      alt: "Female developer coding",
      title: "Inclusive Learning",
    },
    {
      src: "https://scontent.fvns1-4.fna.fbcdn.net/v/t39.30808-6/514264104_122108336762920787_8414568111104825069_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=DbnY3hfCCAwQ7kNvwEfJsSY&_nc_oc=AdkjnLe3tvL-UZ4wOUxdDGkljsTFMpehQO-Ut2pcuJ4We7mOY5wq4SGH9i2oOLeQM2X0gQZXVr0SSX5GFf5JnC77&_nc_zt=23&_nc_ht=scontent.fvns1-4.fna&_nc_gid=c6skAiCGLXqe2ScMcer5Xw&oh=00_AfQHTCTjQKwh4JEnFrwuaQ8K0gZWKVfDLp5Hzn_Gyl5RzQ&oe=6886863E",
      alt: "Team working on software project",
      title: "Team Projects",
    },
    {
      src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
      alt: "Code on computer screen",
      title: "Programming Excellence",
    },
    {
      src: "https://scontent.fvns1-2.fna.fbcdn.net/v/t39.30808-6/514280805_122108336570920787_5079695977105795382_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3hc5E7ltLaYQ7kNvwH9AXxG&_nc_oc=Adm8hLCJMigWgFTgaNWY0CoP7lD6Q8FEELxBfOm3001pCrW33wgyiiYdwZdTqF-M2T7XbFHQrIMaMQW9YiR1YNk0&_nc_zt=23&_nc_ht=scontent.fvns1-2.fna&_nc_gid=aHjZn8wjyiSF5xnSZz4ATw&oh=00_AfSAKXCyPouW8ukdOU0wRDVw5QuijW8Fk1gdmjwZZQI25w&oe=688671B1",
      alt: "Students in computer class",
      title: "Interactive Classes",
    },
    {
      src: "https://scontent.fvns1-1.fna.fbcdn.net/v/t39.30808-6/517587547_122117083694920787_5569083595092786672_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=goSbq8itu6UQ7kNvwEcc3tO&_nc_oc=AdmADzZyMCz0VBis-EQM2zhVcE2tl4WPoGci6IL7k1BiQRUAsy3TzjZAn1jOQ7d9VsvOqIcuGMMk1lrfeWp6nlr6&_nc_zt=23&_nc_ht=scontent.fvns1-1.fna&_nc_gid=_4BLc0D1Vl5rQvsdNKaSaw&oh=00_AfR7h9GspvVJMO0fUeuAhsRqdmAhtTGysPbiAaX0pOLPoQ&oe=68866BF2",
      alt: "AI and machine learning",
      title: "AI & ML Training",
    },
    {
      src: "https://scontent.fvns1-5.fna.fbcdn.net/v/t39.30808-6/511827258_10036336399796488_4032779485359904989_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=QNZELhL7msUQ7kNvwH5qO8E&_nc_oc=AdnGsnG4xopT8Al-in9VlPLMGhoraXW0aT-BYB2u23WlupGk8GE62smQ8sg5rXtcMULXujPaR-zNsQPKoKO_uNzW&_nc_zt=23&_nc_ht=scontent.fvns1-5.fna&_nc_gid=VNmTAbr62doa0wWuTCdnRQ&oh=00_AfSgSXSAsmH2OXEJZdLraz4J0XkEqP9ZH2coIjeC0My_aA&oe=68868A23",
      alt: "Graduation ceremony",
      title: "Success Stories",
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
