'use client'

import React, { useState, useEffect } from 'react'
import ReviewCard from '../ReviewCard'

interface Review {
  id: string
  name: string
  role: string
  rating: number
  message: string
  avatar?: { url: string }
  video?: { url: string }
  thumbnail?: { url: string }
  isMain?: boolean
}

const ResultList = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        const data = await response.json()
        setReviews(data.docs || [])
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  const mappedReviews = reviews.map((review) => ({
    ...review,
    content: review.message,
    image: review.avatar?.url,
    thumbnail: review.thumbnail?.url,
  }))

  if (loading) {
    return <div className="py-24 text-center">Loading...</div>
  }

  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">
            Student Results
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mappedReviews.map((review, index) => (
            <ReviewCard key={review.id || index} review={review} hasVideoToggle={true} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResultList
