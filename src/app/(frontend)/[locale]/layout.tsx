import React from 'react'
import { notFound } from 'next/navigation'
import { i18nConfig } from '@/i18nConfig'
import '../../globals.css'
import 'react-cookie-manager/style.css'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers/Providers'
import { BackToTopButton } from '@/components/BackToTopButton/BackToTopButton'

const inter = Inter({
  subsets: ['latin'],
  // Including all weights you need
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  // Enable variable font
  variable: '--font-inter',
})

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
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <body>
        <main>
          <Providers lang={locale}>
            <div className="min-h-screen flex flex-col w-full">
              <Header locale={locale} />
              <div className="grow w-full mt-16">{children}</div>
              <BackToTopButton />
              <Footer locale={locale} />
            </div>
          </Providers>
        </main>
      </body>
    </html>
  )
}
