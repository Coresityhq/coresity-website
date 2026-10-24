import { render, screen } from '@testing-library/react'

import { THEMES } from 'src/lib/story/theme'

import StoryLayout from './StoryLayout'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))

describe('StoryLayout', () => {
  it('renders the story header and its children on the themed ground', () => {
    render(
      <StoryLayout>
        <p>Scene</p>
      </StoryLayout>
    )

    expect(screen.getByText('Scene')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Coresity' })).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(document.documentElement).toHaveStyle({
      backgroundColor: THEMES.light.bg,
    })
    expect(document.documentElement.style.getPropertyValue('--c-ink')).toBe(
      THEMES.light.vars['--c-ink']
    )
  })
})
