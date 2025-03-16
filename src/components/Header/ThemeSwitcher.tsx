'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { systemTheme, theme, setTheme } = useTheme()
  // Track mounted state to prevent hydration mismatch

  // Now it's safe to access theme values
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <select
      onChange={(e) => {
        setTheme(e.target.value)
        e.target.value = ''
      }}
      className="hover:underline hover:cursor-pointer"
    >
      <option className="bg-background" value="">
        Theme
      </option>
      <option className="bg-background" value="light">
        Light
      </option>
      <option className="bg-background" value="dark">
        Dark
      </option>
      <option className="bg-background" value="system">
        System
      </option>
    </select>
  )
}
