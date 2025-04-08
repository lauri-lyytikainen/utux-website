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

export const Accordion: Block = {
  slug: 'accordion',
  fields: [
    {
      name: 'accordions',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Accordion Title',
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
          localized: true,
          editor: lexicalEditor({
            features: () => [
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              StrikethroughFeature(),
              LinkFeature(),
              FixedToolbarFeature(),
              AlignFeature(),
              HeadingFeature({
                enabledHeadingSizes: ['h2', 'h3', 'h4'],
              }),
            ],
          }),
        },
      ],
    },
  ],
}
