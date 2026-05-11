'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <div>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
        Newsletter
      </h4>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">
        Get the latest updates and French learning tips.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
          disabled={status === 'loading'}
        />
        <Button type="submit" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>
        {message && (
          <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}