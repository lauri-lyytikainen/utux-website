import { SiteLinkComponent } from '@/components/Link/SiteLink'
import { Button } from '@/components/ui/button'
import { CallToAction, Media, SiteLink } from '@/payload-types'
import jsxConverters from '@/utilities/richTextConverter'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

export function CallToActionBlock({
  description,
  image,
  title,
  buttonText,
  invertLayout,
  link,
  showButton,
}: CallToAction) {
  const img = (image as Media).sizes?.small

  return (
    <div
      className={`max-w-[1024px] mx-auto p-4 flex flex-col ${invertLayout ? 'sm:flex-row-reverse' : 'sm:flex-row'} gap-4`}
    >
      <div className="flex flex-col min-w-1/2">
        <div className="flex flex-col h-full sm:justify-between gap-4">
          <h2>{title}</h2>
          <div className="overflow-hidden h-full relative justify-center flex flex-col rounded-[var(--radius)] sm:hidden">
            <div className="relative aspect-video">
              <Image
                className="object-cover"
                src={(img?.url as string) ?? '/'}
                priority={true}
                loading="eager"
                alt={(image as Media).alt}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
            </div>
          </div>
          {description && <RichText data={description} converters={jsxConverters} />}
          {showButton && (
            <Button asChild>
              <SiteLinkComponent linkObject={link as SiteLink} text={buttonText} />
            </Button>
          )}
        </div>
      </div>
      <div className="overflow-hidden h-full relative justify-center sm:flex flex-col hidden min-w-1/2 p-4">
        <div className="relative aspect-video">
          <Image
            className="object-cover rounded-[var(--radius)]"
            src={(img?.url as string) ?? '/'}
            priority={true}
            loading="eager"
            alt={(image as Media).alt}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
          />
        </div>
      </div>
    </div>
  )
}
