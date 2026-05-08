const AboutOurServices = () => {
  return (
    <section className="relative w-full bg-accent py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 order-2 lg:order-1 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#001750] leading-tight">
              Tailored French coaching for every goal
            </h2>

            <div className="text-slate-500 text-lg leading-relaxed space-y-4">
              <p className="font-bold text-[#001750]">
                We provide structured, high-impact lessons designed to get you speaking from day
                one.
              </p>
              <p>
                Whether you are preparing for GCSE/A-Level exams or looking to master business
                French, our services are built around your specific pace and learning style.
              </p>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="flex-1 order-1 lg:order-2 w-full max-w-xl lg:max-w-none">
            <div className="grid grid-cols-2 gap-3">
              {/* Left Stack */}
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden shadow-sm h-60">
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=600&fit=crop"
                    alt="Exam Preparation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm h-45">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop"
                    alt="Business French"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Right Stack */}
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden shadow-sm h-45">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                    alt="Conversation Practice"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm h-60">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=600&fit=crop"
                    alt="Online Mentorship"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutOurServices
