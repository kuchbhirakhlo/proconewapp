import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for student reviews (replace with Firestore in production)
const studentReviews: any[] = [
  {
    id: 1,
    authorName: 'Mohit Verma',
    course: 'Full Stack Web Development',
    rating: 5,
    text: 'The best decision I made was joining Proco! The hands-on projects and placement support helped me land a job as a Junior Developer.',
    createdAt: Date.now() - 86400000 * 10,
    approved: true
  },
  {
    id: 2,
    authorName: 'Anjali Gupta',
    course: 'DCA Course',
    rating: 5,
    text: 'Excellent learning environment. The instructors explain concepts in a very simple way. The DCA course covered everything I needed for my job.',
    createdAt: Date.now() - 86400000 * 20,
    approved: true
  },
  {
    id: 3,
    authorName: 'Deepak Kumar',
    course: 'Typing Course',
    rating: 5,
    text: 'I needed to improve my typing speed for competitive exams. Within 2 months, I went from 25 WPM to 55 WPM. Highly recommended!',
    createdAt: Date.now() - 86400000 * 30,
    approved: true
  }
]

export async function GET() {
  // Return only approved student reviews
  const approvedReviews = studentReviews.filter(r => r.approved)
  return NextResponse.json({ reviews: approvedReviews })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { authorName, course, rating, text } = body

    // Validate required fields
    if (!authorName || !course || !rating || !text) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Create new review
    const newReview = {
      id: Date.now(),
      authorName,
      course,
      rating,
      text,
      createdAt: Date.now(),
      approved: false // Reviews need approval before being displayed
    }

    // In production, save to Firestore
    studentReviews.unshift(newReview)

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully! It will be displayed after approval.',
      review: newReview
    })
  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    )
  }
}
