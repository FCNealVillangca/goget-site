import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type FaqArgs = {
  heroImage?: Media | null
  metaImage?: Media | null
  formId: number
}

export const faq: (args: FaqArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  metaImage,
  formId,
}) => {
  return {
    slug: 'faq',
    layout: [
      {
        blockType: 'faq-list',
        heading: 'Frequently Asked Questions',
        description: 'Everything you need to know about GOGET and our methodology.',
      },
      {
        blockType: 'faq-contact',
        heading: 'Get in touch.',
        description: "Have questions? Send us a message and we'll get back to you shortly.",
        form: formId,
      },
    ],
    meta: {
      description: 'Frequently asked questions',
      image: metaImage?.id as number,
      title: 'FAQ',
    },
    title: 'FAQ',
  }
}
