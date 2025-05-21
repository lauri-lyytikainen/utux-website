import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: ({ locale }) => {
        if (locale === 'fi') {
          return 'Ota yhteyttä'
        } else {
          return 'Contact Us'
        }
      },
    },
    {
      name: 'nameField',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Nimi'
            } else {
              return 'Name'
            }
          },
        },
        {
          name: 'placeholder',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Nimi'
            } else {
              return 'Name'
            }
          },
        },
        {
          name: 'ErrorShort',
          type: 'text',
          required: true,
          localized: true,
          label: 'Error when name is empty',
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Nimi ei voi olla tyhjä'
            } else {
              return 'Name cannot be empty'
            }
          },
        },
        {
          name: 'ErrorLong',
          type: 'text',
          required: true,
          localized: true,
          label: 'Error when name is too long (max is 64 chars)',
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Nimi ei voi olla yli 64 merkkiä pitkä'
            } else {
              return 'Name cannot be longer than 64 characters'
            }
          },
        },
      ],
    },
    {
      name: 'emailField',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Sähköposti'
            } else {
              return 'Email'
            }
          },
        },
        {
          name: 'placeholder',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Sähköposti'
            } else {
              return 'Email'
            }
          },
        },
        {
          name: 'ErrorInvalid',
          type: 'text',
          required: true,
          localized: true,
          label: 'Error when email is invalid',
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Epäkelpo sähköpostiosoite'
            } else {
              return 'Invalid email address'
            }
          },
        },
        {
          name: 'ErrorLong',
          type: 'text',
          required: true,
          localized: true,
          label: 'Error when email is too long (max is 256 chars)',
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Sähköpostiosoite ei voi olla yli 256 merkkiä pitkä'
            } else {
              return 'Email cannot be longer than 256 characters'
            }
          },
        },
      ],
    },
    {
      name: 'messageField',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Viesti'
            } else {
              return 'message'
            }
          },
        },
        {
          name: 'placeholder',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Kirjoita viestisi tähän'
            } else {
              return 'Write your message here'
            }
          },
        },
        {
          name: 'ErrorShort',
          type: 'text',
          required: true,
          localized: true,
          label: 'Error when message is empty',
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Viesti ei voi olla tyhjä'
            } else {
              return 'Message cannot be empty'
            }
          },
        },
        {
          name: 'ErrorLong',
          type: 'text',
          required: true,
          localized: true,
          label: 'Error when message is too long (max is 512 chars)',
          defaultValue: ({ locale }) => {
            if (locale === 'fi') {
              return 'Viesti ei voi olla yli 512 merkkiä pitkä'
            } else {
              return 'Email cannot be longer than 512 characters'
            }
          },
        },
      ],
    },
    {
      name: 'submitButtonText',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: ({ locale }) => {
        if (locale === 'fi') {
          return 'Lähetä'
        } else {
          return 'Send'
        }
      },
    },
    {
      name: 'successMessage',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: ({ locale }) => {
        if (locale === 'fi') {
          return 'Vastaamme viestiisi mahdollisimman pian!'
        } else {
          return 'We will get back to you as soon as possible'
        }
      },
    },
    {
      name: 'successTitle',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: ({ locale }) => {
        if (locale === 'fi') {
          return 'Kiitos viestistäsi!'
        } else {
          return 'Thank you for your message!'
        }
      },
    },
  ],
  //   imageURL: 'https://iili.io/3AHYVN1.md.png',
}
