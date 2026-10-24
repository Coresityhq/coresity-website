import userEvent from '@testing-library/user-event'

import { render, screen } from '@testing-library/react'

import { GET_STARTED_URL } from 'src/lib/links'
import { THEME_STORAGE_KEY } from 'src/lib/story/theme'

import SiteHeader, { NAV } from './SiteHeader'

vi.mock('next/navigation', () => ({ usePathname: () => '/about' }))

describe('SiteHeader', () => {
  beforeEach(() => localStorage.clear())

  it('shows the logo linking back to the top of the story', () => {
    render(<SiteHeader mode="story" />)

    const logo = screen.getByRole('img', { name: 'Coresity' })
    // The mark alone on phones, the lockup from 640px up.
    expect(logo).toHaveAttribute('src', '/CORESITY-IMAGE/mark@1x.png')
    const source = logo.parentElement?.querySelector('source')
    expect(source).toHaveAttribute('srcset', '/CORESITY-IMAGE/lockup@3x.png')
    expect(source).toHaveAttribute('media', '(min-width: 640px)')
    expect(logo.closest('a')).toHaveAttribute('href', '#top')
  })

  it('switches to the inverse lockup on the dark theme', async () => {
    render(<SiteHeader mode="story" />)

    const toggle = screen.getByRole('button', {
      name: 'Toggle light and dark mode',
    })
    await userEvent.click(toggle)
    const logo = screen.getByRole('img', { name: 'Coresity' })
    expect(logo).toHaveAttribute('src', '/CORESITY-IMAGE/mark-inverse@2x.png')
    expect(logo.parentElement?.querySelector('source')).toHaveAttribute(
      'srcset',
      '/CORESITY-IMAGE/lockup-inverse@2x.png'
    )
    // The store lives in the module, so leave it light for the next test.
    await userEvent.click(toggle)
  })

  it('carries the scene index, label and progress hooks for the engine', () => {
    const { container } = render(<SiteHeader mode="story" />)

    expect(container.querySelector('[data-nav-idx]')).toBeInTheDocument()
    expect(container.querySelector('[data-nav-label]')).toBeInTheDocument()
    expect(container.querySelector('[data-progress]')).toBeInTheDocument()
    expect(screen.getByText('/ 15')).toBeInTheDocument()
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('links the call to action to the Get started destination', () => {
    render(<SiteHeader mode="nav" />)

    expect(screen.getByRole('link', { name: 'Get started →' })).toHaveAttribute(
      'href',
      GET_STARTED_URL
    )
  })

  it('offers the dark theme in light mode and switches on click', async () => {
    render(<SiteHeader mode="nav" />)
    const toggle = screen.getByRole('button', {
      name: 'Toggle light and dark mode',
    })

    expect(toggle).toHaveTextContent('Dark mode')
    await userEvent.click(toggle)
    expect(toggle).toHaveTextContent('Light mode')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('Dark')
    await userEvent.click(toggle)
  })

  it('shows the site navigation with the current page marked, and a menu on phones', async () => {
    const { container } = render(<SiteHeader mode="nav" />)

    const nav = screen.getByRole('navigation', { name: 'Site' })
    for (const l of NAV) {
      expect(nav).toContainElement(screen.getByRole('link', { name: l.name }))
    }
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(container.querySelector('[data-progress]')).not.toBeInTheDocument()

    const menu = screen.getByRole('button', { name: 'Menu' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(menu)
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    expect(screen.getAllByRole('link', { name: 'Contact' })).toHaveLength(2)
  })
})
