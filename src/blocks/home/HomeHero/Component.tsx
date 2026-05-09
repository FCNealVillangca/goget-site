import { ArrowRight, BookOpenText, UserCheck } from 'lucide-react'
import React from 'react'

type Props = {
  className?: string
  heading?: string
  subheading?: string
  description?: string
  backgroundImage?: { url: string } | string
  ctaText?: string
  ctaUrl?: string
}

const HomeHero: React.FC<Props> = ({
  heading = 'French for complete beginners',
  subheading = 'Start speaking French with calm, clear lessons that make sense from day one.',
  description = 'No pressure. No confusion. Just structured support to help you build confidence step by step.',
  backgroundImage = 'https://images.unsplash.com/photo-1499566727022-8ccb1bf82098?w=1600&q=80',
  ctaText = 'Book your free assessment',
  ctaUrl = 'https://goget-french.breely.com/form/12099',
  className
}) => {
  const imageUrl = typeof backgroundImage === 'string' ? backgroundImage : backgroundImage?.url || 'https://images.unsplash.com/photo-1499566727022-8ccb1bf82098?w=1600&q=80'

  return (
    <section className={`relative w-full bg-white min-h-150 flex items-center overflow-hidden ${className || ''}`}>
      {/* 1. THE IMAGE (Positioned Absolutely to fill the right side) */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-[55%] z-0"
        style={{
          /* Apply feathering ONLY on desktop screens */
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%)',
        }}
      >
        <img
          src={imageUrl}
          alt="French Lesson"
          className="w-full h-full object-cover"
        />

        {/* 2. THE MOBILE OVERLAY (White-wash) */}
        {/* This washes out the image on mobile ONLY so text is readable */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] md:hidden" />
      </div>

      {/* 3. THE CONTENT (Sits on top of the white background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2">
        <div className="flex flex-col gap-8 py-20 max-w-xl">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-primary leading-[1.05]">
            {heading}
          </h1>
          <div className="relative py-1">
            <p className="text-xl md:text-2xl font-semibold leading-snug mb-4">
              {subheading}
            </p>
            <p className="text-primary text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-opacity-90 transition-all text-sm text-center"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
      {/* 4. BOTTOM TRICOLOR STRIP */}
      <div className="absolute bottom-0 left-0 w-full h-12 flex z-20">
        <div className="w-1/3 bg-[#001750]" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-red-600" />
      </div>
    </section>
  )
}

export default HomeHero
