import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { FaqClient } from './FaqClient'

type Props = {
  heading?: string
  description?: string
  id?: string
}

export const FaqListBlock: React.FC<Props> = async ({
  heading = 'Frequently Asked Questions',
  description = 'Everything you need to know about GOGET and our methodology.',
  id,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: rawFaqs } = await payload.find({
    collection: 'faqs',
    limit: 100,
  })

  // Map to the format expected by the client component
  const initialFaqs = rawFaqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }))

  return (
    <div id={`block-${id}`}>
      <FaqClient
        initialFaqs={initialFaqs}
        heading={heading}
        description={description}
      />
    </div>
  )
}

export default FaqListBlock
