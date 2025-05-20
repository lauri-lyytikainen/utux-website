'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { CookieService } from './CookieService'
import { CookieTranslation, Page } from '@/payload-types'

const CookieManager = dynamic(
  () => import('react-cookie-manager').then((mod) => mod.CookieManager),
  { ssr: true, loading: () => null },
)

// Create a wrapper component for CookieManager
export function CookieManagerWrapper({
  children,
  props,
}: {
  children: React.ReactNode
  props: CookieTranslation
}) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme() // Use resolvedTheme instead of theme

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CookieManager
      showManageButton={true}
      translations={{
        ...props.popup,
        ...props.manageConsentModal,
        ...props.sections.essential,
        ...props.sections.analytics,
        ...props.sections.social,
        ...props.sections.advertising,
      }}
      privacyPolicyUrl={(props.popup.privacyPolicyLink as Page)?.breadcrumbs?.at(-1)?.url ?? '/'}
      displayType="banner"
      theme={mounted ? (theme as 'light' | 'dark') : 'light'}
      cookieExpiration={365}
      initialPreferences={{ Advertising: true, Analytics: true, Social: true }}
      classNames={{
        acceptButton: 'accept-button',
        manageButton: 'manage-button',
        declineButton: 'decline-button',
        manageCancelButton: 'manage-cancel-button',
        manageSaveButton: 'manage-save-button',
      }}
      disableAutomaticBlocking={true}
    >
      <CookieService />
      {children}
    </CookieManager>
  )
}
