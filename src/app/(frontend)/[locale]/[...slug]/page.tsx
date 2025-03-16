import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { notFound } from 'next/navigation'
import Link from 'next/link'

type Params = Promise<{ slug: string[]; locale: 'fi' | 'en' }>

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      breadcrumbs: true,
    },
  })

  const params = pages.docs.map(({ breadcrumbs }) => {
    if (!breadcrumbs || !breadcrumbs.at(-1)?.url) {
      return { slug: [] }
    }
    return { slug: (breadcrumbs.at(-1)?.url ?? '').split('/').slice(1) }
  })

  return params
}

export default async function Page({ params }: { params: Params }) {
  const { isEnabled: draft } = await draftMode()

  const { locale, slug } = await params

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug(slug, locale)

  if (!page) {
    return notFound()
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {page.breadcrumbs?.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.id || index}>
              {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
              <BreadcrumbItem>
                <BreadcrumbLink href={breadcrumb.url ?? '/'}>{breadcrumb.label}</BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <p>Custom page: {page.title}</p>
    </>
  )
}

const queryPageBySlug = cache(async (slugArray: string[], locale: 'fi' | 'en') => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      path: {
        equals: slugArray.at(-1),
      },
    },
    locale: locale,
  })

  return result.docs?.[0] || null
})

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  const page = await queryPageBySlug(slug, locale)

  return generateMeta({ doc: page })
}
