import type { Metadata } from 'next'

import type { Media, Page, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  // TODO: Replace this with a default image
  let url = serverUrl + '/media/utux-og.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = (ogUrl as string) || (image.url as string)
  }

  return url
}

export const generateMeta = async (args: { doc: Partial<Page> | null }): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc?.meta?.title + ' | UTUX.fi' : 'UTUX.fi'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: doc?.breadcrumbs
        ? (process.env.NEXT_PUBLIC_SERVER_URL || '') + doc?.breadcrumbs?.at(-1)?.url
        : process.env.NEXT_PUBLIC_SERVER_URL || '/',
    }),
    title,
  }
}
