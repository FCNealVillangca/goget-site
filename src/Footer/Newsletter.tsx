import React from 'react'
import { Button } from '@/components/ui/button'

export default function Newsletter() {
  return (
    <div>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
        Newsletter
      </h4>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">
        Get the latest updates and French learning tips.
      </p>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
        />
        <Button className="w-full">Subscribe</Button>
      </div>
    </div>
  )
}