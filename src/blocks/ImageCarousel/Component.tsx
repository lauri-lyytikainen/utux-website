import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ImageCarousel, Media, SiteLink } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import jsxConverters from '@/utilities/richTextConverter'
import { SiteLinkComponent } from '@/components/Link/SiteLink'
import Image from 'next/image'

export function ImageCarouselComponent({ slides }: ImageCarousel) {
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <Carousel className="mb-16">
        <CarouselContent>
          {slides?.map((slide, index) => {
            return (
              <CarouselItem key={index}>
                <div className="flex w-full aspect-square sm:aspect-video rounded-[var(--radius)] relative">
                  <Image
                    src={(slide.image as Media)?.sizes?.large?.url ?? ''}
                    alt={slide.title ?? ''}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="eager"
                    className="object-cover object-center rounded-[var(--radius)] -z-10"
                    fill
                  />
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
                          <SiteLinkComponent
                            linkObject={slide.link as SiteLink}
                            text={slide.buttonText}
                          />
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
