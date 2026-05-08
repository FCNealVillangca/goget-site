import { config } from 'dotenv'
import { getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import payloadConfig from '@payload-config'

// Load environment variables
config()

async function seedDatabase() {
  console.log('🌱 Starting database seeding...')

  try {
    const payload = await getPayload({ config: payloadConfig })

    // Create a mock request object
    const mockReq = {
      headers: new Headers(),
      user: null,
      payload,
    }

    await seed({ payload, req: mockReq as any })

    console.log('✅ Database seeded successfully!')
    console.log('🏠 Home page created with HomeHero block')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seedDatabase()