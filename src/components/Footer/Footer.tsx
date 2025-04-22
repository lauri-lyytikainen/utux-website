import { FooterClient } from './FooterClient'
import { getCachedGlobal } from '@/utilities/getGlobals'

import type { Footer } from '@/payload-types'

export async function Footer({ locale }: { locale: 'fi' | 'en' }) {
  const footerData = await getCachedGlobal('footer', locale, 2)()
  return <FooterClient footerData={footerData as Footer} />
}
