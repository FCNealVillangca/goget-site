import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import HomeHeroBlock from '@/blocks/home/HomeHero/Component'
import HomePerformanceBlock from '@/blocks/home/HomePerformance/Component'
import HomeStepsBlock from '@/blocks/home/HomeSteps/Component'
import HomeStruggleBlock from '@/blocks/home/HomeStruggle/Component'
import { HomeTestimonialBlock } from '@/blocks/home/HomeTestimonial/Component'
import { AboutTutorBlock } from '@/blocks/about/AboutTutor/Component'
import { AboutStruggleBlock } from '@/blocks/about/AboutStruggle/Component'
import { AboutDirectivesBlock } from '@/blocks/about/AboutDirectives/Component'
import { ResultListBlock } from '@/blocks/result/ResultList/Component'
import { SupportHeroBlock } from '@/blocks/support/SupportHero/Component'
import { SupportCoursesBlock } from '@/blocks/support/SupportCourses/Component'
import { FaqListBlock } from '@/blocks/faq/FaqList/Component'
import FaqContactBlock from '@/blocks/faq/FaqContact/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  'home-hero': HomeHeroBlock,
  'home-performance': HomePerformanceBlock,
  'home-steps': HomeStepsBlock,
  'home-struggle': HomeStruggleBlock,
  'home-testimonial': HomeTestimonialBlock,
  'about-tutor': AboutTutorBlock,
  'about-struggle': AboutStruggleBlock,
  'about-directives': AboutDirectivesBlock,
  'result-list': ResultListBlock,
  'support-hero': SupportHeroBlock,
  'support-courses': SupportCoursesBlock,
  'faq-list': FaqListBlock,
  'faq-contact': FaqContactBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="mb-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
