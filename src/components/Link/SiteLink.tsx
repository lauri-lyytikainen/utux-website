import React from 'react'
import Link from 'next/link'
import type { SiteLink, Page } from '@/payload-types'

export const SiteLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  {
    linkObject: SiteLink
    text: string
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(function SiteLinkComponent({ linkObject: link, text, ...props }, ref) {
  const sLink = link as SiteLink
  const url = sLink.useExternalLink
    ? ((sLink.externalLink as string) ?? '')
    : ((sLink.page as Page)?.breadcrumbs?.at(-1)?.url ?? '') +
      ((sLink.blockAnchorName as string) ? `#${sLink.blockAnchorName as string}` : '')

  return (
    <Link
      href={url}
      target={link.openInNewTab ? '_blank' : undefined}
      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
      ref={ref}
      {...props}
    >
      {text}
    </Link>
  )
})
