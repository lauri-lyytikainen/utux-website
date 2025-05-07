'use client'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import { Footer, Page } from '@/payload-types'
import Link from 'next/link'

export function FooterClient({ footerData }: { footerData: Footer }) {
  return (
    <footer className="bg-background">
      <div className="max-w-[1024px] mx-auto w-full flex flex-col p-4">
        <div className="flex w-full py-4 gap-4 sm:gap-8 justify-between">
          <div className="flex flex-col gap-2 pt-2 justify-start grow min-w-16">
            <Image
              src="/media/utux-dark.svg"
              alt="Utux Logo"
              width="70"
              height="30"
              className="dark:hidden"
            />
            <Image
              src="/media/utux-light.svg"
              alt="Utux Logo"
              width="70"
              height="30"
              className="hidden dark:block"
            />
            <p className="text-xs font-light">{footerData.slogan}</p>
          </div>
          <div className="flex flex-row gap-4 flex-wrap">
            {footerData.linkGroups?.map((group) => (
              <div key={group.id} className="flex flex-col grow max-w-1/2">
                <h3>{group.title}</h3>
                {group.links?.map((link) => (
                  <Link
                    href={(link.linkedPage as Page).breadcrumbs?.at(-1)?.url ?? '/'}
                    className="hover:underline"
                    key={link.id}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="py-4">{footerData.copyrightText}</div>
      </div>
    </footer>
  )
}
