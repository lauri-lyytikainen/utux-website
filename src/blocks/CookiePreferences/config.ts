import type { Block } from 'payload'

export const CookiePreferences: Block = {
  slug: 'cookiePreferences',
  fields: [
    {
      name: 'locale',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        hidden: true,
      },
      defaultValue: ({ locale }) => locale,
    },
  ],
  imageURL: 'https://iili.io/3AiB4wP.png',
}
