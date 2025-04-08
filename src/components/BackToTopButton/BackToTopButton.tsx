'use client'
import { ChevronUp } from 'lucide-react'
import { Button } from '../ui/button'
import { useState, useEffect } from 'react'

export function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Button
      className={`fixed bottom-4 right-4 w-15 h-15 rounded-full ${visible ? '' : 'hidden'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ChevronUp size={40} className="min-w-10 min-h-10" />
    </Button>
  )
}
