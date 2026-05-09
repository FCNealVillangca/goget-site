import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
  ],
}
