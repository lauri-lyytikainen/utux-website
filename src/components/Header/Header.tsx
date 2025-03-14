import { HeaderClient } from './HeaderClient'
import { getCachedGlobal } from '@/utilities/getGlobals'

import type { Header } from '@/payload-types'

export async function Header({ locale }: { locale: 'fi' | 'en' }) {
  const headerData: Header = await getCachedGlobal('header', locale, 2)()
  return <HeaderClient headerData={headerData} />
}
