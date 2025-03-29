'use client'
import { useEffect } from 'react'
import { useCookieConsent } from 'react-cookie-manager'

export function CookieService() {
  const { detailedConsent } = useCookieConsent()

  useEffect(() => {
    if (detailedConsent?.Analytics.consented) {
      mountScripts()
    } else {
      unmountScripts()
      deleteAllCookies()
    }
  }, [detailedConsent])

  function mountScripts() {}

  function unmountScripts() {}

  function deleteAllCookies() {}

  return <></>
}
