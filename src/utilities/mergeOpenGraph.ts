import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'UTUX.fi - UX solutions for you and your business',
  images: [
    {
      url: `${getServerSideURL()}/media/utux-og.webp`,
    },
  ],
  siteName: 'UTUX.fi',
  title: 'UTUX.fi - UX solutions for you and your business',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
