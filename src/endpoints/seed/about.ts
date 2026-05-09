import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type AboutArgs = {
  heroImage?: Media | null
  metaImage?: Media | null
}

export const about: (args: AboutArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
    slug: 'about',
    layout: [
      {
        blockType: 'about-tutor',
        heading: "Bonjour, I'm Kwaku",
        paragraphs: [
          {
            text: "I'm a certified French tutor trained at CAVILAM - Alliance Française, based in Chelmsford, originally from Toulouse in the south of France.",
          },
          { text: 'Most students struggle because they lack confidence when it is time to speak.' },
        ],
        highlightText: 'That is what GoGet is built to fix.',
        points: [
          { text: 'Each lesson follows a clear structure.' },
          { text: 'Focused speaking practice.' },
          { text: 'Step by step progress.' },
        ],
        image: heroImage?.id as number,
      },
      {
        blockType: 'about-struggle',
        heading: 'Tailored French coaching for every goal',
        introParagraph: 'We provide structured, high-impact lessons designed to get you speaking from day one.',
        mainParagraph: 'Whether you are preparing for GCSE/A-Level exams or looking to master business French, our services are built around your specific pace and learning style.',
        images: [
          { image: heroImage?.id as number },
          { image: heroImage?.id as number },
          { image: heroImage?.id as number },
          { image: heroImage?.id as number },
        ],
      },
      {
        blockType: 'about-directives',
        heading: 'Clear path to fluency',
        missionTitle: 'Our Mission',
        missionText: 'To provide simple, honest, and high-impact coaching that turns beginners into confident French speakers through active practice.',
        visionTitle: 'Our Vision',
        visionText: 'To be the most trusted space for language growth, where every student feels supported to speak without fear of making mistakes.',
        goalTitle: 'Our Goal',
        goalText: 'Our main objective is to ensure you can hold a real conversation in French within your first few months of training with us.',
      },
    ],
    meta: {
      description: 'About us at GoGet French',
      image: metaImage?.id,
      title: 'About',
    },
    title: 'About',
  }
}
