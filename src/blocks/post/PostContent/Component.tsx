import React from 'react'
import RichText from '@/components/RichText'
import { Post } from '@/payload-types'

export const PostContent: React.FC<{
  post: Post
}> = ({ post }) => {
  return (
    <section className="relative bg-white dark:bg-slate-950 py-16 md:py-24 transition-colors duration-300">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="container px-4">
        <div className="mx-auto max-w-7xl">
          <article className="prose dark:prose-invert prose-blue max-w-none prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 dark:hover:prose-a:text-blue-300 prose-img:rounded-2xl prose-img:shadow-2xl">
            <RichText data={post.content} enableGutter={false} className="post-rich-text" />
          </article>
        </div>
      </div>
    </section>
  )
}
