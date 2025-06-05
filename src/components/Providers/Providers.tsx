'use client'

import { CookieManagerWrapper } from './CookieManager'
import { ThemeProvider } from 'next-themes'
import type { CookieTranslation } from '@/payload-types'

// Main Providers component
export function Providers({
  children,
  lang,
  cookieText,
}: {
  children: React.ReactNode
  lang: 'fi' | 'en'
  cookieText: CookieTranslation
}) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <CookieManagerWrapper props={cookieText}>{children}</CookieManagerWrapper>
    </ThemeProvider>
  )
}
