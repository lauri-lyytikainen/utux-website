import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'

import { notFound } from 'next/navigation'

type Params = Promise<{ slug: string; locale: 'fi' | 'en' }>

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
      path: true,
    },
  })

  const params = pages.docs.map(({ path }) => {
    return { path }
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

  return <p>Custom page: {page.title}</p>
}

const queryPageBySlug = cache(async (slug: string, locale: 'fi' | 'en') => {
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
        equals: slug,
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
