import type { Block } from 'payload'

export const AboutDirectives: Block = {
  slug: 'about-directives',
  interfaceName: 'AboutDirectivesBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Clear path to fluency',
    },
    {
      name: 'missionTitle',
      type: 'text',
      required: true,
      defaultValue: 'Our Mission',
    },
    {
      name: 'missionText',
      type: 'textarea',
      required: true,
      defaultValue: 'To provide simple, honest, and high-impact coaching that turns beginners into confident French speakers through active practice.',
    },
    {
      name: 'visionTitle',
      type: 'text',
      required: true,
      defaultValue: 'Our Vision',
    },
    {
      name: 'visionText',
      type: 'textarea',
      required: true,
      defaultValue: 'To be the most trusted space for language growth, where every student feels supported to speak without fear of making mistakes.',
    },
    {
      name: 'goalTitle',
      type: 'text',
      required: true,
      defaultValue: 'Our Goal',
    },
    {
      name: 'goalText',
      type: 'textarea',
      required: true,
      defaultValue: 'Our main objective is to ensure you can hold a real conversation in French within your first few months of training with us.',
    },
  ],
  labels: {
    plural: 'About Directives',
    singular: 'About Directive',
  },
}
