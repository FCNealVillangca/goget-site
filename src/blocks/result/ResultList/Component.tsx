import React from 'react'
import ReviewCard from '../ReviewCard'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Review } from '@/payload-types'

type Props = {
  heading?: string
  limit?: number | null
  id?: string
}

export const ResultListBlock: React.FC<Props> = async ({
  heading = 'Student Results',
  limit = 12,
  id,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: rawReviews } = await payload.find({
    collection: 'reviews',
    limit: limit || 12,
  })

  const mappedReviews = rawReviews.map((review: any) => ({
    ...review,
    content: review.message,
    image: review.avatar?.url || (typeof review.avatar === 'string' ? review.avatar : null),
    thumbnail: review.thumbnail?.url || (typeof review.thumbnail === 'string' ? review.thumbnail : null),
  }))

  if (!mappedReviews.length) {
    return <div className="py-24 text-center">No student results found.</div>
  }

  return (
    <section className="w-full py-16 md:py-24" id={`block-${id}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">
            {heading}
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

export default ResultListBlock
