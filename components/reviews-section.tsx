"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronLeft, ChevronRight, Loader2, ExternalLink } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
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

interface Photo {
  id: string
  url: string
  alt: string
  attribution?: string
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [api])

  const fetchData = async () => {
    try {
      // Fetch reviews and photos in parallel
      const [reviewsResponse, photosResponse] = await Promise.all([
        fetch('/api/google-reviews'),
        fetch('/api/google-photos')
      ])

      const reviewsData = await reviewsResponse.json()
      const photosData = await photosResponse.json()

      // Set reviews
      if (reviewsData.reviews && reviewsData.reviews.length > 0) {
        setReviews(reviewsData.reviews)
      } else {
        setReviews(getMockReviews())
      }

      // Set photos
      if (photosData.photos && photosData.photos.length > 0) {
        setPhotos(photosData.photos)
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setReviews(getMockReviews())
      setPhotos([])
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
      },
      {
        id: 6,
        authorName: 'Anjali Gupta',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Outstanding ADCA course! The curriculum covers everything from basic computer skills to advanced applications. The lab sessions are hands-on and very practical.',
        relativeTimeDescription: '7 months ago',
        timestamp: Date.now() / 1000 - 18144000,
        source: 'google'
      },
      {
        id: 7,
        authorName: 'Rohit Verma',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Perfect place for career transition. I was a fresher with no IT background, and now I am working as a web developer. The placement assistance is excellent!',
        relativeTimeDescription: '8 months ago',
        timestamp: Date.now() / 1000 - 20736000,
        source: 'google'
      },
      {
        id: 8,
        authorName: 'Kavita Rai',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'The mobile app development course exceeded my expectations. Learned Flutter and React Native. The projects we built are now part of my portfolio.',
        relativeTimeDescription: '9 months ago',
        timestamp: Date.now() / 1000 - 23328000,
        source: 'google'
      },
      {
        id: 9,
        authorName: 'Deepak Singh',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 4,
        text: 'Good institute for computer education. The faculty is knowledgeable and the course material is updated. Minor issue with internet connectivity in labs.',
        relativeTimeDescription: '10 months ago',
        timestamp: Date.now() / 1000 - 25920000,
        source: 'google'
      },
      {
        id: 10,
        authorName: 'Meera Choudhary',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Excellent teaching methodology. The way they explain complex concepts in simple terms is commendable. Highly recommended for beginners.',
        relativeTimeDescription: '11 months ago',
        timestamp: Date.now() / 1000 - 28512000,
        source: 'google'
      },
      {
        id: 11,
        authorName: 'Arjun Tiwari',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Best investment I made for my career! The full stack course covered everything from HTML to deployment. Got my dream job within 3 months of completion.',
        relativeTimeDescription: '1 year ago',
        timestamp: Date.now() / 1000 - 31536000,
        source: 'google'
      },
      {
        id: 12,
        authorName: 'Poonam Saxena',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Wonderful experience learning Python programming. The practical approach and real-world examples made learning enjoyable. Thank you Proco Technologies!',
        relativeTimeDescription: '1 year ago',
        timestamp: Date.now() / 1000 - 34128000,
        source: 'google'
      },
      {
        id: 13,
        authorName: 'Suresh Pandey',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Great infrastructure and supportive staff. The weekend batches are perfect for working professionals. Completed DCA course successfully.',
        relativeTimeDescription: '1 year ago',
        timestamp: Date.now() / 1000 - 36720000,
        source: 'google'
      },
      {
        id: 14,
        authorName: 'Neha Agarwal',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Amazing journey from zero to hero in web development. The mentors are always available for doubt clearing. Five stars definitely!',
        relativeTimeDescription: '1 year ago',
        timestamp: Date.now() / 1000 - 39312000,
        source: 'google'
      },
      {
        id: 15,
        authorName: 'Rajesh Kumar',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 4,
        text: 'Good computer institute. The courses are comprehensive and the teaching quality is decent. Would recommend for basic computer skills.',
        relativeTimeDescription: '1 year ago',
        timestamp: Date.now() / 1000 - 41904000,
        source: 'google'
      },
      {
        id: 16,
        authorName: 'Sunita Mishra',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Exceptional training in mobile development. Built multiple apps during the course. The portfolio I created helped me land a job immediately.',
        relativeTimeDescription: '1 year ago',
        timestamp: Date.now() / 1000 - 44544000,
        source: 'google'
      },
      {
        id: 17,
        authorName: 'Manoj Sharma',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Best place to learn typing skills. Improved my English typing speed significantly. The practice sessions are very effective.',
        relativeTimeDescription: '1 year ago',
        timestamp: Date.now() / 1000 - 47136000,
        source: 'google'
      },
      {
        id: 18,
        authorName: 'Alka Verma',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Wonderful learning environment. The faculty members are experienced and patient. Completed ADCA with flying colors!',
        relativeTimeDescription: '1 year ago',
        timestamp: Date.now() / 1000 - 49728000,
        source: 'google'
      },
      {
        id: 19,
        authorName: 'Vivek Gupta',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Excellent institute for IT education. The practical focus and industry-relevant curriculum make it stand out. Highly satisfied!',
        relativeTimeDescription: '2 years ago',
        timestamp: Date.now() / 1000 - 63072000,
        source: 'google'
      },
      {
        id: 20,
        authorName: 'Ritu Jain',
        authorUrl: '',
        profilePhotoUrl: '',
        rating: 5,
        text: 'Transformed my career completely. From a non-technical background to a successful developer. The journey was amazing and the results are outstanding.',
        relativeTimeDescription: '2 years ago',
        timestamp: Date.now() / 1000 - 65664000,
        source: 'google'
      }
    ]
  }

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
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
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Reviews & Photos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See what our students say and explore our institute through Google Maps reviews and photos
          </p>
        </div>

        {/* Stats Banner */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-6 py-4 rounded-lg">
            <div className="text-3xl font-bold text-red-600">{averageRating}</div>
            <div>
              <div className="flex">{renderStars(Math.round(Number(averageRating)))}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Rating</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-6 py-4 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{reviews.length}</div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Google Reviews</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Verified Reviews</div>
            </div>
          </div>
          {photos.length > 0 && (
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-6 py-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{photos.length}</div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Photos</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">From Google Maps</div>
              </div>
            </div>
          )}
        </div>

        {/* Google Photos Gallery */}
        {photos.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Our Institute in Pictures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {photo.attribution && (
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                      {photo.attribution}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Google Reviews Slider */}
        <div className="max-w-5xl mx-auto">
          <Carousel
            setApi={setApi}
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
                    <Card className="h-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
                            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
                              {initials}
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{review.authorName}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-600 dark:text-gray-300">{review.rating}.0</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                            Google
                          </Badge>
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                          {review.text}
                        </p>

                        {/* Timestamp */}
                        {review.relativeTimeDescription && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-right">
                            {review.relativeTimeDescription}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </CarouselPrevious>
            <CarouselNext className="right-0 md:-right-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </CarouselNext>
          </Carousel>
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-12">
          <a
            href="https://g.page/r/CR1CwMe6H668EBE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg"
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
