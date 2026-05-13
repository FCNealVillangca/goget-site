import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { v2 as cloudinary } from 'cloudinary'
import type { HandleUpload, HandleDelete } from '@payloadcms/plugin-cloud-storage/types'
import type { UploadApiResponse } from 'cloudinary'

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
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const cloudinaryAdapter = () => ({
  name: 'cloudinary-adapter',
  async handleUpload({
    file,
    collection,
    data,
    req,
    clientUploadContext,
  }: Parameters<HandleUpload>[0]) {
    try {
      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            public_id: `media/${file.filename.replace(/\.[^/.]+$/, '')}`,
            overwrite: false,
            use_filename: true,
            timeout: 120000, // 2 minute timeout for large files
          },
          (error, result) => {
            if (error) return reject(error)
            if (!result) return reject(new Error('No result returned from Cloudinary'))
            resolve(result)
          },
        )
        uploadStream.end(file.buffer)
      })
      file.filename = uploadResult.public_id
      file.mimeType = `${uploadResult.format}`
      file.filesize = uploadResult.bytes
    } catch (err) {
      console.error('Upload Error', err)
      throw new Error(`Cloudinary upload failed: ${err instanceof Error ? err.message : String(err)}`)
    }
  },

  async handleDelete({ collection, doc, filename, req }: Parameters<HandleDelete>[0]) {
    console.log('handleDelete has been called')

    try {
      await cloudinary.uploader.destroy(`media/${filename.replace(/\.[^/.]+$/, '')}`)
    } catch (error) {
      console.error('Cloudinary Delete Error:', error)
    }
  },
  staticHandler() {
    return new Response('Not implemented', { status: 501 })
  },
})

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
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
  upload: {
    limits: {
      fileSize: 100 * 1024 * 1024, // 100MB limit
    },
  },
  editor: defaultLexical,
  db: sqliteAdapter({
    push: true,
    client: {
      url: process.env.DATABASE_URL || 'file:./db.sqlite',
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users, Reviews, Faqs, Newsletter],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],

  plugins: [
    ...existingPlugins,
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,
          disableLocalStorage: true,
          generateFileURL: ({ filename }) => {
            return cloudinary.url(`media/${filename}`, { secure: true })
          },
        },
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET,
  sharp,
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
