import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type PostsArgs = {
  heroImage?: Media | null
  metaImage?: Media | null
  adminId?: number | string
}

export const posts: (args: PostsArgs) => RequiredDataFromCollectionSlug<'posts'>[] = ({
  heroImage,
  metaImage,
  adminId,
}) => {
  return [
    {
      title: 'Getting Started with French Pronunciation',
      slug: 'getting-started-with-french-pronunciation',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  text: 'Mastering French Sounds',
                  version: 1,
                },
              ],
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'French pronunciation can be challenging for English speakers, but with practice, you can master the unique sounds of the language.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  text: 'Key Pronunciation Tips',
                  version: 1,
                },
              ],
              tag: 'h3',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Focus on the French "r" sound, nasal vowels, and the difference between "u" and "ou". Regular practice with native speakers will help you improve quickly.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      heroImage: heroImage?.id,
      publishedAt: new Date('2024-01-15').toISOString(),
      // authors: adminId ? [adminId] : [], // TODO: fix type
      meta: {
        title: 'French Pronunciation Guide',
        description: 'Learn the basics of French pronunciation for beginners.',
        image: metaImage?.id,
      },
    },
    {
      title: 'Essential French Vocabulary for Travelers',
      slug: 'essential-french-vocabulary-for-travelers',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  text: 'Travel French Basics',
                  version: 1,
                },
              ],
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Knowing key phrases can make your French trip much more enjoyable. Here are the essentials every traveler should know.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  text: 'Greetings and Polite Phrases',
                  version: 1,
                },
              ],
              tag: 'h3',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Bonjour (Good day), Merci (Thank you), and S\'il vous plaît (Please) are crucial for polite interactions.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  text: 'At the Restaurant',
                  version: 1,
                },
              ],
              tag: 'h3',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Learn phrases like "L\'addition, s\'il vous plaît" (The bill, please) and "C\'est délicieux" (It\'s delicious).',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      heroImage: heroImage?.id,
      publishedAt: new Date('2024-02-01').toISOString(),
      // authors: adminId ? [adminId] : [], // TODO: fix type
      meta: {
        title: 'Travel French Vocabulary',
        description: 'Essential French phrases for your next trip to France.',
        image: metaImage?.id,
      },
    },
    {
      title: 'Understanding French Grammar: Verbs',
      slug: 'understanding-french-grammar-verbs',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  text: 'French Verb Conjugation',
                  version: 1,
                },
              ],
              tag: 'h2',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'French verbs can be intimidating, but understanding the patterns makes them much more manageable.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  text: 'Regular Verbs',
                  version: 1,
                },
              ],
              tag: 'h3',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '-er verbs: parler (to speak) - je parle, tu parles, il/elle parle',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '-ir verbs: finir (to finish) - je finis, tu finis, il/elle finit',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '-re verbs: vendre (to sell) - je vends, tu vends, il/elle vend',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      heroImage: heroImage?.id,
      publishedAt: new Date('2024-02-15').toISOString(),
      // authors: adminId ? [adminId] : [], // TODO: fix type
      meta: {
        title: 'French Verb Guide',
        description: 'Learn the basics of French verb conjugation.',
        image: metaImage?.id,
      },
    },
  ]
}