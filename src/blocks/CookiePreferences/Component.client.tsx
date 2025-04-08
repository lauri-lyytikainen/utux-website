'use client'

import { CookieTranslation } from '@/payload-types'
import { useCookieConsent } from 'react-cookie-manager'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ShieldCheck, ShieldX } from 'lucide-react'

export function CookiePreferencesClient({ props }: { props: CookieTranslation }) {
  const { detailedConsent, showConsentBanner } = useCookieConsent()
  const [consentDate, setConsentDate] = useState('-')

  useEffect(() => {
    setConsentDate(
      detailedConsent?.Advertising?.timestamp
        ? new Date(detailedConsent.Advertising.timestamp).toLocaleString('en-FI', {
            timeStyle: 'short',
            dateStyle: 'short',
          })
        : '-',
    )
  }, [detailedConsent])

  function accept() {
    return (
      <div className="flex items-center sm:items-start gap-2">
        <ShieldCheck className="text-primary" />
        <div className="flex flex-col">
          <p className="font-bold">{props.manageConsentModal.manageCookiesStatusConsented}</p>
          <p className="text-muted-foreground">{consentDate}</p>
        </div>
      </div>
    )
  }
  function decline() {
    return (
      <div className="flex items-center sm:items-start gap-2 min-w-40">
        <ShieldX className="text-destructive" />
        <div className="flex flex-col">
          <p className="font-bold">{props.manageConsentModal.manageCookiesStatusDeclined}</p>
          <p className="text-muted-foreground">{consentDate}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1024px] mx-auto p-4 flex flex-col gap-8">
      <h2>{props.manageConsentModal.manageTitle}</h2>
      <div className="flex sm:justify-between flex-col sm:flex-row gap-2">
        <div className="min-w-[300px] flex-shrink-0 max-w-full sm:max-w-[60%]">
          <h3>{props.sections.essential.manageEssentialTitle}</h3>
          <p className="text-muted-foreground">
            {props.sections.essential.manageEssentialSubtitle}
          </p>
        </div>
        {accept()}
      </div>
      <div className="flex sm:justify-between flex-col sm:flex-row gap-2">
        <div className="min-w-[300px] flex-shrink-0 max-w-full sm:max-w-[60%]">
          <h3>{props.sections.analytics.manageAnalyticsTitle}</h3>
          <p className="text-muted-foreground">
            {props.sections.analytics.manageAnalyticsSubtitle}
          </p>
        </div>
        {detailedConsent?.Analytics.consented ? accept() : decline()}
      </div>
      <div className="flex sm:justify-between flex-col sm:flex-row gap-2">
        <div className="min-w-[300px] flex-shrink-0 max-w-full sm:max-w-[60%]">
          <h3>{props.sections.social.manageSocialTitle}</h3>
          <p className="text-muted-foreground">{props.sections.social.manageSocialSubtitle}</p>
        </div>
        {detailedConsent?.Social.consented ? accept() : decline()}
      </div>
      <div className="flex sm:justify-between flex-col sm:flex-row gap-2">
        <div className="min-w-[300px] flex-shrink-0 max-w-full sm:max-w-[60%]">
          <h3>{props.sections.advertising.manageAdvertTitle}</h3>
          <p className="text-muted-foreground">{props.sections.advertising.manageAdvertSubtitle}</p>
        </div>
        {detailedConsent?.Advertising.consented ? accept() : decline()}
      </div>
      <Button onClick={showConsentBanner}>{props.popup.manageButtonText}</Button>
    </div>
  )
}
