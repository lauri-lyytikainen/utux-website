import { Page } from '@/payload-types'
import { Block } from 'payload'
import { CallToActionBlock } from './CallToAction/Component'
import React from 'react'
import { TextBlock } from './Text/Component'
import { SimpleHeroComponent, SuperHeroComponent } from './HeroSection/Component'

const blockComponents: Record<Block['slug'], React.ComponentType<any>> = {
  callToAction: CallToActionBlock,
  text: TextBlock,
  simpleHero: SimpleHeroComponent,
  superHero: SuperHeroComponent,
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
                <React.Fragment key={index}>
                  <Block {...block} />
                </React.Fragment>
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
