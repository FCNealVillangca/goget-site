import type { Block } from 'payload'

export const HomePerformance: Block = {
  slug: 'home-performance',
  interfaceName: 'HomePerformanceBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Transform Your French Skills',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Star', value: 'star' },
            { label: 'Shield Check', value: 'shield-check' },
            { label: 'Book Open', value: 'book-open' },
            { label: 'Calendar Check', value: 'calendar-check' },
          ],
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        {
          icon: 'star',
          title: 'Speak Confidently',
          content: 'Build real conversation skills with structured practice.',
        },
        {
          icon: 'shield-check',
          title: 'Learn at Your Pace',
          content: 'Flexible lessons designed for busy schedules.',
        },
        {
          icon: 'book-open',
          title: 'Master Grammar',
          content: 'Clear explanations without confusing jargon.',
        },
        {
          icon: 'calendar-check',
          title: 'Track Progress',
          content: 'See your improvement with regular assessments.',
        },
      ],
    },
  ],
  labels: {
    plural: 'Home Performances',
    singular: 'Home Performance',
  },
}