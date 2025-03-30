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
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fi">Finnish</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
