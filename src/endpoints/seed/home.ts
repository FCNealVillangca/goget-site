import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage?: Media | null
  metaImage?: Media | null
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    // Hero logic removed from here
    layout: [
      {
        blockType: 'home-hero',
        heading: 'French for complete beginners',
        subheading: 'Start speaking French with calm, clear lessons that make sense from day one.',
        description:
          'No pressure. No confusion. Just structured support to help you build confidence step by step.',
        ctaText: 'Book your free assessment',
        ctaUrl: 'https://goget-french.breely.com/form/12099',
      },
      {
        blockType: 'home-performance',
        title: 'Transform Your French Skills',
        features: [
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
    meta: {
      description: 'An open-source website built with Payload and Next.js.',
      image: heroImage?.id,
      title: 'Payload Website Template',
    },
    title: 'Home',
  }
}
