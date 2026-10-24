import type { ReactNode } from 'react'

import MainLayout from 'src/layouts/MainLayout/MainLayout'

// The information pages: Navbar above, Footer below.
export default function MainGroupLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
