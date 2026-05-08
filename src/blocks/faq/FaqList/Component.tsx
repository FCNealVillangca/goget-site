"use client"

import React, { useState, useEffect } from 'react'
import { Search, HelpCircle } from 'lucide-react'
import { useDebounce } from '@/utilities/useDebounce'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const FaqList = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true)
      try {
        // Use Payload's built-in 'where' query for backend searching
        // Searches both question OR answer for the term
        let url = '/api/faq?limit=100'
        if (debouncedSearchTerm) {
          url += `&where[or][0][question][contains]=${debouncedSearchTerm}&where[or][1][answer][contains]=${debouncedSearchTerm}`
        }

        const response = await fetch(url)
        const data = await response.json()
        setFaqs(data.docs || [])
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [debouncedSearchTerm])

  return (
    <section className="relative w-full bg-white text-foreground overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-4xl relative z-10 py-24 px-6 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#001750] mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">
            Everything you need to know about GOGET and our methodology.
          </p>

          {/* Search Bar */}
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
            {loading && searchTerm && (
              <div className="absolute right-6 inset-y-0 flex items-center">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* Accordion */}
        {loading && !faqs.length ? (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400">Searching database...</p>
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

export default FaqList
