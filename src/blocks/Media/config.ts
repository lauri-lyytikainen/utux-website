import type { Block } from 'payload'

export const PageMedia: Block = {
  slug: 'pageMedia',
  fields: [
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      label: 'Media',
    },
  ],
}
