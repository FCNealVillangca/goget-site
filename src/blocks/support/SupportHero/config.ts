import type { Block } from 'payload'

export const SupportHero: Block = {
  slug: 'support-hero',
  interfaceName: 'SupportHeroBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Speak French with total confidence',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Structured lessons designed to turn understanding into performance. Build confidence for exams and know exactly what to say under pressure.',
    },
  ],
  labels: {
    plural: 'Support Heros',
    singular: 'Support Hero',
  },
}
