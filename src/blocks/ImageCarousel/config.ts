import type { Block } from 'payload'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  StrikethroughFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'

export const ImageCarousel: Block = {
  slug: 'imageCarousel',
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Carousel',
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
                LinkFeature(),
              ]
            },
          }),
          localized: true,
        },
        {
          name: 'footer',
          type: 'richText',
          label: 'Footer',
          editor: lexicalEditor({
            features: () => {
              return [
                BoldFeature(),
                ItalicFeature(),
                UnderlineFeature(),
                StrikethroughFeature(),
                HeadingFeature({ enabledHeadingSizes: [] }),
                FixedToolbarFeature(),
                LinkFeature(),
              ]
            },
          }),
          localized: true,
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Image Carousels',
    singular: 'Image Carousel',
  },
  //   imageURL: 'https://iili.io/3AHYVN1.md.png',
}
