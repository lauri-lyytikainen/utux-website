import { Page } from '@/payload-types'
import { Block } from 'payload'
import { CallToActionBlock } from './CallToAction/Component'
import React from 'react'
import { TextBlock } from './Text/Component'
import { SimpleHeroComponent, SuperHeroComponent } from './HeroSection/Component'
import { MediaComponent } from './Media/Component'
import { LinkButtonComponent } from './LinkButton/Component'
import { CookiePreferencesComponent } from './CookiePreferences/Component'
import { ContactFormComponent } from './ContactForm/Component'
import { AccordionComponent } from './Accordion/Component'
import { ProfileCardComponent } from './ProfileCard/Component'
import { ImageCarouselComponent } from './ImageCarousel/Component'
import { FileButtonComponent } from './FileButton/Component'

const blockComponents: Record<Block['slug'], React.ComponentType<any>> = {
  callToAction: CallToActionBlock,
  text: TextBlock,
  simpleHero: SimpleHeroComponent,
  superHero: SuperHeroComponent,
  pageMedia: MediaComponent,
  linkButton: LinkButtonComponent,
  cookiePreferences: CookiePreferencesComponent,
  contactForm: ContactFormComponent,
  accordion: AccordionComponent,
  profileCard: ProfileCardComponent,
  imageCarousel: ImageCarouselComponent,
  fileButton: FileButtonComponent,
}

export function RenderBlocks(props: { blocks: Page['blocks'] }) {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            if (Block) {
              return (
                <div key={index} className="sm:mb-18 mb-8">
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </>
    )
  }

  return null
}
