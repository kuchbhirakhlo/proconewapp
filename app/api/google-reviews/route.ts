import { NextRequest, NextResponse } from 'next/server'

// Google Places API endpoint for place details (reviews)
const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json'

// Place ID for Proco Technologies - extracted from Google Business Profile
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || 'CR1CwMe6H668EBE'

export async function GET(request: NextRequest) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Maps API key not configured' },
      { status: 500 }
    )
  }

  if (!GOOGLE_PLACE_ID) {
    // Return mock reviews if no place ID configured
    return NextResponse.json({
      reviews: getMockReviews(),
      source: 'mock'
    })
  }

  try {
    const response = await fetch(
      `${GOOGLE_PLACES_API_URL}?place_id=${GOOGLE_PLACE_ID}&fields=reviews&key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch reviews from Google')
    }

    const data = await response.json()

    if (data.result && data.result.reviews) {
      // Transform Google reviews to our format
      const reviews = data.result.reviews.map((review: any) => ({
        id: review.time,
        authorName: review.author_name,
        authorUrl: review.author_url,
        profilePhotoUrl: review.profile_photo_url,
        rating: review.rating,
        text: review.text,
        relativeTimeDescription: review.relative_time_description,
        timestamp: review.time,
        source: 'google'
      }))

      return NextResponse.json({ reviews, source: 'google' })
    }

    return NextResponse.json({ reviews: [], source: 'google' })
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    // Fallback to mock reviews on error
    return NextResponse.json({
      reviews: getMockReviews(),
      source: 'mock'
    })
  }
}

// Mock reviews for development/demo
function getMockReviews() {
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
      rating: 4,
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
