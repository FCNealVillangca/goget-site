import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import Newsletter from './Newsletter'

export async function Footer() {
  const headerData = await getCachedGlobal('header', 1)()

  const navItems = headerData?.navItems || []

  return (
    <footer className="bg-white py-10 border-t border-slate-100 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="relative w-48">
              <Logo className="h-20 w-auto object-contain object-left" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
              Structured French learning focused on speaking, clarity, and exam performance.
            </p>
            <div className="flex gap-3">
              {/* Social Icons */}
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:pl-10">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
              Navigation
            </h4>
            <nav className="space-y-4 text-sm font-semibold text-slate-600">
              {navItems.map(({ link }, i) => (
                <p key={i}>
                  <CMSLink {...link} className="hover:text-primary" />
                </p>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="font-bold text-slate-900 text-sm">+44 7587 407771</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-bold text-slate-900 text-sm">info@gogetfrench.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <Newsletter />
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">© 2026 GoGet French. All rights reserved.</p>
          <div className="flex flex-col gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
          {/* <ThemeSelector /> */}
        </div>
      </div>
    </footer>
  )
}
