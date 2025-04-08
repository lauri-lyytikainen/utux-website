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
      name: 'useInternalLink',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'buttonLink',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Link to page',
      admin: {
        condition: (_, siblingData) => siblingData.useInternalLink,
      },
    },
    {
      name: 'buttonLinkExternal',
      type: 'text',
      label: 'Link to an external page',
      admin: {
        condition: (_, siblingData) => !siblingData.useInternalLink,
        description: 'External url address must include the protocol eg. https:// or http:// ',
      },
      validate: (value: any) => {
        if (!value.startsWith('https://')) {
          return 'External url address must include the protocol eg. https:// or http:// '
        }
        return true
      },
    },
  ],
  imageURL: 'https://iili.io/3AHYlKx.md.png',
}
