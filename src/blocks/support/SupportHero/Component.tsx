import React from 'react'
import { Mic2, MessageCircle } from 'lucide-react'

type Props = {
  heading?: string
  description?: string
  id?: string
}

export const SupportHeroBlock: React.FC<Props> = ({
  heading = 'Speak French with total confidence',
  description = 'Structured lessons designed to turn understanding into performance. Build confidence for exams and know exactly what to say under pressure.',
  id,
}) => {
  return (
    <section className="relative w-full bg-accent overflow-hidden" id={`block-${id}`}>
      <div className="container max-w-7xl mx-auto px-6 py-12 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10 order-2 lg:order-1 text-center lg:text-left relative z-10">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-primary">
              {heading}
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              {description}
            </p>
          </div>
        </div>

        <div className="relative order-1 lg:order-2 flex justify-center items-center">
          <div className="relative w-full max-w-[480px]">
            <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,23,80,0.08)] border border-slate-50 flex flex-col gap-8 relative z-10">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
                    Student Progress
                  </span>
                  <span className="text-primary font-black text-2xl md:text-3xl tracking-tight">
                    Confidence Level
                  </span>
                </div>
                <div className="bg-[#F0EEFF] text-primary px-5 py-2 rounded-2xl font-black text-2xl md:text-3xl">
                  100%
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-4 bg-[#F0EEFF] rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Beginner</span>
                  <span className="text-primary">Fluent</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-2 md:-right-6 bg-white p-4 rounded-3xl shadow-xl border border-slate-50 z-20">
              <Mic2 className="text-primary w-8 h-8 md:w-10 md:h-10" />
            </div>

            <div className="absolute -bottom-8 left-0 md:-left-12 bg-primary py-5 px-7 rounded-[2rem] shadow-2xl flex items-center gap-4 z-20">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageCircle className="text-white w-6 h-6" />
              </div>
              <span className="text-white font-black text-lg md:text-xl uppercase tracking-wider">
                Active Practice
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportHeroBlock
