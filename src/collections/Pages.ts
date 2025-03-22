import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CallToAction } from '@/blocks/CallToAction/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'updatedAt'],
  },
  fields: [
    {
      type: 'text',
      name: 'path',
      label: 'Path',
      required: true,
      unique: true,
      admin: {
        description: "The URL path of the page, eg: 'about' would result in '/about'",
      },
      // @ts-ignore
      validate: (value: string) => {
        const allowedChars = /^[a-z0-9-]+$/i
        if (!value) {
          return 'Path is required'
        }
        if (!allowedChars.test(value)) {
          return 'Path must only contain alphanumeric characters and dashes'
        }
        if (value !== value.toLowerCase()) {
          return 'Path must be in lowercase'
        }
        return true
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Title',
              required: true,
              localized: true,
              defaultValue: 'New Page',
            },
            {
              type: 'blocks',
              name: 'blocks',
              label: 'Blocks',
              blocks: [CallToAction],
            },
            {
              type: 'richText',
              name: 'content',
              label: 'Content',
              localized: true,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
