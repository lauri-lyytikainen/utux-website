import type { Block } from 'payload'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  StrikethroughFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'

export const CallToAction: Block = {
  slug: 'callToAction',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Call to Action',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: () => {
          return [
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            StrikethroughFeature(),
            HeadingFeature({ enabledHeadingSizes: [] }),
            FixedToolbarFeature(),
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'invertLayout',
      type: 'checkbox',
      label: 'Invert Layout',
      defaultValue: false,
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
