'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
  DrawerFooter,
} from '@/components/ui/drawer'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'
import { SearchIcon } from 'lucide-react'
import React from 'react'

import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header
      id="navbar"
      className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md py-4 shadow-sm border-b border-slate-100"
    >
      <div className="max-w-7xl px-6 flex justify-between items-center mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Logo loading="eager" priority="high" className="h-14 w-auto object-contain" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {(data?.navItems || []).map(({ link }, i) => (
            <CMSLink key={i} {...link} appearance="link" />
          ))}
          <Link
            href="https://goget-french.breely.com/form/12099"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm">Book Now</Button>
          </Link>
        </nav>

        {/* Mobile Drawer */}
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <button className="md:hidden text-slate-600 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 px-4 py-4">
              <nav className="flex flex-col gap-4">
                {(data?.navItems || []).map(({ link }, i) => (
                  <CMSLink key={i} {...link} appearance="link" />
                ))}
              </nav>
            </div>
            <DrawerFooter>
              <Link
                href="https://goget-french.breely.com/form/12099"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full">Book Now</Button>
              </Link>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}
