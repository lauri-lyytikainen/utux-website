import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ImageCarousel, Media, Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import jsxConverters from '@/utilities/richTextConverter'
import Link from 'next/link'
import Image from 'next/image'

export function ImageCarouselComponent({ slides }: ImageCarousel) {
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <Carousel className="mb-16">
        <CarouselContent>
          {slides?.map((slide, index) => {
            const link = slide.useInternalLink
              ? (((slide.buttonLink as Page)?.breadcrumbs?.at(-1)?.url as string) ?? '/')
              : (slide.buttonLinkExternal ?? '/')

            return (
              <CarouselItem key={index}>
                <div
                  className="flex w-full h-100 rounded-[var(--radius)]"
                  style={{
                    backgroundImage: `url(${(slide.image as Media).sizes?.large?.url})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                >
                  <div className="p-4 flex flex-col justify-between w-full">
                    <h2>{slide.title}</h2>
                    {slide.description && (
                      <RichText data={slide.description} converters={jsxConverters} />
                    )}
                    <div className="flex justify-between items-center">
                      {slide.footer && (
                        <RichText
                          data={slide.footer}
                          converters={jsxConverters}
                          className="text-xs"
                        />
                      )}
                      {slide.showButton && (
                        <Button asChild className="w-1/2">
                          <Link href={link}>{slide.buttonText}</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-full transform translate-y-1/2"></CarouselPrevious>
        <CarouselNext className="absolute right-0 top-full transform translate-y-1/2"></CarouselNext>
      </Carousel>
    </div>
  )
}
