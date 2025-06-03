import { CookiePreferencesClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { CookiePreferences, CookieTranslation } from '@/payload-types'

export async function CookiePreferencesComponent({ locale }: CookiePreferences) {
  const cookieText = await getCachedGlobal('cookieTranslation', locale as 'fi' | 'en', 2)()
  return <CookiePreferencesClient props={cookieText as CookieTranslation} />
}
