'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import Button from 'src/components/Button/Button'
import { GET_STARTED_URL } from 'src/lib/links'
import { useStoryTheme } from 'src/lib/story/useStoryTheme'

// The fixed header on every page: brand, the theme toggle, one call to
// action, and in the middle either the story's scene index (filled by the
// story engine through the data-nav-* hooks, with the amber progress hairline
// it scales with scroll) or the site navigation.

// The brand lockup with its intrinsic sizes, and the mark alone for phones
// (the brand kit's rule below a 96px-wide lockup); the inverse ones read on
// dark.
const LOGO = {
  light: {
    src: '/CORESITY-IMAGE/lockup@3x.png',
    width: 954,
    height: 206,
    mark: '/CORESITY-IMAGE/mark@1x.png',
  },
  dark: {
    src: '/CORESITY-IMAGE/lockup-inverse@2x.png',
    width: 636,
    height: 137,
    mark: '/CORESITY-IMAGE/mark-inverse@2x.png',
  },
}

export const NAV = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Contact', href: '/contact' },
]

const PILL =
  'flex h-8 cursor-pointer items-center gap-2 rounded-md border border-[var(--c-line2)] bg-transparent px-3 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap text-[var(--c-ink)] uppercase hover:border-[var(--c-ink)]'

type Props = { mode: 'story' | 'nav' }

const SiteHeader = ({ mode }: Props) => {
  const { dark, toggleTheme } = useStoryTheme()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const logo = dark ? LOGO.dark : LOGO.light

  const brand = (
    <picture>
      <source
        media="(min-width: 640px)"
        srcSet={logo.src}
        width={logo.width}
        height={logo.height}
      />
      <img
        src={logo.mark}
        alt="Coresity"
        width="256"
        height="256"
        className="h-8 w-auto"
      />
    </picture>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-[var(--c-line)] bg-[var(--c-bg)]">
      <div className="flex items-center justify-between gap-6 px-[4vw] py-[14px]">
        {mode === 'story' ? (
          <a href="#top" className="flex items-center">
            {brand}
          </a>
        ) : (
          <Link href="/" className="flex items-center">
            {brand}
          </Link>
        )}

        {mode === 'story' ? (
          // The design leaves the index on --brand; --c-vio is the same violet
          // in light and stays legible in dark, as every other index does.
          <div className="hidden items-center gap-[10px] font-mono text-[11px] tracking-[0.14em] text-[var(--c-muted)] uppercase sm:flex">
            <span
              data-nav-idx="1"
              className="font-medium text-[var(--c-vio)]"
            />
            <span>/ 15</span>
            <span className="h-px w-7 bg-[var(--c-line2)]" />
            <span data-nav-label="1" />
          </div>
        ) : (
          <nav
            aria-label="Site"
            className="hidden items-center gap-7 font-mono text-[11px] tracking-[0.14em] uppercase md:flex"
          >
            {NAV.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`border-b pb-px transition-colors hover:text-[var(--c-ink)] hover:no-underline ${
                    active
                      ? 'border-[var(--accent)] text-[var(--c-ink)]'
                      : 'border-transparent text-[var(--c-muted)]'
                  }`}
                >
                  {l.name}
                </Link>
              )
            })}
          </nav>
        )}

        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
            className={PILL}
          >
            <span
              aria-hidden="true"
              className={`h-[10px] w-[10px] rounded-full border-[1.5px] border-current ${
                dark ? 'bg-transparent' : 'bg-current'
              }`}
            />
            <span className="hidden sm:inline">
              {dark ? 'Light mode' : 'Dark mode'}
            </span>
          </button>
          {mode === 'nav' && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`${PILL} md:hidden`}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          )}
          <Button variant="primary" size="sm" href={GET_STARTED_URL}>
            Get started →
          </Button>
        </div>
      </div>

      {mode === 'story' ? (
        <div
          data-progress="1"
          className="h-px origin-left scale-x-0 bg-[var(--accent)]"
        />
      ) : (
        open && (
          <nav
            id="site-menu"
            aria-label="Site"
            className="border-t border-[var(--c-line)] px-[4vw] py-4 md:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === l.href ? 'page' : undefined}
                    className={`block border-b border-[var(--c-line)] py-3 font-display text-lg font-semibold hover:no-underline ${
                      pathname === l.href
                        ? 'text-[var(--c-vio)]'
                        : 'text-[var(--c-ink)]'
                    }`}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )
      )}
    </header>
  )
}

export default SiteHeader
