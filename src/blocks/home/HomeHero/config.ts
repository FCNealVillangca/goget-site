import type { Block } from 'payload'

export const HomeHero: Block = {
  slug: 'home-hero',
  interfaceName: 'HomeHeroBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'French for complete beginners',
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: true,
      defaultValue: 'Start speaking French with calm, clear lessons that make sense from day one.',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'No pressure. No confusion. Just structured support to help you build confidence step by step.',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      defaultValue: 'Book your free assessment',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://goget-french.breely.com/form/12099',
    },
  ],
  labels: {
    plural: 'Home Heroes',
    singular: 'Home Hero',
  },
}