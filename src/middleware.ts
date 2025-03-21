import { i18nRouter } from 'next-i18n-router'
import { i18nConfig } from './i18nConfig'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  if (url.pathname === '/' || url.pathname === '/en' || url.pathname === '/fi') {
    url.pathname = `${url.pathname === '/' ? '' : url.pathname}/home`
    return Response.redirect(url)
  }
  return i18nRouter(request, i18nConfig)
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: ['/((?!api|static|media|admin|.*\\..*|_next).*)', '/:locale(en|fi)/((?!media/).*)'],
}
