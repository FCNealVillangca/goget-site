import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  upload: {
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => {
      // Use Cloudinary URL for thumbnails
      if (doc?.filename && typeof doc.filename === 'string') {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        const filename = doc.filename

        // Check if it's a video file
        if (filename.includes('.mp4') || filename.includes('.mov') || filename.includes('.avi') || filename.includes('.webm')) {
          // For videos, generate a thumbnail from the first frame
          return `https://res.cloudinary.com/${cloudName}/video/upload/so_0,w_150,h_150,c_fill,q_auto,f_jpg/media/${filename.replace(/\.[^/.]+$/, '')}`
        } else {
          // For images, use regular image transformations
          return `https://res.cloudinary.com/${cloudName}/image/upload/w_150,h_150,c_fill,q_auto,f_auto/media/${filename}`
        }
      }
      return null
    },
  },
  fields: [
    {
      name: 'filename',
      type: 'text',
      admin: {
        components: {
          Field: '@/components/CustomUpload',
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
}
