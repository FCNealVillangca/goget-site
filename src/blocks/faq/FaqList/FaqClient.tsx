'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Search, HelpCircle } from 'lucide-react'
import { useDebounce } from '@/utilities/useDebounce'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type FaqItem = {
  id: string | number
  question: string
  answer: string
}

type Props = {
  heading: string
  description: string
}

export const FaqClient: React.FC<Props> = ({ heading, description }) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/faqs${debouncedSearchTerm ? `?q=${encodeURIComponent(debouncedSearchTerm)}` : ''}`)
        const data = await response.json()
        setFaqs(data.faqs)
      } catch (error) {
        console.error('Failed to fetch FAQs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [debouncedSearchTerm])

  return (
    <section className="relative w-full text-foreground overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl relative z-10 py-24 px-6 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#001750] mb-6">
            {heading}
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">{description}</p>

          <div className="relative max-w-xl mx-auto group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-16 pl-14 pr-6 rounded-full border border-slate-200 bg-slate-50/50 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all text-base shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-slate-500">Loading FAQs...</p>
          </div>
        ) : faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id || index}
                value={`item-${index}`}
                className="border border-slate-100 bg-white rounded-2xl px-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 font-bold text-[#001750] text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-6 text-base border-t border-slate-50 pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No database results found for "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
