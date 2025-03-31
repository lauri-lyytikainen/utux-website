import { CookieManagerWrapper } from './CookieManager'
import { ThemeProvider } from 'next-themes'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { CookieTranslation } from '@/payload-types'

// Main Providers component
export async function Providers({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: 'fi' | 'en'
}) {
  const cookieText = await getCachedGlobal('cookieTranslation', lang, 2)()
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      <CookieManagerWrapper props={cookieText as CookieTranslation}>
        {children}
      </CookieManagerWrapper>
    </ThemeProvider>
  )
}
