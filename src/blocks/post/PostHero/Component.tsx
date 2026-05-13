import React from 'react'
import { Post, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { format } from 'date-fns'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { title, categories, publishedAt, heroImage } = post

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {heroImage && typeof heroImage !== 'number' ? (
          <Media
            resource={heroImage}
            fill
            className="object-contain object-center opacity-80 transition-transform duration-700 hover:scale-105"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-950">
            {/* Mesh Gradient Fallback */}
            <div className="absolute inset-0 opacity-10 dark:opacity-30">
              <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600 blur-[120px]" />
              <div className="absolute bottom-[10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-indigo-600 blur-[120px]" />
              <div className="absolute top-[20%] right-[10%] h-[30%] w-[30%] rounded-full bg-purple-600 blur-[120px]" />
            </div>
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-slate-950/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 pt-48 pb-20 md:pt-64 md:pb-32 lg:pt-80 flex flex-col items-center text-center">
        <div className="w-full max-w-7xl flex flex-col items-center">
          {/* Meta Information */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {categories && categories.length > 0 && (
              <div className="flex gap-2">
                {categories.map((category) => {
                  if (typeof category === 'object') {
                    return (
                      <span
                        key={category.id}
                        className="rounded-full bg-blue-600/10 dark:bg-blue-600/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 backdrop-blur-md border border-blue-500/20 dark:border-blue-500/30"
                      >
                        {category.title}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            )}
            {publishedAt && (
              <time
                dateTime={publishedAt}
                className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 sm:border-l border-slate-200 dark:border-slate-800 sm:pl-4"
              >
                {format(new Date(publishedAt), 'MMMM d, yyyy')}
              </time>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 leading-[1.1]">
            {title}
          </h1>

          {/* Author/Extra (Optional) */}
          <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="h-full w-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                <span className="text-xs font-black text-blue-600 dark:text-white">GG</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">GoGet Team</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                French Education Specialists
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white dark:from-slate-950 to-transparent z-10" />
    </div>
  )
}
