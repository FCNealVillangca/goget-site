import React from 'react'

const SupportCourses = () => {
  const steps = [
    {
      number: '01',
      title: 'Book your session',
      // New working image for step 01
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

  return (
    <section className="w-full bg-[#fcfdff] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter">
            How it works?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col">
              {/* TOP BOX - Images fixed */}
              <div className="relative  h-62.5 rounded-t-2xl overflow-hidden">
                <img src={step.image} alt={step.title} className="w-full h-full object-cover" />

                {/* Step Number block */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-4 text-2xl font-black z-10 shadow-lg">
                  {step.number}
                </div>
              </div>

              {/* BOTTOM BOX - Title and Description */}
              <div className="bg-accent p-10 flex-1 rounded-b-2xl border-t border-white/20">
                <h3 className="text-primary text-3xl font-black mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed ">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SupportCourses
