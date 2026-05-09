import React from 'react'
import type { Media } from '@/payload-types'

type Props = {
  heading?: string
  steps?:
    | {
        number: string
        title: string
        description: string
        image: Media | string
        id?: string | null
      }[]
    | null
  id?: string
}

export const SupportCoursesBlock: React.FC<Props> = ({ heading = 'How it works?', steps, id }) => {
  const defaultSteps = [
    {
      number: '01',
      title: 'Book your session',
      image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&q=80',
      description:
        'Choose a time that fits your schedule. We offer flexible slots for busy students and professionals.',
    },
    {
      number: '02',
      title: 'Meet your tutor',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      description:
        'Connect with a native speaker who understands your goals and creates a plan just for you.',
    },
    {
      number: '03',
      title: 'Start speaking',
      image: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=800&q=80',
      description:
        'Skip the boring drills. Jump straight into real conversations and build confidence from day one.',
    },
  ]

  const displaySteps = steps?.length ? steps : defaultSteps

  return (
    <section className="w-full bg-[#fcfdff] py-20 md:py-32" id={`block-${id}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter">
            {heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displaySteps.map((step, index) => {
            const imageUrl =
              typeof step.image === 'object' && step.image?.url
                ? step.image.url
                : typeof step.image === 'string'
                  ? step.image
                  : defaultSteps[index]?.image

            return (
              <div key={'id' in step && step.id ? step.id : index} className="flex flex-col">
                <div className="relative h-62.5 rounded-t-2xl overflow-hidden">
                  <img src={imageUrl} alt={step.title} className="w-full h-full object-cover" />

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-4 text-2xl font-black z-10 shadow-lg">
                    {step.number}
                  </div>
                </div>

                <div className="bg-accent p-10 flex-1 rounded-b-2xl border-t border-white/20">
                  <h3 className="text-primary text-3xl font-black mb-4">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed ">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SupportCoursesBlock
