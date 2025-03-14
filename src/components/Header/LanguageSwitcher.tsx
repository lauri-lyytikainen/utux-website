'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export function LanguageSwitcher() {
  const router = useRouter()
  const currentPath = usePathname()
  const currentLocale = currentPath.includes('/en') ? 'en' : 'fi'

  function changeLanguage(targetLocale: 'fi' | 'en') {
    if (currentPath.includes('/en') && targetLocale === 'fi') {
      router.push(currentPath.replace('/en', `/${targetLocale}`))
      router.refresh()
    } else if (targetLocale === 'en') {
      const newUrl = '/en' + currentPath
      router.push(newUrl)
      router.refresh()
    }
  }
  return (
    <>
      <select
        onChange={(e) => changeLanguage(e.target.value as 'fi' | 'en')}
        defaultValue={currentLocale}
        className="hover:underline hover:cursor-pointer "
      >
        <option value="en" className="bg-background">
          EN
        </option>
        <option value="fi" className="bg-background">
          FI
        </option>
      </select>
    </>
  )
}
