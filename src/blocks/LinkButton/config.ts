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
      name: 'useInternalLink',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'buttonLink',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Link to page',
      admin: {
        condition: (_, siblingData) => siblingData.useInternalLink,
      },
    },
    {
      name: 'buttonLinkExternal',
      type: 'text',
      label: 'Link to an external page',
      admin: {
        condition: (_, siblingData) => !siblingData.useInternalLink,
        description: 'External url address must include the protocol eg. https:// or http:// ',
      },
      validate: (value: any) => {
        if (!value.startsWith('https://')) {
          return 'External url address must include the protocol eg. https:// or http:// '
        }
        return true
      },
    },
  ],
  imageURL: 'https://iili.io/3AHY0cQ.md.png',
}
