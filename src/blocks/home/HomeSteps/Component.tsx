import React from 'react'

const HomeSteps = () => {
  const steps = [
    {
      title: 'Assess Your Level',
      description: 'Take our quick assessment to determine your current French proficiency and learning goals.',
    },
    {
      title: 'Personalized Plan',
      description: 'Receive a customized learning plan tailored to your schedule and objectives.',
    },
    {
      title: 'Structured Lessons',
      description: 'Follow clear, step-by-step lessons designed for complete beginners.',
    },
    {
      title: 'Practice & Support',
      description: 'Practice with interactive exercises and get support from our friendly team.',
    },
  ]

  return (
    <section className="relative w-full bg-white py-20">
      <div className="max-w-7xl px-6 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#001750] mb-6">
            Our Simple Process
          </h1>
          <div className="relative py-1 max-w-2xl mx-auto text-slate-500">
            <p className="text-sm md:text-base">
              Start your French learning journey with our structured, beginner-friendly approach that builds confidence step by step.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-start">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            return (
              <div key={index} className="flex flex-1 flex-row md:flex-col group">
                <div className="flex flex-col items-center md:flex-row md:flex-1 md:w-full">
                  <div className="flex w-14 h-14 shrink-0 items-center justify-center rounded-full border-2 border-[#001750] bg-white">
                    <div className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full bg-[#001750] text-white font-bold">
                      {stepNumber}
                    </div>
                  </div>
                  <div className="grow flex items-center md:w-full">
                    <div className="rounded-full bg-[#001750] w-0.5 h-12 md:h-0.5 md:w-full mx-auto md:mx-4" />
                  </div>
                </div>
                <div className="grow pl-8 md:pl-0 md:mt-10 pb-12 md:pb-0">
                  <h3 className="text-2xl font-bold text-[#001750] mb-4">{step.title}</h3>
                  <p className="text-slate-500 text-sm max-w-60">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeSteps
