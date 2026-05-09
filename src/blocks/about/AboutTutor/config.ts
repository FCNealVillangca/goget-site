import type { Block } from 'payload'

export const AboutTutor: Block = {
  slug: 'about-tutor',
  interfaceName: 'AboutTutorBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: "Bonjour, I'm Kwaku",
    },
    {
      name: 'paragraphs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        {
          text: "I'm a certified French tutor trained at CAVILAM - Alliance Française, based in Chelmsford, originally from Toulouse in the south of France.",
        },
        {
          text: 'Most students struggle because they lack confidence when it is time to speak.',
        },
      ],
    },
    {
      name: 'highlightText',
      type: 'text',
      required: true,
      defaultValue: 'That is what GoGet is built to fix.',
    },
    {
      name: 'points',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { text: 'Each lesson follows a clear structure.' },
        { text: 'Focused speaking practice.' },
        { text: 'Step by step progress.' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
  labels: {
    plural: 'About Tutors',
    singular: 'About Tutor',
  },
}
