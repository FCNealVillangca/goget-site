import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type ResultsArgs = {
  heroImage?: Media | null
  metaImage?: Media | null
}

export const results: (args: ResultsArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  metaImage,
}) => {
  return {
    slug: 'results',
    layout: [
      {
        blockType: 'result-list',
        heading: 'Student Results',
        limit: 12,
      },
    ],
    meta: {
      description: 'See the amazing results of our students at GoGet French',
      image: metaImage?.id as number,
      title: 'Results',
    },
    title: 'Results',
  }
}
