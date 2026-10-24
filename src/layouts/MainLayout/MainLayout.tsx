import type { ReactNode } from 'react'

import SiteFooter from 'src/components/SiteFooter/SiteFooter'
import SiteHeader from 'src/components/SiteHeader/SiteHeader'
import ThemeShell from 'src/layouts/ThemeShell/ThemeShell'

// Layout for every page but the story: the same themed shell and header
// (in navigation mode), and the footer line on a dark band.

const MainLayout = ({ children }: { children?: ReactNode }) => (
  <ThemeShell>
    <div className="flex min-h-screen flex-col bg-[var(--c-bg)] text-[var(--c-ink)]">
      <SiteHeader mode="nav" />
      <main className="grow pt-16">{children}</main>
      <SiteFooter />
    </div>
  </ThemeShell>
)

export default MainLayout
