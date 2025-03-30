import { Button } from '@/components/ui/button'
import { Media, SimpleHero, SuperHero, Page } from '@/payload-types'
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
export function SuperHeroComponent({
  title,
  image,
  buttonText,
  buttonLink,
  description,
  useInternalLink,
  buttonLinkExternal,
}: SuperHero) {
  const img = (image as Media).sizes?.wide
  const link = useInternalLink
    ? (((buttonLink as Page)?.breadcrumbs?.at(-1)?.url as string) ?? '/')
    : (buttonLinkExternal ?? '/')
  return (
    <div className="relative h-[500px]  overflow-x-hidden">
      <Image
        src={img?.url as string}
        alt={(image as Media).alt}
        width={img?.width as number}
        height={img?.height as number}
        className="w-full h-full object-cover"
        priority
      />
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background to-background/20"></div>
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="max-w-[1024px] w-full h-1/2 p-4 flex flex-col justify-between">
          <h1>{title}</h1>
          {description && <RichText data={description} />}
          <Button asChild className="sm:self-start" size={'lg'}>
            <Link href={link}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
