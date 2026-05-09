import ReviewCard from '@/blocks/result/ReviewCard'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Review } from '@/payload-types' // Assuming Review is a generated type, otherwise we map it

type Props = {
  heading?: string
  description?: string
  id?: string
}

export const HomeTestimonialBlock: React.FC<Props> = async ({
  heading = 'What our clients say',
  description = 'Our state-of-the-art facilities and innovative technology support e-commerce fulfillment and project cargo handling.',
  id,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: rawReviews } = await payload.find({
    collection: 'reviews',
    limit: 5, // fetch enough to get 1 main and 4 others
  })

  // We map the raw documents to the format ReviewCard expects
  // Type assertion or casting might be needed if payload-types isn't exact, but let's map safely.
  const mappedReviews = rawReviews.map((review: any) => ({
    ...review,
    content: review.message,
    image: review.avatar?.url || (typeof review.avatar === 'string' ? review.avatar : null),
    thumbnail: review.thumbnail?.url || (typeof review.thumbnail === 'string' ? review.thumbnail : null),
  }))

  const mainTestimony = mappedReviews.find((r) => r.isMain) || mappedReviews[0]
  const otherTestimonies = mappedReviews.filter((r) => r !== mainTestimony).slice(0, 4)

  if (!mainTestimony) {
    return <div className="py-24 text-center">No testimonials found.</div>
  }

  return (
    <section className="bg-white py-24" id={`block-${id}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#001750] mb-6">
            {heading}
          </h1>
          <div className="relative py-1 max-w-2xl mx-auto text-slate-500">
            <p className="text-sm md:text-base">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* MAIN PANEL */}
          <div className="lg:col-span-5">
            <ReviewCard review={mainTestimony} variant="featured" hasVideoToggle={true} />
          </div>

          {/* SIDE PANELS - Right (2x2 Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherTestimonies.map((review, index) => (
              <ReviewCard key={index} review={review} variant="default" hasVideoToggle={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeTestimonialBlock
