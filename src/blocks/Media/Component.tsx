import { PageMedia, Media } from '@/payload-types'
import Image from 'next/image'

export function MediaComponent({ media }: PageMedia) {
  const img = (media as Media).sizes?.large
  return (
    <div className="max-w-[1024px] mx-auto p-4">
      <div className="relative aspect-video">
        <Image
          src={img?.url as string}
          alt={(media as Media).alt}
          priority={true}
          loading="eager"
          className="object-cover rounded-[var(--radius)]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
        />
      </div>
    </div>
  )
}
