import type { Block } from 'payload'
import {
  AlignFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'

export const Text: Block = {
  slug: 'text',
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: () => {
          return [
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            AlignFeature(),
            HorizontalRuleFeature(),
            FixedToolbarFeature(),
            LinkFeature(),
          ]
        },
      }),
      localized: true,
    },
  ],
  imageURL: 'https://iili.io/3AHYMAP.md.png',
}
