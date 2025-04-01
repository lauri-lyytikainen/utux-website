// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { migrations } from './migrations'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { CallToAction } from './blocks/CallToAction/config'
import { Text } from './blocks/Text/config'
import { SimpleHero, SuperHero } from './blocks/HeroSection/config'
import { PageMedia } from './blocks/Media/config'
import { LinkButton } from './blocks/LinkButton/config'
import { CookiePreferences } from './blocks/CookiePreferences/config'
import { CookieTranslation } from './globals/Cookies'
import { ContactForm } from './blocks/ContactForm/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL ?? ''],
  cors: [process.env.NEXT_PUBLIC_SERVER_URL ?? ''],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: ['en', 'fi'],
    defaultLocale: 'fi',
  },
  collections: [Users, Media, Pages],
  globals: [Header, Footer, CookieTranslation],
  blocks: [
    CallToAction,
    Text,
    SimpleHero,
    SuperHero,
    PageMedia,
    LinkButton,
    CookiePreferences,
    ContactForm,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title}`,
      generateDescription: ({ doc }) => doc.description,
    }),
    nestedDocsPlugin({
      collections: ['pages'],
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.path}`, ''),
    }),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
})
