import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
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
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('global_header')
      },
    ],
  },
}
