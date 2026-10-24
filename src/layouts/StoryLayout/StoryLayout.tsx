'use client'

import type { ReactNode } from 'react'

import SiteHeader from 'src/components/SiteHeader/SiteHeader'
import ThemeShell from 'src/layouts/ThemeShell/ThemeShell'

// Layout for the homepage story: the themed shell and the header in story
// mode (scene index and progress hairline). The story closes with its own
// footer line, so no footer here.

const StoryLayout = ({ children }: { children?: ReactNode }) => (
  <ThemeShell>
    <div className="relative min-h-screen bg-[var(--c-bg)] text-[var(--c-ink)]">
      <SiteHeader mode="story" />
      {children}
    </div>
  </ThemeShell>
)

export default StoryLayout
