import { Text } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

export function TextBlock({ content }: Text) {
  return <>{content && <RichText data={content} />}</>
}
