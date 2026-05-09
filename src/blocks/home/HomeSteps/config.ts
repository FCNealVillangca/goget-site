import type { Block } from 'payload'

export const HomeSteps: Block = {
  slug: 'home-steps',
  interfaceName: 'HomeStepsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Simple Process',
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: true,
      defaultValue: 'Start your French learning journey with our structured, beginner-friendly approach that builds confidence step by step.',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      fields: [
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
      ],
      defaultValue: [
        {
          title: 'Assess Your Level',
          description: 'Take our quick assessment to determine your current French proficiency and learning goals.',
        },
        {
          title: 'Personalized Plan',
          description: 'Receive a customized learning plan tailored to your schedule and objectives.',
        },
        {
          title: 'Structured Lessons',
          description: 'Follow clear, step-by-step lessons designed for complete beginners.',
        },
        {
          title: 'Practice & Support',
          description: 'Practice with interactive exercises and get support from our friendly team.',
        },
      ],
    },
  ],
  labels: {
    plural: 'Home Steps',
    singular: 'Home Step',
  },
}