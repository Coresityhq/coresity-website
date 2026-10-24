'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'

import { applyTheme } from 'src/lib/story/theme'
import { useStoryTheme } from 'src/lib/story/useStoryTheme'

// Keeps <html> on the visitor's theme: the boot script in src/app/layout.tsx
// sets it before React runs, and this effect follows every toggle and system
// change after. Every layout renders inside it, so the theme is site-wide.

const ThemeShell = ({ children }: { children?: ReactNode }) => {
  const { dark } = useStoryTheme()

  useEffect(() => {
    applyTheme(dark ? 'dark' : 'light')
  }, [dark])

  return <>{children}</>
}

export default ThemeShell
