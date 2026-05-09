import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'
import { home } from './home'
import { about } from './about'
import { results } from './results'
import { support } from './support'
import { faq } from './faq'

const collections: CollectionSlug[] = ['pages', 'reviews', 'faqs', 'media']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Starting seed (Keeping Users)...')

  // 1. DELETE PAGES AND MEDIA ONLY
  payload.logger.info('— Wiping pages and media...')
  for (const collection of collections) {
    payload.logger.info(`Deleting all from ${collection}`)
    try {
      const docs = await payload.find({ collection, limit: 100 })
      for (const doc of docs.docs) {
        await payload.delete({ collection, id: doc.id, req })
      }
      payload.logger.info(`Deleted all from ${collection}`)
    } catch (e) {
      payload.logger.error(`Error deleting ${collection}: ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  // 2. CHECK IF ADMIN EXISTS (Create only if missing)
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@test.com' } },
  })

  if (existingUsers.totalDocs === 0) {
    payload.logger.info('— No admin found, creating one...')
    await payload.create({
      collection: 'users',
      data: {
        name: 'Admin',
        email: 'admin@test.com',
        password: 'password',
      },
    })
  } else {
    payload.logger.info('— Admin already exists, skipping user creation.')
  }

  // 3. MEDIA & HOME PAGE
  try {
    payload.logger.info('— Fetching hero image...')
    const heroBuffer = await fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-hero1.webp',
    )

    const heroDoc = await payload.create({
      collection: 'media',
      data: { alt: 'French Lessons Hero Image' },
      file: heroBuffer,
    })

    let homeDocRecord
    try {
      const homeData = home({
        heroImage: heroDoc,
        metaImage: heroDoc,
      })
      payload.logger.info(`Creating home page with slug: ${homeData.slug}`)
      homeDocRecord = await payload.create({
        collection: 'pages',
        data: homeData,
      })
      payload.logger.info('Home page created successfully')
    } catch (error) {
      payload.logger.error(`Home page creation failed: ${error instanceof Error ? error.message : String(error)}`)
      payload.logger.info('Skipping due to error')
    }

    let aboutDocRecord
    try {
      const aboutData = about({
        heroImage: heroDoc,
        metaImage: heroDoc,
      })
      payload.logger.info(`Creating about page with slug: ${aboutData.slug}`)
      aboutDocRecord = await payload.create({
        collection: 'pages',
        data: aboutData,
      })
      payload.logger.info('About page created successfully')
    } catch (error) {
      payload.logger.error(`About page creation failed: ${error instanceof Error ? error.message : String(error)}`)
      payload.logger.info('Skipping due to error')
    }

    let resultsDocRecord
    try {
      const resultsData = results({
        heroImage: heroDoc,
        metaImage: heroDoc,
      })
      payload.logger.info(`Creating results page with slug: ${resultsData.slug}`)
      resultsDocRecord = await payload.create({
        collection: 'pages',
        data: resultsData,
      })
      payload.logger.info('Results page created successfully')
    } catch (error) {
      payload.logger.error(`Results page creation failed: ${error instanceof Error ? error.message : String(error)}`)
      payload.logger.info('Skipping due to error')
    }

    let supportDocRecord
    try {
      const supportData = support({
        heroImage: heroDoc,
        metaImage: heroDoc,
      })
      payload.logger.info(`Creating support page with slug: ${supportData.slug}`)
      supportDocRecord = await payload.create({
        collection: 'pages',
        data: supportData,
      })
      payload.logger.info('Support page created successfully')
    } catch (error) {
      payload.logger.error(`Support page creation failed: ${error instanceof Error ? error.message : String(error)}`)
      payload.logger.info('Skipping due to error')
    }

    payload.logger.info('— Finding contact form...')
    let contactFormId: number = 1
    const forms = await payload.find({
      collection: 'forms',
      where: { title: { equals: 'Contact Form' } },
      limit: 1,
    })
    
    if (forms.docs.length > 0) {
      contactFormId = forms.docs[0].id as number
    }

    let faqDocRecord
    try {
      const faqData = faq({
        heroImage: heroDoc,
        metaImage: heroDoc,
        formId: contactFormId,
      })
      payload.logger.info(`Creating FAQ page with slug: ${faqData.slug}`)
      faqDocRecord = await payload.create({
        collection: 'pages',
        data: faqData,
      })
      payload.logger.info('FAQ page created successfully')
    } catch (error) {
      payload.logger.error(`FAQ page creation failed: ${error instanceof Error ? error.message : String(error)}`)
      payload.logger.info('Skipping due to error')
    }

    payload.logger.info('— Creating sample FAQs...')
    const sampleFaqs = [
      {
        question: 'How do I start?',
        answer: 'You can start by booking a free assessment session.',
      },
      {
        question: 'Do I need any prior knowledge of French?',
        answer: 'Not at all! Our courses are designed for complete beginners up to advanced speakers.',
      },
      {
        question: 'Are the lessons recorded?',
        answer: 'Yes, all our 1-on-1 sessions can be recorded so you can review them later.',
      },
    ]

    for (const f of sampleFaqs) {
      await payload.create({
        collection: 'faqs',
        data: f,
      })
    }
    payload.logger.info('Sample FAQs created successfully')

    // 4. SEED REVIEWS
    payload.logger.info('— Creating sample reviews...')
    const sampleReviews = [
      {
        name: 'John Doe',
        role: 'CEO at TechCorp',
        rating: 5,
        message: 'This service completely transformed our logistics process. Highly recommended!',
        isMain: true,
      },
      {
        name: 'Jane Smith',
        role: 'Marketing Director',
        rating: 4,
        message: 'Fantastic experience from start to finish. The team was incredibly responsive.',
        isMain: false,
      },
      {
        name: 'Samuel Green',
        role: 'Freelancer',
        rating: 5,
        message: 'I have never seen such a streamlined process. Will definitely use again.',
        isMain: false,
      },
      {
        name: 'Emily White',
        role: 'Store Owner',
        rating: 5,
        message: 'The best fulfillment partner we have ever had. Truly exceptional.',
        isMain: false,
      },
      {
        name: 'Michael Brown',
        role: 'Operations Manager',
        rating: 4,
        message: 'Great technology and even better support team.',
        isMain: false,
      },
    ]

    for (const review of sampleReviews) {
      await payload.create({
        collection: 'reviews',
        data: review,
      })
    }
    payload.logger.info('Sample reviews created successfully')

    // 5. UPDATE HEADER
    payload.logger.info('— Updating header navigation...')
    const navItems = []
    
    if (homeDocRecord) navItems.push({ link: { type: 'reference' as const, reference: { relationTo: 'pages' as const, value: homeDocRecord.id as number }, label: 'Home' } })
    if (aboutDocRecord) navItems.push({ link: { type: 'reference' as const, reference: { relationTo: 'pages' as const, value: aboutDocRecord.id as number }, label: 'About' } })
    if (resultsDocRecord) navItems.push({ link: { type: 'reference' as const, reference: { relationTo: 'pages' as const, value: resultsDocRecord.id as number }, label: 'Results' } })
    if (supportDocRecord) navItems.push({ link: { type: 'reference' as const, reference: { relationTo: 'pages' as const, value: supportDocRecord.id as number }, label: 'Support' } })
    if (faqDocRecord) navItems.push({ link: { type: 'reference' as const, reference: { relationTo: 'pages' as const, value: faqDocRecord.id as number }, label: 'FAQ' } })

    try {
      await payload.updateGlobal({
        slug: 'header',
        data: {
          navItems,
        },
      })
      payload.logger.info('Header navigation updated successfully')
    } catch (e) {
      payload.logger.error(`Error updating header: ${e instanceof Error ? e.message : String(e)}`)
    }

  } catch (error) {
    payload.logger.error('Failed to fetch image, create page, or create reviews.')
  }

  payload.logger.info('Seed complete! You should still be logged in.')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  const arrayBuffer = await res.arrayBuffer()
  return {
    name: 'hero.webp',
    data: Buffer.from(arrayBuffer),
    mimetype: 'image/webp',
    size: arrayBuffer.byteLength,
  }
}
