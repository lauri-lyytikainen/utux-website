import { PageMedia, Media } from '@/payload-types'
import Image from 'next/image'

export function MediaComponent({ media }: PageMedia) {
  const img = (media as Media).sizes?.large
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <Image
        src={img?.url as string}
        alt={(media as Media).alt}
        width={img?.width as number}
        height={img?.height as number}
        priority={true}
        loading="eager"
        className="aspect-video object-cover rounded-[var(--radius)]"
      />
    </div>
  )
}
