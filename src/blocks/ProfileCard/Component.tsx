import { SiteLinkComponent } from '@/components/Link/SiteLink'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Media, ProfileCard, SiteLink } from '@/payload-types'
import jsxConverters from '@/utilities/richTextConverter'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

export function ProfileCardComponent({
  name,
  description,
  picture,
  buttonText,
  showButton,
  link,
}: ProfileCard) {
  const image = (picture as Media).sizes?.square
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-stretch">
            <div className="w-1/2 sm:w-1/3">
              {image && (
                <div className="relative w-full aspect-square">
                  <Image
                    src={image?.url as string}
                    alt={(picture as Media).alt as string}
                    className="rounded-full object-cover"
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                  />
                </div>
              )}
            </div>
            <div className="w-full h-auto flex flex-col justify-between gap-4">
              <div className="h-full gap-4 flex flex-col">
                <h2>{name}</h2>
                <Separator />
                {description && <RichText data={description} converters={jsxConverters} />}
              </div>
              {showButton && (
                <Button asChild>
                  <SiteLinkComponent linkObject={link as SiteLink} text={buttonText} />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
