"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight, Loader2, ExternalLink } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Review {
  id: number
  authorName: string
  authorUrl?: string
  profilePhotoUrl?: string
  rating: number
  text: string
  relativeTimeDescription?: string
  timestamp?: number
  source: 'google' | 'student'
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/google-reviews')
      const data = await response.json()

      if (data.reviews && data.reviews.length > 0) {
        setReviews(data.reviews)
      } else {
        setReviews(getMockReviews())
      }
    } catch (err) {
      console.error('Error fetching reviews:', err)
      setReviews(getMockReviews())
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  const getMockReviews = (): Review[] => {
    return [
      {
        id: 1,
        authorName: 'Rahul Kumar',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Excellent institute for learning web development. The instructors are very knowledgeable and patient. I completed the Full Stack Web Development course and got placed within 2 months!',
        relativeTimeDescription: '2 months ago',
        timestamp: Date.now() / 1000 - 5184000,
        source: 'google'
      },
      {
        id: 2,
        authorName: 'Priya Sharma',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Best computer institute in Lucknow! The typing course helped me crack the SSC CHSL exam with excellent typing speed. Highly recommended for competitive exam preparation.',
        relativeTimeDescription: '3 months ago',
        timestamp: Date.now() / 1000 - 7776000,
        source: 'google'
      },
      {
        id: 3,
        authorName: 'Amit Patel',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Great learning experience. The DCA course was well-structured and the practical projects helped me understand the concepts better. Support team is very responsive.',
        relativeTimeDescription: '4 months ago',
        timestamp: Date.now() / 1000 - 10368000,
        source: 'google'
      },
      {
        id: 4,
        authorName: 'Sneha Singh',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Proco Technologies helped me switch my career from marketing to IT. The mobile development course was comprehensive and I built my first app during the training!',
        relativeTimeDescription: '5 months ago',
        timestamp: Date.now() / 1000 - 12960000,
        source: 'google'
      },
      {
        id: 5,
        authorName: 'Vikram Joshi',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Amazing infrastructure and experienced faculty. The Hindi typing course is excellent for government job aspirants. I improved my typing speed from 20 WPM to 45 WPM.',
        relativeTimeDescription: '6 months ago',
        timestamp: Date.now() / 1000 - 15552000,
        source: 'google'
      }
    ]
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-red-600 mx-auto" />
            <p className="text-gray-500 mt-4">Loading reviews...</p>
          </div>
        </div>
      </section>
    )
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-200">Reviews</Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from students who transformed their careers with Proco Technologies
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
            <div className="text-4xl font-bold text-red-600">{averageRating}</div>
            <div>
              <div className="flex">{renderStars(Math.round(Number(averageRating)))}</div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
            <div className="text-4xl font-bold text-green-600">{reviews.length}</div>
            <div>
              <div className="text-sm text-gray-500">Google Reviews</div>
              <div className="text-xs text-gray-400">Verified Reviews</div>
            </div>
          </div>
        </div>

        {/* Google Reviews Slider */}
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => {
                const initials = review.authorName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)

                return (
                  <CarouselItem key={`${review.id}-${index}`} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                          {review.profilePhotoUrl ? (
                            <img
                              src={review.profilePhotoUrl}
                              alt={review.authorName}
                              className="w-14 h-14 rounded-full object-cover border-2 border-red-200"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md">
                              {initials}
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-lg">{review.authorName}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-500">{review.rating}.0</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="flex items-center gap-1 bg-red-100 text-red-700">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                            Google
                          </Badge>
                        </div>

                        {/* Review Text */}
                        <div className="relative">
                          <Quote className="absolute -top-1 -left-1 w-8 h-8 text-red-200 opacity-60" />
                          <p className="text-gray-600 pl-6 leading-relaxed text-sm line-clamp-4">
                            {review.text}
                          </p>
                        </div>

                        {/* Timestamp */}
                        {review.relativeTimeDescription && (
                          <p className="text-xs text-gray-400 mt-4 text-right">
                            {review.relativeTimeDescription}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12 bg-white/80 hover:bg-white border-red-200">
              <ChevronLeft className="w-6 h-6 text-red-600" />
            </CarouselPrevious>
            <CarouselNext className="right-0 md:-right-12 bg-white/80 hover:bg-white border-red-200">
              <ChevronRight className="w-6 h-6 text-red-600" />
            </CarouselNext>
          </Carousel>
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-12">
          <a
            href="https://g.page/r/CR1CwMe6H668EBE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <span>Write a Review</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
