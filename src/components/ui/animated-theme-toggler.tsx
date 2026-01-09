'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from './button'

type Props = { className?: string }

export function ThemeToggle({ className }: Props) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = (theme === 'system' ? resolvedTheme : theme) === 'dark'

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(className, 'rounded-full z-10')}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
