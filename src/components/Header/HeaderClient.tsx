'use client'
import Link from 'next/link'
import { LanguageSwitcher } from './LanguageSwitcher'
import Image from 'next/image'
import { Header } from '@/payload-types'
import { Page } from '@/payload-types'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Menu } from 'lucide-react'
import { useRef } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '../ui/button'
export function HeaderClient({ headerData }: { headerData: Header }) {
  const links = headerData.links?.map((link) => ({
    text: link.text,
    linkedPage: link.linkedPage as Page,
  }))

  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  return (
    <nav className="w-full fixed top-0 bg-card/80 max-h-16 backdrop-blur-md z-10">
      <div className="flex flex-row p-4 align-center justify-between max-w-[1024px] mx-auto">
        <Image
          src="/media/utux-dark.svg"
          alt="Utux Logo"
          width="100"
          height="40"
          className="dark:hidden"
        />
        <Image
          src="/media/utux-light.svg"
          alt="Utux Logo"
          width="100"
          height="40"
          className="hidden dark:block"
        />
        <ul className="flex-row gap-4 align-center font-semibold hidden sm:flex">
          {links?.map((link) => (
            <li key={link.linkedPage.path} className="flex items-center">
              <Link
                href={`${link.linkedPage.breadcrumbs?.at(-1)?.url}`}
                className="hover:underline"
              >
                {link.text}
              </Link>
            </li>
          ))}
          <li className="flex items-center">
            <LanguageSwitcher />
          </li>
          <li className="flex items-center">
            <ThemeSwitcher />
          </li>
        </ul>
        <Drawer>
          <DrawerTrigger asChild className="sm:hidden">
            <Button variant="outline" size="icon" aria-label="Menu">
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent
            onOpenAutoFocus={(e) => {
              e.preventDefault() // Prevent default focus behavior
              // Focus the first nav link when drawer opens
              firstLinkRef.current?.focus()
            }}
          >
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="flex flex-col items-center mt-4">
                <Image
                  src="/media/utux-dark.svg"
                  alt="Utux Logo"
                  width="100"
                  height="40"
                  className="dark:hidden ce"
                />
                <Image
                  src="/media/utux-light.svg"
                  alt="Utux Logo"
                  width="100"
                  height="40"
                  className="hidden dark:block"
                />
                <DrawerTitle className="text-xl text-center my-4">Menu</DrawerTitle>
              </DrawerHeader>
              <ul className="flex flex-col gap-4 items-center ">
                {links?.map((link, index) => (
                  <li key={link.linkedPage.path} className="flex items-center text-lg">
                    <DrawerClose className="w-full " asChild>
                      <Link
                        href={`${link.linkedPage.breadcrumbs?.at(-1)?.url}`}
                        className="hover:underline"
                        tabIndex={0}
                        ref={index === 0 ? firstLinkRef : undefined}
                      >
                        {link.text}
                      </Link>
                    </DrawerClose>
                  </li>
                ))}
              </ul>
              <DrawerFooter>
                <div className="flex justify-between">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  )
}
