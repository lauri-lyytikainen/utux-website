import type { CollectionConfig } from 'payload'

export const File: CollectionConfig = {
  slug: 'file',
  labels: {
    singular: 'File',
    plural: 'Files',
  },
  access: {
    read: () => true,
  },
  fields: [],
  upload: {
    disableLocalStorage: true,
  },
}
