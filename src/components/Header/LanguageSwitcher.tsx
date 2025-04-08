'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ChevronDownIcon, Globe } from 'lucide-react'

const FiFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 11"
    className="min-w-6 min-h-4 object-cover rounded-xs"
  >
    <path fill="#fff" d="M0 0h18v11H0z" />
    <path stroke="#002F6C" strokeWidth={3} d="M0 5.5h18M6.5 0v11" />
  </svg>
)

const EnFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 30"
    className="min-w-6 min-h-4 object-cover rounded-xs"
  >
    <clipPath id="a">
      <path d="M0 0v30h60V0z" />
    </clipPath>
    <clipPath id="b">
      <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path fill="#012169" d="M0 0v30h60V0z" />
      <path stroke="#fff" strokeWidth={6} d="m0 0 60 30m0-30L0 30" />
      <path stroke="#C8102E" strokeWidth={4} d="m0 0 60 30m0-30L0 30" clipPath="url(#b)" />
      <path stroke="#fff" strokeWidth={10} d="M30 0v30M0 15h60" />
      <path stroke="#C8102E" strokeWidth={6} d="M30 0v30M0 15h60" />
    </g>
  </svg>
)

export function LanguageSwitcher() {
  const router = useRouter()
  const currentPath = usePathname()
  const currentLocale = currentPath?.includes('/en') ? 'en' : 'fi'
  // Add a state to track if the component has mounted
  const [hasMounted, setHasMounted] = useState(false)

  // Set hasMounted to true after the component mounts
  useEffect(() => {
    setHasMounted(true)
  }, [])

  function changeLanguage(targetLocale: 'fi' | 'en') {
    if (currentPath?.includes('/en') && targetLocale === 'fi') {
      router.push(currentPath.replace('/en', `/${targetLocale}`))
      router.refresh()
    } else if (targetLocale === 'en' && !currentPath?.includes('/en')) {
      const newUrl = '/en' + currentPath
      router.push(newUrl)
      router.refresh()
    }
  }

  // Display a placeholder during server-side rendering
  if (!hasMounted) {
    return (
      <div className="flex gap-2 items-center">
        <Globe className="w-6 h-6" />
        <p className="text-sm font-light">Language</p>
        <Button variant="outline" className="font-semibold">
          {currentLocale === 'en' ? 'English' : 'Finnish'}
          <ChevronDownIcon className="size-4 opacity-50" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2 items-center">
      <Globe className="w-6 h-6" />
      <p className="text-sm font-light">Language</p>
      <Select
        onValueChange={(value) => changeLanguage(value as 'fi' | 'en')}
        value={currentLocale}
        defaultValue={currentLocale}
      >
        <SelectTrigger>
          <SelectValue placeholder={currentLocale === 'en' ? 'English' : 'Finnish'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="en">
              <div className="w-6 h-4">
                <EnFlag />
              </div>
              English
            </SelectItem>
            <SelectItem value="fi">
              <div className="w-6 h-4">
                <FiFlag />
              </div>
              Finnish
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
