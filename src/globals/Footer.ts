import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'linkGroups',
      type: 'array',
      labels: {
        singular: 'Link Group',
        plural: 'Link Groups',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          localized: true,
          defaultValue: 'New Group',
        },
        {
          name: 'links',
          type: 'array',
          labels: {
            singular: 'Link',
            plural: 'Links',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Text',
              required: true,
              localized: true,
              defaultValue: 'New Link',
            },
            {
              name: 'linkedPage',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              hasMany: false,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('global_footer')
      },
    ],
  },
}
