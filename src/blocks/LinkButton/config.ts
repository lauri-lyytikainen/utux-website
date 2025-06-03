import type { Block } from 'payload'

export const LinkButton: Block = {
  slug: 'linkButton',
  fields: [
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      required: true,
      defaultValue: 'Learn More',
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
      name: 'link',
      type: 'relationship',
      relationTo: 'siteLinks',
      defaultValue: true,
      required: true,
    },
  ],
  imageURL: 'https://iili.io/3AHY0cQ.md.png',
}
