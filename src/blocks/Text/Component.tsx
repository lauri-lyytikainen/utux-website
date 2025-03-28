import { Text } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

export function TextBlock({ content }: Text) {
  return <div className="max-w-[1024px] mx-auto p-4">{content && <RichText data={content} />}</div>
}
