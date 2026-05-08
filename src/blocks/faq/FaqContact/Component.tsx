'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import { toast } from 'sonner'

// Dynamically import the map component with no SSR
const DynamicMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="aspect-square bg-slate-100 rounded-[40px] flex items-center justify-center">
      Loading map...
    </div>
  ),
})

export default function FaqContact() {
  const [formId, setFormId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch the form ID by title on mount
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch('/api/forms?where[title][equals]=Contact Form')
        const data = await response.json()
        if (data.docs && data.docs.length > 0) {
          setFormId(data.docs[0].id)
        }
      } catch (err) {
        console.error('Error fetching form:', err)
      }
    }
    fetchForm()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formId) return

    setLoading(true)
    setError(null)

    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    const data = {
      form: formId,
      submissionData: [
        { field: 'full-name', value: formData.get('full-name') },
        { field: 'email', value: formData.get('email') },
        { field: 'mobile-number', value: formData.get('mobile-number') },
        { field: 'subject', value: formData.get('subject') },
        { field: 'message', value: formData.get('message') },
      ],
    }

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Message Sent!', {
          description: 'Thank you for your message. We will get back to you shortly.',
        })
        formElement.reset()
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.')
      toast.error('Submission Failed', {
        description: 'Something went wrong. Please try again later.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side: Real Leaflet Map */}
          <div className="w-full">
            <div className="relative rounded-[40px] overflow-hidden aspect-square shadow-2xl border border-slate-100 z-0">
              <DynamicMap />
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-5xl font-extrabold text-[#001750] tracking-tight mb-4">
                Get in touch.
              </h2>
              <p className="text-lg text-slate-500">
                Have questions? Send us a message and we'll get back to you shortly.
              </p>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <input
                name="full-name"
                type="text"
                placeholder="Full Name"
                required
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none focus:ring-2 focus:ring-[#001750] transition-all"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none focus:ring-2 focus:ring-[#001750] transition-all"
              />
              <input
                name="mobile-number"
                type="tel"
                placeholder="Mobile Number"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none focus:ring-2 focus:ring-[#001750] transition-all"
              />
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm outline-none focus:ring-2 focus:ring-[#001750] transition-all"
              />
              <textarea
                name="message"
                placeholder="How can we help?"
                required
                className="min-h-30 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#001750] transition-all resize-none"
              ></textarea>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <button
                type="submit"
                disabled={loading || !formId}
                className="w-full bg-[#001750] text-white py-5 rounded-2xl font-bold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
