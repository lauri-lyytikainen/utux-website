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
      name: 'useInternalLink',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => siblingData.showButton,
      },
    },
    {
      name: 'buttonLink',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Link to page',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.useInternalLink && siblingData.showButton,
      },
    },
    {
      name: 'buttonLinkExternal',
      type: 'text',
      label: 'Link to an external page',
      admin: {
        condition: (_, siblingData) => !siblingData.useInternalLink && siblingData.showButton,
        description: 'External url address must include the protocol eg. https:// or http:// ',
      },
      validate: (value: any) => {
        if (!value.startsWith('https://')) {
          return 'External url address must include the protocol eg. https:// or http:// '
        }
        return true
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
