'use client'
import Link from 'next/link'
import { LanguageSwitcher } from './LanguageSwitcher'
import Image from 'next/image'
import { Header } from '@/payload-types'
import { Page } from '@/payload-types'

export function HeaderClient({ headerData }: { headerData: Header }) {
  const links = headerData.links?.map((link) => ({
    text: link.text,
    linkedPage: link.linkedPage as Page,
  }))

  return (
    <nav className="w-full fixed top-0 bg-white/30 max-h-16">
      <div className="flex flex-row p-4 align-center justify-between max-w-[1024px] mx-auto">
        <Image src="media/utux-dark.svg" alt="Utux Logo" width="100" height="40" />
        <ul className="flex flex-row gap-4 align-center font-semibold">
          {links?.map((link) => (
            <li key={link.linkedPage.path} className="flex items-center">
              <Link href={`/${link.linkedPage.path}`} className="hover:underline">
                {link.text}
              </Link>
            </li>
          ))}
          <li className="flex items-center">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  )
}
