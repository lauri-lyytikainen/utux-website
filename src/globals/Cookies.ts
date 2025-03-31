import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

export const CookieTranslation: GlobalConfig = {
  slug: 'cookieTranslation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'popup',
      type: 'group',
      admin: {
        description: 'The cookie preferences dialog.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Cookie Preferences',
          admin: {
            description: 'The title of the cookie preferences dialog',
          },
        },
        {
          name: 'message',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'This website uses cookies to enhance your experience',
          admin: {
            description: 'The message displayed in the cookie preferences dialog',
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Accept',
          admin: {
            description: 'The text displayed on the accept button',
          },
        },
        {
          name: 'declineButtonText',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Decline',
          admin: {
            description: 'The text displayed on the decline button',
          },
        },
        {
          name: 'manageButtonText',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Manage Cookies',
          admin: {
            description: 'The text displayed on the manage cookies button',
          },
        },
        {
          name: 'privacyPolicyText',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Privacy Policy',
          admin: {
            description: 'The text displayed on the privacy policy link',
          },
        },
        {
          name: 'privacyPolicyLink',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            description: 'The privacy policy page',
          },
        },
      ],
    },
    {
      name: 'manageConsentModal',
      type: 'group',
      admin: {
        description: 'The cookie consent management dialog',
      },
      fields: [
        {
          name: 'manageTitle',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Manage Cookie Preferences',
          admin: {
            description: 'The title of the cookie consent management dialog',
          },
        },
        {
          name: 'manageMessage',
          type: 'text',
          required: true,
          localized: true,
          defaultValue:
            'Manage your cookie preferences below. Essential cookies are always enabled as they are necessary for the website to function properly.',
          admin: {
            description: 'The message displayed in the cookie consent management dialog',
          },
        },
        {
          name: 'manageCookiesStatus',
          type: 'text',
          localized: true,
          required: true,
          defaultValue: 'Status: {{status}} on {{date}}',
          admin: {
            description:
              'The status of the cookie consent management dialog, you can use the following placeholders: {{status}} and {{date}}',
          },
        },
        {
          name: 'manageCookiesStatusConsented',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Consented',
          admin: {
            description:
              'The status of the cookie consent management dialog when the user has consented',
          },
        },
        {
          name: 'manageCookiesStatusDeclined',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Declined',
          admin: {
            description:
              'The status of the cookie consent management dialog when the user has declined',
          },
        },
        {
          name: 'manageCancelButtonText',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Cancel',
          admin: {
            description: 'The text displayed on the cancel button',
          },
        },
        {
          name: 'manageSaveButtonText',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Save Preferences',
          admin: {
            description: 'The text displayed on the save button',
          },
        },
      ],
    },
    {
      name: 'sections',
      type: 'group',
      admin: {
        description: 'The cookie consent management sections',
      },
      fields: [
        {
          name: 'essential',
          type: 'group',
          fields: [
            {
              name: 'manageEssentialTitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Essential',
              admin: {
                description: 'The title of the essential cookie consent management section',
              },
            },
            {
              name: 'manageEssentialSubtitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Required for the website to function properly',
              admin: {
                description: 'The description of the essential cookies',
              },
            },
            {
              name: 'manageEssentialStatus',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Status: Always enabled',
              admin: {
                description: 'The status of the essential cookies',
              },
            },
            {
              name: 'manageEssentialStatusButtonText',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Always On',
              admin: {
                description: 'The text displayed on the always on button',
              },
            },
          ],
        },
        {
          name: 'analytics',
          type: 'group',
          fields: [
            {
              name: 'manageAnalyticsTitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Analytics',
              admin: {
                description: 'The title of the analytics cookie consent management section',
              },
            },
            {
              name: 'manageAnalyticsSubtitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Help us understand how visitors interact with our website',
              admin: {
                description: 'The description of the analytics cookies',
              },
            },
          ],
        },
        {
          name: 'social',
          type: 'group',
          fields: [
            {
              name: 'manageSocialTitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Social',
              admin: {
                description: 'The title of the social cookie consent management section',
              },
            },
            {
              name: 'manageSocialSubtitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Enable social media features and sharing',
              admin: {
                description: 'The description of the social cookies',
              },
            },
          ],
        },
        {
          name: 'advertising',
          type: 'group',
          fields: [
            {
              name: 'manageAdvertTitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Advertising',
              admin: {
                description: 'The title of the advertising cookie consent management section',
              },
            },
            {
              name: 'manageAdvertSubtitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Personalize advertisements and measure their performance',
              admin: {
                description: 'The description of the advertising cookies',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('global_cookieTranslation')
      },
    ],
  },
}
