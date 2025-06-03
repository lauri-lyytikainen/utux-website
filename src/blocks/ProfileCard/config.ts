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

export const ProfileCard: Block = {
  slug: 'profileCard',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      defaultValue: 'John Doe',
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
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      required: true,
      defaultValue: 'Learn More',
      localized: true,
    },
    {
      name: 'showButton',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'siteLinks',
      label: 'Link',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.showButton,
      },
    },
    {
      name: 'picture',
      type: 'relationship',
      relationTo: 'media',
      label: 'Media',
      required: true,
    },
  ],
  //   imageURL: 'https://iili.io/3AHY1SV.md.png',
}
