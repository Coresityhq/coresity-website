import type { Metadata } from 'next'

import Button from 'src/components/Button/Button'
import PageIntro from 'src/components/PageIntro/PageIntro'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

// Served as 404.html by the static export; nginx returns it, with a 404
// status, for every path that is not a page or a public file.
export default function NotFound() {
  return (
    <MainLayout>
      <PageIntro
        eyebrow="Error 404"
        title={
          <>
            Page not found
            <span className="text-[var(--accent)]">.</span>
          </>
        }
        lede="The page you asked for doesn’t exist, or has moved."
      />
      <div className="px-[5vw] pb-[14vh]">
        <Button variant="primary" size="lg" href="/">
          Back to the homepage →
        </Button>
      </div>
    </MainLayout>
  )
}
