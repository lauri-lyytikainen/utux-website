import { CookieManagerWrapper } from './CookieManager'
import { ThemeProvider } from 'next-themes'

// Main Providers component
export function Providers({ children, lang }: { children: React.ReactNode; lang: 'fi' | 'en' }) {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      <CookieManagerWrapper lang={lang}>{children}</CookieManagerWrapper>
    </ThemeProvider>
  )
}
