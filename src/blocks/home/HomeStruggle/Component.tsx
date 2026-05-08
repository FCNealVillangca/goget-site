'use client'

import React, { useState } from 'react'
import { Globe, Package, Truck, BarChart3 } from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'E-commerce Fulfillment',
    description:
      'Fast and reliable order fulfillment services designed for online retailers, ensuring timely delivery and customer satisfaction.',
    icon: Package,
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Freight Forwarding',
    description:
      'International freight forwarding with customs clearance, documentation, and door-to-door delivery solutions.',
    icon: Truck,
    image:
      'https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Supply Chain Management',
    description:
      'From freight forwarding & customs brokerage to warehousing solutions and supply chain management, our expertise ensures that your logistics operations are seamless and efficient.',
    icon: Globe,
    image:
      'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Warehouse Solutions',
    description:
      'State-of-the-art warehouse facilities with inventory management, order processing, and distribution center services.',
    icon: BarChart3,
    image:
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800&auto=format&fit=crop',
  },
]

const HomeStruggle: React.FC = () => {
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
            Why you are struggling with French
          </h1>
          <div className="relative py-1 max-w-2xl mx-auto text-slate-500">
            <p className="text-sm md:text-base">
              Our state-of-the-art facilities and innovative technology support e-commerce
              fulfillment and project cargo handling.
            </p>
          </div>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-6 pb-8 w-full">
          {services.map((service, index) => {
            const Icon = service.icon
            const isActive = activeCard === index

            return (
              <div
                key={service.id}
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
                      src={service.image}
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
