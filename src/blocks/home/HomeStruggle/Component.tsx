'use client'

import React, { useState } from 'react'
import { Globe, Package, Truck, BarChart3 } from 'lucide-react'

type Service = {
  title: string
  description: string
  icon: 'globe' | 'package' | 'truck' | 'barchart3'
  image: { url: string } | string
}

type Props = {
  className?: string
  heading?: string
  subheading?: string
  services?: Service[]
}

const iconMap = {
  globe: Globe,
  package: Package,
  truck: Truck,
  barchart3: BarChart3,
}

const HomeStruggle: React.FC<Props> = ({
  heading = 'Why you are struggling with French',
  subheading = 'Our state-of-the-art facilities and innovative technology support e-commerce fulfillment and project cargo handling.',
  services = [],
  className
}) => {
  const [activeCard, setActiveCard] = useState(2)
  const [clickedCard, setClickedCard] = useState<number | null>(null)

  const handleCardClick = (index: number) => {
    if (clickedCard === index) {
      setClickedCard(null)
      setActiveCard(2)
    } else {
      setClickedCard(index)
      setActiveCard(index)
    }
  }

  return (
    <section className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#001750] mb-6">
            {heading}
          </h1>
          <div className="relative py-1 max-w-2xl mx-auto text-slate-500">
            <p className="text-sm md:text-base">
              {subheading}
            </p>
          </div>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-6 pb-8 w-full">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Package
            const imageUrl = typeof service.image === 'string' ? service.image : service.image?.url || ''
            const isActive = activeCard === index

            return (
              <div
                key={index}
                onMouseEnter={() => {
                  if (window.innerWidth >= 768) setActiveCard(index)
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 768 && clickedCard === null) {
                    setActiveCard(2)
                  }
                }}
                onClick={() => handleCardClick(index)}
                // Uses aspect-square on mobile, fixed height on desktop
                className={`transition-all duration-500 ease-in-out cursor-pointer rounded-2xl overflow-hidden min-w-0 shrink-0
                    ${
                      isActive
                        ? 'flex-[1.5] aspect-square md:aspect-auto md:h-96'
                        : 'flex-1 aspect-square md:aspect-auto md:h-96'
                    }`}
              >
                {isActive ? (
                  <div className="w-full h-full bg-primary p-6 md:p-8 flex flex-col justify-center items-start text-white shadow-xl">
                    <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">{service.title}</h3>
                    <p className="text-slate-100 leading-relaxed text-xs md:text-sm line-clamp-6 md:line-clamp-none">
                      {service.description}
                    </p>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white flex justify-between items-end md:block">
                      <h3 className="text-base md:text-xl font-bold truncate pr-4">
                        {service.title}
                      </h3>
                      <span className="text-xs font-semibold text-slate-300 whitespace-nowrap">
                        Read More →
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeStruggle
