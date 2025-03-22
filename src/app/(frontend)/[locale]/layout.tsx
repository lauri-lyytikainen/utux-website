import React from 'react'
import { notFound } from 'next/navigation'
import { i18nConfig } from '@/i18nConfig'
import '../../globals.css'
import { Header } from '@/components/Header/Header'
import { ThemeProvider } from 'next-themes'
import { Footer } from '@/components/Footer/Footer'
import { Inter } from 'next/font/google'

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
          <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
            <div className="min-h-screen flex flex-col min-w-screen">
              <Header locale={locale} />
              <div className="grow max-w-[1024px] mx-auto w-full mt-16  ">{children}</div>
              <Footer locale={locale} />
            </div>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
