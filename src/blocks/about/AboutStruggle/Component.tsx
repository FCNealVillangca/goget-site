import React from 'react'
import type { Media } from '@/payload-types'

type Props = {
  heading?: string
  introParagraph?: string
  mainParagraph?: string
  images?: { image: Media | string | null; id?: string | null }[] | null
  id?: string
}

export const AboutStruggleBlock: React.FC<Props> = ({
  heading = 'Tailored French coaching for every goal',
  introParagraph = 'We provide structured, high-impact lessons designed to get you speaking from day one.',
  mainParagraph = 'Whether you are preparing for GCSE/A-Level exams or looking to master business French, our services are built around your specific pace and learning style.',
  images,
  id,
}) => {
  // Default placeholder images
  const defaultImages = [
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=600&fit=crop',
  ]

  const getImageUrl = (imgData: Media | string | null | undefined, index: number) => {
    if (typeof imgData === 'object' && imgData?.url) return imgData.url
    if (typeof imgData === 'string') return imgData
    return defaultImages[index]
  }

  const img1 = images && images[0] ? getImageUrl(images[0].image, 0) : defaultImages[0]
  const img2 = images && images[1] ? getImageUrl(images[1].image, 1) : defaultImages[1]
  const img3 = images && images[2] ? getImageUrl(images[2].image, 2) : defaultImages[2]
  const img4 = images && images[3] ? getImageUrl(images[3].image, 3) : defaultImages[3]

  return (
    <section className="relative w-full bg-accent py-16 md:py-24 overflow-hidden" id={`block-${id}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 order-2 lg:order-1 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#001750] leading-tight">
              {heading}
            </h2>

            <div className="text-slate-500 text-lg leading-relaxed space-y-4">
              <p className="font-bold text-[#001750]">{introParagraph}</p>
              <p>{mainParagraph}</p>
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 w-full max-w-xl lg:max-w-none">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden shadow-sm h-60">
                  <img src={img1} alt="Coaching 1" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm h-45">
                  <img src={img2} alt="Coaching 2" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden shadow-sm h-45">
                  <img src={img3} alt="Coaching 3" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm h-60">
                  <img src={img4} alt="Coaching 4" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutStruggleBlock
