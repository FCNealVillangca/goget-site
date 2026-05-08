import React from 'react'
import { Check } from 'lucide-react'

const MeetYourTutor = () => {
  return (
    <section className="relative w-full bg-accent overflow-hidden py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* items-stretch forces both columns to be the same height */}
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
          {/* Left Column: Tutor Image */}
          <div className="flex-1 w-full max-w-md order-2 lg:order-1 relative">
            {/* Removed aspect-ratio, added h-full */}
            <div className="relative h-full min-h-100 rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white">
              <img
                src="/assets/kwaku.png"
                alt="French Tutor"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#001750]/10 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 order-1 lg:order-2 flex flex-col justify-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#001750] leading-none text-center lg:text-left">
                Bonjour, I'm Kwaku
              </h2>

              <div className="text-slate-400 leading-normal max-w-2xl text-center lg:text-left mx-auto lg:mx-0 space-y-4">
                <p>
                  I'm a certified French tutor trained at CAVILAM - Alliance Française, based in
                  Chelmsford, originally from Toulouse in the south of France.
                </p>
                <p>Most students struggle because they lack confidence when it is time to speak.</p>
              </div>
              <p className="text-primary font-bold text-xl">That is what GoGet is built to fix.</p>

              <div className="grid grid-cols-1 gap-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground stroke-4" />
                  </div>
                  <span className="text-slate-400">Each lesson follows a clear structure.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground stroke-4" />
                  </div>
                  <span className="text-slate-400">Focused speaking practice.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground stroke-4" />
                  </div>
                  <span className="text-slate-400">Step by step progress.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MeetYourTutor
