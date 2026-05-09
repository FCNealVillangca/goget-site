import type { Block } from 'payload'

export const SupportCourses: Block = {
  slug: 'support-courses',
  interfaceName: 'SupportCoursesBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'How it works?',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      defaultValue: [
        {
          number: '01',
          title: 'Book your session',
          description:
            'Choose a time that fits your schedule. We offer flexible slots for busy students and professionals.',
          image: null,
        },
        {
          number: '02',
          title: 'Meet your tutor',
          description:
            'Connect with a native speaker who understands your goals and creates a plan just for you.',
          image: null,
        },
        {
          number: '03',
          title: 'Start speaking',
          description:
            'Skip the boring drills. Jump straight into real conversations and build confidence from day one.',
          image: null,
        },
      ],
    },
  ],
  labels: {
    plural: 'Support Courses',
    singular: 'Support Courses',
  },
}
