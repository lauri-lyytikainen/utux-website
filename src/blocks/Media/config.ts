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
  imageURL: 'https://iili.io/3AHY1SV.md.png',
}
