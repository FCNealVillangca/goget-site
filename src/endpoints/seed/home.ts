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
    // Hero logic removed from here
    layout: [
      {
        blockType: 'home-hero',
        heading: 'French for complete beginners',
        subheading: 'Start speaking French with calm, clear lessons that make sense from day one.',
        description: 'No pressure. No confusion. Just structured support to help you build confidence step by step.',
        ctaText: 'Book your free assessment',
        ctaUrl: 'https://goget-french.breely.com/form/12099',
      },
      {
        blockType: 'home-struggle',
        heading: 'Why you are struggling with French',
        subheading: 'Understanding the common challenges and how our method addresses them.',
        services: [
          {
            title: 'Complex Grammar Rules',
            description: 'French grammar can be overwhelming with irregular verbs and complex sentence structures. Our method breaks it down into manageable, logical steps.',
            icon: 'barchart3',
            image: heroImage?.id as number,
          },
          {
            title: 'Pronunciation Difficulties',
            description: 'The French "r" sound and nasal vowels are challenging for English speakers. We provide targeted practice with native speaker audio.',
            icon: 'globe',
            image: heroImage?.id as number,
          },
          {
            title: 'Vocabulary Overload',
            description: 'Learning thousands of words seems impossible. We focus on high-frequency words and practical phrases you\'ll use immediately.',
            icon: 'package',
            image: heroImage?.id as number,
          },
          {
            title: 'Lack of Practice Opportunities',
            description: 'Finding conversation partners is hard. Our structured lessons include speaking practice and feedback from experienced tutors.',
            icon: 'truck',
            image: heroImage?.id as number,
          },
        ],
      },
      {
        blockType: 'home-steps',
        heading: 'Our Simple Process',
        subheading: 'Start your French learning journey with our structured, beginner-friendly approach that builds confidence step by step.',
        steps: [
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
      {
        blockType: 'home-testimonial',
        heading: 'What our clients say',
        description: 'Our state-of-the-art facilities and innovative technology support e-commerce fulfillment and project cargo handling.',
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
