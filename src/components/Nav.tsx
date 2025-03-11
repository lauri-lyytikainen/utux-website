import Link from 'next/link'
import { LanguageSwitcher } from './LanguageSwitcher'
import Image from 'next/image'

export async function Nav() {
  return (
    <nav className="w-full fixed top-0 bg-white/30 max-h-16">
      <div className="flex flex-row p-4 align-center justify-between max-w-[1024px] mx-auto">
        <Image src="media/utux-dark.svg" alt="Utux Logo" width="100" height="40" />
        <ul className="flex flex-row gap-4 align-center font-semibold">
          <li className="flex items-center">
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/companies" className="hover:underline">
              Companies
            </Link>
          </li>
          <li className="flex items-center">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  )
}
