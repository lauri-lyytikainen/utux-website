import type { Block } from 'payload'

export const FileButton: Block = {
  slug: 'fileButton',
  fields: [
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      required: true,
      defaultValue: 'Download File',
      localized: true,
    },
    {
      name: 'fullWidth',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'If checked, the button will be full width of the page, otherwise left aligned',
      },
    },
    {
      name: 'file',
      type: 'relationship',
      relationTo: 'file',
      label: 'File',
      required: true,
    },
  ],
  //   imageURL: 'https://iili.io/3AHY0cQ.md.png',
}
