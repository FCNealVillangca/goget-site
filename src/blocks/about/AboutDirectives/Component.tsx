import React from 'react'
import { Target, Eye, Flag } from 'lucide-react'

const AboutDirectives = () => {
  return (
    <section className="w-full py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Header Area */}
        <h2 className="text-5xl text-center md:text-7xl font-black tracking-tighter leading-none text-primary">
          Clear path to fluency
        </h2>

        {/* Bottom Three-Column Grid */}
        <div className="grid md:grid-cols-3 gap-12 pt-12 border-t border-white/10">
          {/* Mission */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Target className="w-6 h-6" />
              <h3 className="text-xl font-black tracking-tight uppercase">Our Mission</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              To provide simple, honest, and high-impact coaching that turns beginners into
              confident French speakers through active practice.
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Eye className="w-6 h-6" />
              <h3 className="text-xl font-black tracking-tight uppercase ">Our Vision</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              To be the most trusted space for language growth, where every student feels supported
              to speak without fear of making mistakes.
            </p>
          </div>

          {/* Goal */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Flag className="w-6 h-6" />
              <h3 className="text-xl font-black tracking-tight uppercase">Our Goal</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Our main objective is to ensure you can hold a real conversation in French within your
              first few months of training with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutDirectives
