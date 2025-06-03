import type { Block } from 'payload'
import {
  AlignFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
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
      defaultValue: 'Hero title',
    },
  ],
  imageURL: 'https://iili.io/3AHYaPj.md.png',
}
export const SuperHero: Block = {
  slug: 'superHero',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Hero title',
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
            LinkFeature(),
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
      label: 'Button Text',
      required: true,
      defaultValue: 'Get Started',
      localized: true,
    },
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'siteLinks',
      label: 'Link',
      required: true,
    },
  ],
  imageURL: 'https://iili.io/3AHYlKx.md.png',
}
