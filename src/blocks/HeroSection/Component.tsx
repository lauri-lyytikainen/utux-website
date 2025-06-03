import { Button } from '@/components/ui/button'
import { Media, SimpleHero, SuperHero, Page, SiteLink } from '@/payload-types'
import jsxConverters from '@/utilities/richTextConverter'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

export function SimpleHeroComponent({ title }: SimpleHero) {
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <h1>{title}</h1>
    </div>
  )
}
export function SuperHeroComponent({ title, image, buttonText, description, link }: SuperHero) {
  const img = (image as Media).sizes?.wide
  const siteLink = link as SiteLink
  console.log('siteLink', siteLink)
  const url = (link as SiteLink).useExternalLink
    ? ((siteLink.externalLink as string) ?? '')
    : ((siteLink.page as Page)?.breadcrumbs?.at(-1)?.url ?? '') +
      ((siteLink.blockAnchorName as string) ? `#${siteLink.blockAnchorName as string}` : '')
  return (
    <div className="relative h-[calc(100vh-7rem)] max-h-[1000px] overflow-x-hidden">
      <Image
        src={img?.url as string}
        alt={(image as Media).alt}
        width={img?.width as number}
        height={img?.height as number}
        className="w-full h-full object-cover"
        priority
      />
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background to-background/20"></div>
      <div className="absolute inset-0 flex flex-col p-4 max-w-[1024px] mx-auto">
        <div className="w-full h-1/2 flex flex-col justify-center gap-8 grow">
          <h1>{title}</h1>
          {description && <RichText data={description} converters={jsxConverters} />}
        </div>
        <Button asChild className="sm:self-start sm:min-w-1/2" size={'lg'}>
          <Link href={url}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  )
}
