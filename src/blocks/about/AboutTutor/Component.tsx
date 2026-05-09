import React from 'react'
import { Check } from 'lucide-react'
import type { Media } from '@/payload-types'

type Props = {
  heading?: string
  paragraphs?: { text: string; id?: string | null }[] | null
  highlightText?: string
  points?: { text: string; id?: string | null }[] | null
  image?: Media | string | null
  id?: string
}

export const AboutTutorBlock: React.FC<Props> = ({
  heading = "Bonjour, I'm Kwaku",
  paragraphs = [
    {
      text: "I'm a certified French tutor trained at CAVILAM - Alliance Française, based in Chelmsford, originally from Toulouse in the south of France.",
    },
    { text: 'Most students struggle because they lack confidence when it is time to speak.' },
  ],
  highlightText = 'That is what GoGet is built to fix.',
  points = [
    { text: 'Each lesson follows a clear structure.' },
    { text: 'Focused speaking practice.' },
    { text: 'Step by step progress.' },
  ],
  image,
  id,
}) => {
  const imageUrl =
    typeof image === 'object' && image?.url ? image.url : typeof image === 'string' ? image : '/assets/kwaku.png'

  return (
    <section className="relative w-full bg-accent overflow-hidden py-16 md:py-20" id={`block-${id}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
          <div className="flex-1 w-full max-w-md order-2 lg:order-1 relative">
            <div className="relative h-full min-h-100 rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white">
              <img src={imageUrl} alt={heading} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-[#001750]/10 via-transparent to-transparent" />
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 flex flex-col justify-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#001750] leading-none text-center lg:text-left">
                {heading}
              </h2>

              <div className="text-slate-400 leading-normal max-w-2xl text-center lg:text-left mx-auto lg:mx-0 space-y-4">
                {paragraphs?.map((p, i) => <p key={p.id || i}>{p.text}</p>)}
              </div>
              
              {highlightText && (
                <p className="text-primary font-bold text-xl">{highlightText}</p>
              )}

              {points && points.length > 0 && (
                <div className="grid grid-cols-1 gap-3 border-t border-slate-100 mt-6 pt-6">
                  {points.map((point, i) => (
                    <div key={point.id || i} className="flex items-center gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground stroke-4" />
                      </div>
                      <span className="text-slate-400">{point.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTutorBlock
