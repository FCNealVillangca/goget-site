import type { Block } from 'payload'

export const AboutStruggle: Block = {
  slug: 'about-struggle',
  interfaceName: 'AboutStruggleBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Tailored French coaching for every goal',
    },
    {
      name: 'introParagraph',
      type: 'textarea',
      required: true,
      defaultValue: 'We provide structured, high-impact lessons designed to get you speaking from day one.',
    },
    {
      name: 'mainParagraph',
      type: 'textarea',
      required: true,
      defaultValue: 'Whether you are preparing for GCSE/A-Level exams or looking to master business French, our services are built around your specific pace and learning style.',
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'About Struggles',
    singular: 'About Struggle',
  },
}
