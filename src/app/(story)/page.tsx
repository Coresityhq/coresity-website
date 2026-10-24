import type { Metadata } from 'next'

import Story from 'src/components/Story/Story'
import { SITE_DESCRIPTION } from 'src/lib/site'

export const metadata: Metadata = {
  title: 'Home',
  description: SITE_DESCRIPTION,
}

export default function HomePage() {
  return <Story />
}
