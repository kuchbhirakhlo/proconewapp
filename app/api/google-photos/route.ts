import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json'

// Place ID for Proco Technologies
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || 'CR1CwMe6H668EBE'

export async function GET(request: NextRequest) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Maps API key not configured' },
      { status: 500 }
    )
  }

  try {
    // Fetch place details with photos
    const response = await fetch(
      `${GOOGLE_PLACES_API_URL}?place_id=${GOOGLE_PLACE_ID}&fields=photos,name,rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch place details from Google')
    }

    const data = await response.json()

    if (data.result && data.result.photos) {
      // Transform photos to our format
      const photos = data.result.photos.slice(0, 10).map((photo: any, index: number) => ({
        id: photo.photo_reference,
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${apiKey}`,
        width: photo.width,
        height: photo.height,
        alt: data.result.name || 'Proco Technologies',
        attribution: `Photo by Google user`
      }))

      return NextResponse.json({
        photos,
        name: data.result.name,
        rating: data.result.rating,
        totalReviews: data.result.user_ratings_total,
        source: 'google'
      })
    }

    // Return fallback images if no photos
    return NextResponse.json({
      photos: getFallbackPhotos(),
      source: 'fallback'
    })
  } catch (error) {
    console.error('Error fetching Google photos:', error)
    return NextResponse.json({
      photos: getFallbackPhotos(),
      source: 'fallback'
    })
  }
}

function getFallbackPhotos() {
  return [
    {
      id: 'fallback-1',
      url: '/placeholder.svg',
      alt: 'Proco Technologies - Modern Learning Environment',
      attribution: ''
    },
    {
      id: 'fallback-2',
      url: '/placeholder.svg',
      alt: 'Proco Technologies - Computer Lab',
      attribution: ''
    },
    {
      id: 'fallback-3',
      url: '/placeholder.svg',
      alt: 'Proco Technologies - Training Session',
      attribution: ''
    },
    {
      id: 'fallback-4',
      url: '/placeholder.svg',
      alt: 'Proco Technologies - Student Area',
      attribution: ''
    },
    {
      id: 'fallback-5',
      url: '/placeholder.svg',
      alt: 'Proco Technologies - Entrance',
      attribution: ''
    }
  ]
}
