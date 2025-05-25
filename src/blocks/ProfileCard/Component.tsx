import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Media, ProfileCard, Page } from '@/payload-types'
import jsxConverters from '@/utilities/richTextConverter'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

export function ProfileCardComponent({
  name,
  description,
  picture,
  buttonText,
  buttonLink,
  buttonLinkExternal,
  useInternalLink,
  showButton,
}: ProfileCard) {
  const image = (picture as Media).sizes?.square
  const link = useInternalLink
    ? (((buttonLink as Page)?.breadcrumbs?.at(-1)?.url as string) ?? '/')
    : (buttonLinkExternal ?? '/')
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-stretch">
            <div className="w-1/2 sm:w-1/3">
              {image && (
                <Image
                  src={image?.url as string}
                  width={image?.width as number}
                  height={image?.height as number}
                  alt={(picture as Media).alt as string}
                  className="rounded-full"
                />
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
                  <Link href={link}>{buttonText}</Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
