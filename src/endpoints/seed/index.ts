import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'
import { home } from './home'

// REMOVED 'users' from this list so they don't get deleted
const collections: CollectionSlug[] = ['media', 'pages']

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
    await payload.db.deleteMany({ collection, req, where: {} })
    payload.logger.info(`Deleted all from ${collection}`)
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

    payload.logger.info('— Creating home page...')
    try {
      const homeData = home({
        heroImage: heroDoc,
        metaImage: heroDoc,
      })
      payload.logger.info(`Creating home page with slug: ${homeData.slug}`)
      await payload.create({
        collection: 'pages',
        data: homeData,
      })
      payload.logger.info('Home page created successfully')
    } catch (error) {
      payload.logger.error(`Home page creation failed: ${error.message}`)
      payload.logger.info('Skipping due to error')
    }
  } catch (error) {
    payload.logger.error('Failed to fetch image or create page.')
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
