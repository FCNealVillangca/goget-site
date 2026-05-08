import { getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'

async function runSeed() {
  console.log('Starting seed process...')

  const payload = await getPayload({ config })

  // Create a mock request object for seeding
  const mockReq = {
    headers: new Headers(),
    user: null,
    payload,
  }

  try {
    await seed({ payload, req: mockReq as any })
    console.log('✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

runSeed()