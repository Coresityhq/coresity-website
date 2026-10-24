import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from 'src/lib/site'
import { THEMES, THEME_STORAGE_KEY } from 'src/lib/story/theme'

import './globals.css'

// The three brand faces, self-hosted by next/font. The CSS variables feed the
// --font-display / --font-body / --font-mono tokens in globals.css.
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})
const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [{ url: '/icon-512.png', type: 'image/png', sizes: '512x512' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
}

// Pages are prerendered in the light theme. Before React runs, this puts the
// visitor's theme (their saved choice, else the system preference) on <html>
// the same way applyTheme() in src/lib/story/theme.ts does, so a dark-mode
// visitor never sees a light flash. It has to be an inline script, and
// scripts/csp-hashes.mjs hashes it into the Content-Security-Policy.
const THEME_VARS = JSON.stringify({
  light: { ...THEMES.light.vars, bg: THEMES.light.bg },
  dark: { ...THEMES.dark.vars, bg: THEMES.dark.bg },
})
const THEME_BOOT = `(function(){try{var T=${THEME_VARS};var m=localStorage.getItem('${THEME_STORAGE_KEY}');var d=m==='Dark'||(m!=='Light'&&matchMedia('(prefers-color-scheme: dark)').matches);var v=T[d?'dark':'light'];var e=document.documentElement;for(var k in v)if(k!=='bg')e.style.setProperty(k,v[k]);e.style.background=v.bg;e.dataset.theme=d?'dark':'light'}catch(e){}})()`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-scroll-behavior tells Next the smooth scrolling in globals.css is
    // deliberate, so it still jumps instantly on route changes.
    // suppressHydrationWarning: THEME_BOOT puts a style attribute on <html>
    // before React hydrates, which the server markup cannot know about. It
    // only silences the check for this element's own attributes.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body data-app="coresity">{children}</body>
    </html>
  )
}
