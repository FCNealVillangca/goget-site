import type { Block } from 'payload'

export const FaqContact: Block = {
  slug: 'faq-contact',
  interfaceName: 'FaqContactBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Get in touch.',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: "Have questions? Send us a message and we'll get back to you shortly.",
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
  labels: {
    plural: 'FAQ Contacts',
    singular: 'FAQ Contact',
  },
}
