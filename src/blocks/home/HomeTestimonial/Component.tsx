"use client"

import React, { useState, useEffect } from 'react'
import ReviewCard from '@/components/ReviewCard'

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

const Testimonials = () => {
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

  const mappedReviews = reviews.map(review => ({
    ...review,
    content: review.message,
    image: review.avatar?.url,
    thumbnail: review.thumbnail?.url,
  }))

  const mainTestimony = mappedReviews.find((r) => r.isMain) || mappedReviews[0]
  const otherTestimonies = mappedReviews.filter((r) => r !== mainTestimony).slice(0, 4)

  if (loading || !mainTestimony) {
    return <div className="py-24 text-center">Loading...</div>
  }

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#001750] mb-6">
            What our clients say
          </h1>
          <div className="relative py-1 max-w-2xl mx-auto text-slate-500">
            <p className="text-sm md:text-base">
              Our state-of-the-art facilities and innovative technology support e-commerce
              fulfillment and project cargo handling.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* MAIN PANEL */}
          <div className="lg:col-span-5">
            <ReviewCard
              review={mainTestimony}
              variant="featured"
              hasVideoToggle={true}
            />
          </div>

          {/* SIDE PANELS - Right (2x2 Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherTestimonies.map((review, index) => (
              <ReviewCard
                key={index}
                review={review}
                variant="default"
                hasVideoToggle={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
