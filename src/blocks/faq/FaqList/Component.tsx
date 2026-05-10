import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { FaqClient } from './FaqClient'

type Props = {
  heading?: string
  description?: string
  id?: string
}

export const FaqListBlock: React.FC<Props> = ({
  heading = 'Frequently Asked Questions',
  description = 'Everything you need to know about GOGET and our methodology.',
  id,
}) => {
  return (
    <div id={`block-${id}`}>
      <FaqClient
        heading={heading}
        description={description}
      />
    </div>
  )
}

export default FaqListBlock
