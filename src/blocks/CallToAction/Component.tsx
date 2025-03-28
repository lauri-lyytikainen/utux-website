import { Button } from '@/components/ui/button'
import { CallToAction, Media, Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

export function CallToActionBlock({
  description,
  buttonLink,
  image,
  title,
  buttonText,
  invertLayout,
  buttonLinkExternal,
  useInternalLink,
}: CallToAction) {
  const img = (image as Media).sizes?.og
  const link = useInternalLink
    ? (((buttonLink as Page)?.breadcrumbs?.at(-1)?.url as string) ?? '/')
    : (buttonLinkExternal ?? '/')
  return (
    <div
      className={`max-w-[1024px] mx-auto p-4 flex flex-col ${invertLayout ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}
    >
      <div className="flex flex-col min-w-1/2  justify-between  p-2">
        <div className="flex flex-col h-full justify-between">
          <h2>{title}</h2>
          {description && <RichText data={description} />}
          <Button asChild>
            <Link href={link}>{buttonText}</Link>
          </Button>
        </div>
      </div>
      <div className="overflow-hidden h-full relative justify-center flex flex-col p-2">
        <Image
          className="object-cover h-full w-full"
          src={img?.url as string}
          width={img?.width as number}
          height={img?.height as number}
          alt={(image as Media).alt}
        />
      </div>
    </div>
  )
}
