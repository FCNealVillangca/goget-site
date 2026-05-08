import React from 'react'
import { Star, ShieldCheck, BookOpen, CalendarCheck } from 'lucide-react'

type Feature = {
  icon: 'star' | 'shield-check' | 'book-open' | 'calendar-check'
  title: string
  content: string
}

type Props = {
  className?: string
  title?: string
  features?: Feature[]
}

const iconMap = {
  star: Star,
  'shield-check': ShieldCheck,
  'book-open': BookOpen,
  'calendar-check': CalendarCheck,
}

const HomePerformance: React.FC<Props> = ({
  title = 'Transform Your French Skills',
  features = [
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
  className
}) => {

  return (
    <section className={`relative w-full bg-accent py-20 border-t border-slate-100 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Side: Text Bubbles */}
        <div className="relative flex flex-col w-full">
          {/* BEFORE Bubble - 60% Width, Left Aligned */}
          <div className="relative w-[60%] bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm z-0">
            <span className="text-[10px] font-bold bg-slate-200 px-2 py-1 rounded">BEFORE</span>
            <p className="text-xl font-medium leading-relaxed mt-6 text-slate-400 italic">
              "Je parle français couramment maintenant!"
            </p>
            {/* SVG Tail - Pointing Below */}
            <svg
              className="absolute -bottom-3.5 left-8 w-6 h-4 text-slate-50"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M0 0 L20 0 L10 20 Z" />
            </svg>
            <svg
              className="absolute -bottom-3.75 left-8 w-6 h-4 text-slate-200 -z-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M0 0 L20 0 L10 20 Z" />
            </svg>
          </div>

          {/* AFTER Bubble - 60% Width, Right Aligned, 50% Height Overlap */}
          <div className="relative w-[60%] self-end -mt-20 bg-white rounded-3xl p-8 shadow-2xl border border-[#001750] z-10">
            <span className="text-[10px] font-bold bg-[#001750] text-white px-2 py-1 rounded">
              AFTER
            </span>
            <p className="text-xl font-bold leading-relaxed mt-6 text-[#001750]">
              "Je parle français couramment maintenant!"
            </p>
            {/* SVG Tail - Pointing Below (Moved from top to bottom) */}
            <svg
              className="absolute -bottom-3.5 right-8 w-6 h-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M0 0 L20 0 L10 20 Z" />
            </svg>
            <svg
              className="absolute -bottom-3.75 right-8 w-6 h-4 text-[#001750] -z-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M0 0 L20 0 L10 20 Z" />
            </svg>
          </div>
        </div>

        {/* Right Side: Features */}
        <div className="space-y-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#001750] leading-tight tracking-tight">
            {title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f, i) => {
              const IconComponent = iconMap[f.icon]
              return (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#001750] flex items-center justify-center text-white">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">{f.title}</h4>
                    <p className="text-slate-500 text-sm leading-snug">{f.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePerformance
