import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { Inter } from 'next/font/google'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import './globals.css'
import { Logo } from '@/components/Logo/Logo'
import { AdminBar } from '@/components/AdminBar'
import { Header } from '@/Header/Component'
import { Footer } from '@/Footer/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { Toaster } from '@/components/ui/sonner'

import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'GoGet French',
  description: 'Structured French learning',
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(inter.variable, 'scroll-smooth')} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      {/* flex flex-col min-h-screen ensures the footer stays at the bottom */}
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <Providers>
          <Toaster position="top-right" richColors />
          <Header />

          {/* MAIN: Padded top to account for fixed header */}
          <main className="grow pt-18.5">{children}</main>

          <Footer />

          {isEnabled && <AdminBar />}
        </Providers>
      </body>
    </html>
  )
}
