import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Media, ProfileCard } from '@/payload-types'
import jsxConverters from '@/utilities/richTextConverter'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

export function ProfileCardComponent({ name, description, picture }: ProfileCard) {
  const image = (picture as Media).sizes?.square
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
              <Button>Button</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
