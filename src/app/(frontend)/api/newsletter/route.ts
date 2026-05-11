import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    // Check if email already exists
    const existing = await payload.find({
      collection: 'newsletter',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existing.docs.length > 0) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 200 })
    }

    // Create new subscription
    const result = await payload.create({
      collection: 'newsletter',
      data: {
        email,
      },
    })

    return NextResponse.json({ message: 'Successfully subscribed!', id: result.id }, { status: 201 })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}