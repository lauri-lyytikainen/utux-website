import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],

  upload: {
    disableLocalStorage: true,
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        withoutEnlargement: true,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        withoutEnlargement: true,
      },
      {
        name: 'small',
        width: 600,
        withoutEnlargement: true,
      },
      {
        name: 'large',
        width: 1400,
        withoutEnlargement: true,
      },
      {
        name: 'wide',
        width: 1920,
        height: 500,
        withoutEnlargement: false,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        withoutEnlargement: true,
      },
    ],
  },
}
