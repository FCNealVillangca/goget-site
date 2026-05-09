import type { Block } from 'payload'

export const FaqList: Block = {
  slug: 'faq-list',
  interfaceName: 'FaqListBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Everything you need to know about GOGET and our methodology.',
    },
  ],
  labels: {
    plural: 'FAQ Lists',
    singular: 'FAQ List',
  },
}
