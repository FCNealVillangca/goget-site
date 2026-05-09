import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type SupportArgs = {
  heroImage?: Media | null
  metaImage?: Media | null
}

export const support: (args: SupportArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
    slug: 'support',
    layout: [
      {
        blockType: 'support-hero',
        heading: 'Speak French with total confidence',
        description: 'Structured lessons designed to turn understanding into performance. Build confidence for exams and know exactly what to say under pressure.',
      },
      {
        blockType: 'support-courses',
        heading: 'How it works?',
        steps: [
          {
            number: '01',
            title: 'Book your session',
            description: 'Choose a time that fits your schedule. We offer flexible slots for busy students and professionals.',
            image: heroImage?.id as number,
          },
          {
            number: '02',
            title: 'Meet your tutor',
            description: 'Connect with a native speaker who understands your goals and creates a plan just for you.',
            image: heroImage?.id as number,
          },
          {
            number: '03',
            title: 'Start speaking',
            description: 'Skip the boring drills. Jump straight into real conversations and build confidence from day one.',
            image: heroImage?.id as number,
          },
        ],
      },
    ],
    meta: {
      description: 'Support and courses for learning French',
      image: metaImage?.id as number,
      title: 'Support',
    },
    title: 'Support',
  }
}
