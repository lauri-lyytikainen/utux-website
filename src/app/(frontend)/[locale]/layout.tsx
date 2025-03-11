import React from 'react'
import { notFound } from 'next/navigation'
import { i18nConfig } from '@/i18nConfig'
import '../../globals.css'
import { Nav } from '@/components/Nav'

type Params = Promise<{ locale: 'fi' | 'en' }>

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { locale } = await params
  if (!i18nConfig.locales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body>
        <main>
          <div className="min-h-screen flex flex-col min-w-screen">
            <Nav />
            <div className="grow max-w-[1024px] mx-auto w-full mt-16  ">{children}</div>
            <footer className="min-h-16 ">Footer</footer>
          </div>
        </main>
      </body>
    </html>
  )
}
