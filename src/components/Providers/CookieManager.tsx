'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { CookieService } from './CookieService'

const CookieManager = dynamic(
  () => import('react-cookie-manager').then((mod) => mod.CookieManager),
  { ssr: false, loading: () => null },
)

// Create a wrapper component for CookieManager
export function CookieManagerWrapper({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: 'fi' | 'en'
}) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme() // Use resolvedTheme instead of theme

  useEffect(() => {
    setMounted(true)
  }, [])

  const enText = {
    title: 'Cookie Preferences',
    message: 'We use cookies to improve your experience.',
  }

  const fiText = {
    title: 'Evästeet',
    message: 'We use cookies to improve your experience.',
  }

  return (
    <CookieManager
      showManageButton={true}
      translations={lang === 'en' ? enText : fiText}
      displayType="banner"
      theme={mounted ? (theme as 'light' | 'dark') : 'light'}
    >
      <CookieService />
      {children}
    </CookieManager>
  )
}
