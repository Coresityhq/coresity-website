import { render, screen } from '@testing-library/react'

import { LEGAL_PAGES } from 'src/components/LegalPage/LegalPage'

import SiteFooter from './SiteFooter'

describe('SiteFooter', () => {
  it('shows the lockup and links to every legal page', () => {
    render(<SiteFooter />)

    expect(screen.getByRole('img', { name: 'Coresity' })).toHaveAttribute(
      'src',
      '/CORESITY-IMAGE/lockup-inverse@2x.png'
    )
    for (const p of LEGAL_PAGES) {
      expect(screen.getByRole('link', { name: p.label })).toHaveAttribute(
        'href',
        p.href
      )
    }
  })
})
