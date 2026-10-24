'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

// The story is rendered on the client only, as it was before the move to
// Next.js. Its theme lives in localStorage and the system preference, and
// the engine hides the hero's words at boot before playing them in; server
// rendering would paint the wrong theme and the finished headline for a
// moment before the JavaScript takes over. The header and the scenes mount in
// one commit, so the engine's header hooks exist when `startStory` runs.
const StoryLayout = dynamic(
  () => import('src/layouts/StoryLayout/StoryLayout'),
  { ssr: false }
)

export default function StoryShell({ children }: { children: ReactNode }) {
  return <StoryLayout>{children}</StoryLayout>
}
