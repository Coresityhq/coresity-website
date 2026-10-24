import type { ReactNode } from 'react'

import StoryShell from './StoryShell'

// The homepage: the story with its own header, no Navbar or Footer.
export default function StoryGroupLayout({
  children,
}: {
  children: ReactNode
}) {
  return <StoryShell>{children}</StoryShell>
}
