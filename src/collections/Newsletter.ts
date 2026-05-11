import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'

export const Newsletter: CollectionConfig = {
  slug: 'newsletter',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: anyone,
    create: anyone,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'subscribedAt',
      type: 'date',
      defaultValue: () => new Date(),
    },
  ],
}