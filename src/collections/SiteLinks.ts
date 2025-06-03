import type { CollectionConfig } from 'payload'

export const SiteLinks: CollectionConfig = {
  slug: 'siteLinks',
  labels: {
    singular: 'SiteLink',
    plural: 'SiteLinks',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'page', 'externalLink', 'blockAnchorName'],
    description: 'Links to pages or external URLs.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Link Name',
      required: true,
      defaultValue: 'Link',
    },
    {
      name: 'useExternalLink',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Link to page',
      required: true,
      admin: {
        condition: (_, siblingData) => !siblingData.useExternalLink,
      },
    },
    {
      name: 'blockAnchorName',
      type: 'text',
      label: 'Block Anchor Name',
      admin: {
        condition: (_, siblingData) => !siblingData.useExternalLink,
        description:
          'Optional anchor name for linking to a specific block on the page. E.g. "contact-form", this would auto scroll to the block with the id "contact-form" on the page.',
      },
    },
    {
      name: 'externalLink',
      type: 'text',
      label: 'Link to an external page',
      admin: {
        condition: (_, siblingData) => siblingData.useExternalLink,
        description: 'External url address must include the protocol eg. https:// or http:// ',
      },
      validate: (value: any) => {
        if (!value.startsWith('https://')) {
          return 'External url address must include the protocol eg. https:// or http:// '
        }
        return true
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      label: 'Open in new tab',
      defaultValue: false,
    },
  ],
}
