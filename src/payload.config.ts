import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig, PayloadRequest } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Reviews } from './collections/Reviews'
import { Faqs } from './collections/Faqs'
import { Newsletter } from './collections/Newsletter'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins as existingPlugins } from './plugins' // Rename existing plugins to merge them
import { defaultLexical } from './fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['./components/BeforeLogin'],
      beforeDashboard: ['./components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  editor: defaultLexical,
  db: sqliteAdapter({
    push: true,
    client: {
      url: process.env.DATABASE_URL || 'file:./db.sqlite',
    },
  }),
  onInit: async (payload) => {
    console.log('🔄 Database URL:', process.env.DATABASE_URL)
    try {
      if (payload.db?.connect) {
        await payload.db.connect()
        console.log('✅ Database connected and schema ready')
      }
    } catch (error) {
      console.error('❌ Database connection failed:', error)
    }
  },
  collections: [Pages, Posts, Media, Categories, Users, Reviews, Faqs, Newsletter],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],

  plugins: [
    ...existingPlugins,
  ],

  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
