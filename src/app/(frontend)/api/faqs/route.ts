import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  const payload = await getPayload({ config: configPromise })

  const faqs = await payload.find({
    collection: 'faqs',
    limit: 100,
    ...(query
      ? {
          where: {
            or: [
              { question: { like: query } },
              { answer: { like: query } },
            ],
          },
        }
      : {}),
  })

  const formattedFaqs = faqs.docs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }))

  return NextResponse.json({ faqs: formattedFaqs })
}