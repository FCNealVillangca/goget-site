import React from 'react'
import { Target, Eye, Flag } from 'lucide-react'

type Props = {
  heading?: string
  missionTitle?: string
  missionText?: string
  visionTitle?: string
  visionText?: string
  goalTitle?: string
  goalText?: string
  id?: string
}

export const AboutDirectivesBlock: React.FC<Props> = ({
  heading = 'Clear path to fluency',
  missionTitle = 'Our Mission',
  missionText = 'To provide simple, honest, and high-impact coaching that turns beginners into confident French speakers through active practice.',
  visionTitle = 'Our Vision',
  visionText = 'To be the most trusted space for language growth, where every student feels supported to speak without fear of making mistakes.',
  goalTitle = 'Our Goal',
  goalText = 'Our main objective is to ensure you can hold a real conversation in French within your first few months of training with us.',
  id,
}) => {
  return (
    <section className="w-full py-16 md:py-24 overflow-hidden" id={`block-${id}`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl text-center md:text-7xl font-black tracking-tighter leading-none text-primary">
          {heading}
        </h2>

        <div className="grid md:grid-cols-3 gap-12 pt-12 border-t border-white/10 mt-12">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Target className="w-6 h-6" />
              <h3 className="text-xl font-black tracking-tight uppercase">{missionTitle}</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">{missionText}</p>
          </div>

          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Eye className="w-6 h-6" />
              <h3 className="text-xl font-black tracking-tight uppercase ">{visionTitle}</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">{visionText}</p>
          </div>

          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Flag className="w-6 h-6" />
              <h3 className="text-xl font-black tracking-tight uppercase">{goalTitle}</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">{goalText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutDirectivesBlock
