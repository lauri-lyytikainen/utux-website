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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'
export function HeaderClient({ headerData }: { headerData: Header }) {
  const links = headerData.links?.map((link) => ({
    text: link.text,
    linkedPage: link.linkedPage as Page,
  }))

  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  return (
    <nav
      className="w-full fixed top-0 bg-card/80 max-h-16 backdrop-blur-md z-10"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex flex-row p-4 align-center justify-between max-w-[1024px] mx-auto">
        <Link href="/" aria-label="Home">
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
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open menu"
              aria-expanded="false"
              aria-haspopup="dialog"
              className="hidden sm:flex"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader className="max-w-[1024px] mx-auto w-full">
              <SheetTitle>Menu</SheetTitle>
              <div className="flex justify-between mt-4 py-4">
                <ul className="flex-col gap-4 align-center font-semibold flex" role="menu">
                  {links?.map((link) => (
                    <li key={link.linkedPage.path} className="flex items-center" role="none">
                      <SheetClose asChild>
                        <Link
                          href={`${link.linkedPage.breadcrumbs?.at(-1)?.url ?? '/'}`}
                          className="hover:underline"
                          role="menuitem"
                          aria-current={
                            link.linkedPage.path === window.location.pathname ? 'page' : undefined
                          }
                        >
                          {link.text}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-4" role="group" aria-label="Settings">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Drawer>
          <DrawerTrigger asChild className="sm:hidden">
            <Button
              variant="outline"
              size="icon"
              aria-label="Open mobile menu"
              aria-expanded="false"
              aria-haspopup="dialog"
            >
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent
            onOpenAutoFocus={(e) => {
              e.preventDefault()
              firstLinkRef.current?.focus()
            }}
          >
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="flex flex-col items-center mt-4">
                <Link href="/" aria-label="Home">
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
                </Link>
                <DrawerTitle className="text-xl text-center my-4">Menu</DrawerTitle>
              </DrawerHeader>
              <ul className="flex flex-col gap-4 items-center" role="menu">
                {links?.map((link, index) => (
                  <li
                    key={link.linkedPage.path}
                    className="flex items-center text-lg w-full"
                    role="none"
                  >
                    <DrawerClose className="w-full" asChild>
                      <Link
                        href={`${link.linkedPage.breadcrumbs?.at(-1)?.url ?? '/'}`}
                        className="hover:underline w-full text-center"
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
                <div
                  className="flex flex-col gap-4 items-center"
                  role="group"
                  aria-label="Settings"
                >
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
