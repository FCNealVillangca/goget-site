'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Star, Play, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface ReviewCardProps {
  review: {
    name: string
    role: string
    content: string
    rating: number
    image?: string
    thumbnail?: string
    video?: {
      url: string
    }
  }
  buttonText?: string
  buttonIcon?: React.ReactNode
  hasVideoToggle?: boolean
  variant?: 'default' | 'featured'
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  buttonText = 'VIEW RESULT',
  buttonIcon = <div className="w-3 h-3 fill-current">▶</div>,
  hasVideoToggle = false,
  variant = 'default',
}) => {
  const isFeatured = variant === 'featured'
  const [showVideo, setShowVideo] = useState(isFeatured) // Main card shows video by default, small cards show text
  const [thumbnailSrc, setThumbnailSrc] = useState<string>(
    review.thumbnail && !review.thumbnail.endsWith('.mp4') ? review.thumbnail : '',
  )
  const videoRef = useRef<HTMLVideoElement>(null)

  const hasVideo = !!review.video?.url && hasVideoToggle

  useEffect(() => {
    if (hasVideo && review.video?.url && !review.thumbnail) {
      const video = videoRef.current
      if (video) {
        video.preload = 'metadata'
        video.onloadedmetadata = () => {
          video.currentTime = 0.5
        }
        video.onseeked = () => {
          const canvas = document.createElement('canvas')
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(video, 0, 0)
            try {
              const dataUrl = canvas.toDataURL('image/jpeg', 0.7)
              setThumbnailSrc(dataUrl)
            } catch (e) {
              console.warn('Could not extract video frame:', e)
            }
          }
        }
      }
    }
  }, [hasVideo, review.video?.url, review.thumbnail])

  const renderRating = () => (
    <div className={`flex gap-1 ${isFeatured ? 'mb-6' : 'mb-6'}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${isFeatured ? 'w-5 h-5' : 'w-4 h-4'} ${
            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
          }`}
        />
      ))}
    </div>
  )

  const renderUserInfo = () => (
    <div
      className={`flex items-center gap-3 mt-auto pt-4 border-t border-slate-200/30 ${isFeatured ? 'pt-6 border-t border-slate-200/50' : ''}`}
    >
      {review.image ? (
        <img
          src={review.image}
          className={`${isFeatured ? 'w-14 h-14' : 'w-10 h-10'} rounded-full object-cover ${isFeatured ? 'border-2 border-white' : ''}`}
          alt=""
        />
      ) : (
        <div
          className={`${isFeatured ? 'w-14 h-14 text-lg' : 'w-10 h-10 text-sm'} rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold ${isFeatured ? 'border-2 border-white' : ''}`}
        >
          {review.name.charAt(0)}
        </div>
      )}
      <div>
        <h4
          className={`font-bold text-[#001750] leading-tight ${isFeatured ? 'text-lg' : 'text-sm'}`}
        >
          {review.name}
        </h4>
        <p
          className={`text-slate-500 font-bold uppercase tracking-widest ${isFeatured ? 'text-sm' : 'text-[10px]'}`}
        >
          {review.role}
        </p>
      </div>
    </div>
  )

  return (
    <>
      <video
        ref={videoRef}
        src={review.video?.url}
        style={{ display: 'none' }}
        muted
        playsInline
        crossOrigin="anonymous"
      />
      <div
        className={`${isFeatured ? 'lg:col-span-5 bg-[#F8FAFF] rounded-[40px] p-10' : 'bg-[#F8FAFF] rounded-[40px] p-8'} border border-transparent hover:border-slate-200 transition-all flex flex-col shadow-sm h-full`}
      >
        {/* Content Section (Toggle between Text and Video) */}
        {hasVideo && showVideo ? (
          <Dialog>
            <DialogTrigger asChild>
              <div
                className={`relative w-full ${isFeatured ? 'grow min-h-75 mb-8' : 'h-48 mb-4'} rounded-3xl overflow-hidden group cursor-pointer shadow-md bg-black/50 flex items-center justify-center`}
              >
                {thumbnailSrc && (
                  <img
                    src={thumbnailSrc}
                    alt="Video Preview"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <Play className="w-8 h-8 text-primary fill-current ml-1" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Testimonial Video</DialogTitle>
                <DialogDescription>Watch the full testimonial video</DialogDescription>
              </DialogHeader>
              <video
                src={review.video?.url}
                controls
                autoPlay
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </DialogContent>
          </Dialog>
        ) : (
          <p
            className={`text-slate-600 leading-relaxed italic ${isFeatured ? 'text-[15px] mb-8 grow line-clamp-4' : 'text-[15px] mb-4 line-clamp-4'}`}
          >
            "{review.content}"
          </p>
        )}

        {/* Toggle / Action Button */}
        {hasVideo ? (
          <button
            onClick={() => setShowVideo(!showVideo)}
            className={`text-primary font-extrabold flex items-center gap-2 mb-4 uppercase text-left hover:underline tracking-widest ${isFeatured ? 'text-sm mb-6' : 'text-[10px]'}`}
          >
            {showVideo ? (
              isFeatured ? (
                <>
                  READ MORE <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                'READ MORE'
              )
            ) : (
              <>
                <Play className={`${isFeatured ? 'w-4 h-4' : 'w-3 h-3'} fill-current`} />{' '}
                {isFeatured ? 'PLAY VIDEO' : 'PLAY VIDEO REVIEW'}
              </>
            )}
          </button>
        ) : null}

        {renderRating()}
        {renderUserInfo()}
      </div>
    </>
  )
}

export default ReviewCard
