'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { Moon } from 'lucide-react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex gap-2">
        <Label htmlFor="dark-mode">Dark Mode</Label>
        <Switch id="dark-mode" disabled />
      </div>
    )
  }

  return (
    <div className="flex gap-2 items-center">
      <Moon className="w-6 h-6" />
      <p className="text-sm font-light">Darkmode</p>
      <Switch
        type="button"
        id="dark-mode"
        checked={theme === 'dark'}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-checked={theme === 'dark'}
        role="switch"
      />
    </div>
  )
}
