'use client'

import { CookiePreferences } from '@/payload-types'
import { useCookieConsent } from 'react-cookie-manager'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function CookiePreferencesComponent({
  essentialTitle,
  essentialDescription,
  analyticsTitle,
  analyticsDescription,
  socialTitle,
  socialDescription,
  advertisingTitle,
  advertisingDescription,
  buttonText,
  consentText,
  declineText,
}: CookiePreferences) {
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

  return (
    <div className="max-w-[1024px] mx-auto p-4 flex flex-col gap-4">
      <div className="flex justify-between flex-col sm:flex-row">
        <div>
          <h2>{essentialTitle}</h2>
          <p className="text-muted-foreground">{essentialDescription}</p>
        </div>
        <div>
          <p className="font-bold">{consentText}</p>
          <p className="text-muted-foreground">{consentDate}</p>
        </div>
      </div>
      <div className="flex justify-between flex-col sm:flex-row">
        <div>
          <h2>{analyticsTitle}</h2>
          <p className="text-muted-foreground">{analyticsDescription}</p>
        </div>
        <div>
          <p className="font-bold">
            {detailedConsent?.Analytics.consented ? consentText : declineText}
          </p>
          <p className="text-muted-foreground">{consentDate}</p>
        </div>
      </div>
      <div className="flex justify-between flex-col sm:flex-row">
        <div>
          <h2>{socialTitle}</h2>
          <p className="text-muted-foreground">{socialDescription}</p>
        </div>
        <div>
          <p className="font-bold">
            {detailedConsent?.Social.consented ? consentText : declineText}
          </p>
          <p className="text-muted-foreground">{consentDate}</p>
        </div>
      </div>
      <div className="flex justify-between flex-col sm:flex-row">
        <div>
          <h2>{advertisingTitle}</h2>
          <p className="text-muted-foreground">{advertisingDescription}</p>
        </div>
        <div>
          <p className="font-bold">
            {detailedConsent?.Advertising.consented ? consentText : declineText}
          </p>
          <p className="text-muted-foreground">{consentDate}</p>
        </div>
      </div>
      <Button onClick={showConsentBanner}>{buttonText}</Button>
    </div>
  )
}
