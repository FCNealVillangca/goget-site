# Converting HomeHero Component to Payload CMS Block

To convert your `src/blocks/home/HomeHero/Component.tsx` into a reusable Payload CMS block, follow these steps. This will allow content editors to customize the hero content through the admin panel instead of it being hardcoded.

## Step 1: Create the Block Configuration

Create a new file `src/blocks/home/HomeHero/config.ts`:

```typescript
import type { Block } from 'payload'

export const HomeHero: Block = {
  slug: 'home-hero',
  interfaceName: 'HomeHeroBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'French for complete beginners',
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: true,
      defaultValue: 'Start speaking French with calm, clear lessons that make sense from day one.',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'No pressure. No confusion. Just structured support to help you build confidence step by step.',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      defaultValue: 'Book your free assessment',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://goget-french.breely.com/form/12099',
    },
  ],
  labels: {
    plural: 'Home Heroes',
    singular: 'Home Hero',
  },
}
```

## Step 2: Update the Component to Accept Block Props

Modify `src/blocks/home/HomeHero/Component.tsx` to accept block data as props:

```typescript
import { ArrowRight, BookOpenText, UserCheck } from 'lucide-react'
import React from 'react'

type Props = {
  className?: string
  heading?: string
  subheading?: string
  description?: string
  backgroundImage?: { url: string } | string
  ctaText?: string
  ctaUrl?: string
}

const HomeHero: React.FC<Props> = ({
  heading = 'French for complete beginners',
  subheading = 'Start speaking French with calm, clear lessons that make sense from day one.',
  description = 'No pressure. No confusion. Just structured support to help you build confidence step by step.',
  backgroundImage = '/assets/landingpagebanner.jpg',
  ctaText = 'Book your free assessment',
  ctaUrl = 'https://goget-french.breely.com/form/12099',
  className
}) => {
  const imageUrl = typeof backgroundImage === 'string' ? backgroundImage : backgroundImage?.url || '/assets/landingpagebanner.jpg'

  return (
    <section className={`relative w-full bg-white min-h-150 flex items-center overflow-hidden ${className || ''}`}>
      {/* 1. THE IMAGE (Positioned Absolutely to fill the right side) */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-[55%] z-0"
        style={{
          /* Apply feathering ONLY on desktop screens */
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%)',
        }}
      >
        <img
          src={imageUrl}
          alt="French Lesson"
          className="w-full h-full object-cover"
        />

        {/* 2. THE MOBILE OVERLAY (White-wash) */}
        {/* This washes out the image on mobile ONLY so text is readable */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] md:hidden" />
      </div>

      {/* 3. THE CONTENT (Sits on top of the white background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2">
        <div className="flex flex-col gap-8 py-20 max-w-xl">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-primary leading-[1.05]">
            {heading}
          </h1>
          <div className="relative py-1">
            <p className="text-xl md:text-2xl font-semibold leading-snug mb-4">
              {subheading}
            </p>
            <p className="text-primary text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-opacity-90 transition-all text-sm text-center"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
      {/* 4. BOTTOM TRICOLOR STRIP */}
      <div className="absolute bottom-0 left-0 w-full h-12 flex z-20">
        <div className="w-1/3 bg-[#001750]" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-red-600" />
      </div>
    </section>
  )
}

export default HomeHero
```

## Step 3: Add the Block to the Pages Collection

In `src/collections/Pages/index.ts`, import and add the HomeHero block to the blocks array:

```typescript
// Add this import at the top with the other block imports
import { HomeHero } from '../../blocks/home/HomeHero/config'

// Then add it to the blocks array in the layout field
blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, HomeHero],
```

## Step 4: Add the Block Component to RenderBlocks

In `src/blocks/RenderBlocks.tsx`, import and add the HomeHero component:

```typescript
// Add this import at the top
import { HomeHeroBlock } from '@/blocks/home/HomeHero/Component'

// Add to the blockComponents object
const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  'home-hero': HomeHeroBlock, // Add this line
}
```

## Step 5: Update the Home Page Seed Data

Update `src/endpoints/seed/home.ts` to include the HomeHero block in the layout (change the empty layout array to include your block):

```typescript
export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      // ... existing hero config
    },
    layout: [
      {
        blockType: 'home-hero',
        heading: 'French for complete beginners',
        subheading: 'Start speaking French with calm, clear lessons that make sense from day one.',
        description: 'No pressure. No confusion. Just structured support to help you build confidence step by step.',
        ctaText: 'Book your free assessment',
        ctaUrl: 'https://goget-french.breely.com/form/12099',
      },
      // Add other blocks here as needed
    ],
    meta: {
      // ... existing meta config
    },
    title: 'Home',
  }
}
```

**Note:** The home page is now seeded in the database instead of using static fallback data. After seeding, you'll have a "home" page in your Pages collection that you can edit through the admin panel.

## Step 6: Run Type Generation

After making these changes, regenerate the TypeScript types:

```bash
npm run generate:types
```

The block is now reusable and content-editable through the Payload admin panel!</content>
<parameter name="filePath">HomeHero-Block-Instructions.md