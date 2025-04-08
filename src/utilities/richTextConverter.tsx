import { Separator } from '@/components/ui/separator'
import { Page } from '@/payload-types'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction, JSXConverters } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}): JSXConverters<DefaultNodeTypes> => ({
  ...defaultConverters,
  link: ({ node }) => {
    const url =
      node.fields.linkType === 'internal'
        ? // @ts-expect-error This is always e page if it's an internal link
          (node.fields.doc?.value as Page)?.breadcrumbs?.at(-1)?.url
        : node.fields.url
    return (
      <Link
        href={url ?? '/'}
        className="text-primary underline"
        rel={node.fields.newTab ? 'noopener noreferrer' : ''}
        target={node.fields.newTab ? '_blank' : ''}
      >
        {(node.children.at(0) as any).text}
      </Link>
    )
  },
  horizontalrule: () => {
    return <Separator />
  },
})

export default jsxConverters
