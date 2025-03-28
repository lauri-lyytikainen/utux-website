import type { Block } from 'payload'
import {
  AlignFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  StrikethroughFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'

export const SimpleHero: Block = {
  slug: 'simpleHero',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
export const SuperHero: Block = {
  slug: 'superHero',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      localized: true,
      editor: lexicalEditor({
        features: () => {
          return [
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            StrikethroughFeature(),
            HeadingFeature({ enabledHeadingSizes: [] }),
            FixedToolbarFeature(),
            AlignFeature(),
          ]
        },
      }),
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      defaultValue: 'Get Started',
      localized: true,
    },
    {
      name: 'buttonLink',
      type: 'relationship',
      relationTo: 'pages',
    },
  ],
}
