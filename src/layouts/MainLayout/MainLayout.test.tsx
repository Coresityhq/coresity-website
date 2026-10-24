import { render } from '@testing-library/react'

import MainLayout from './MainLayout'

describe('MainLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MainLayout />)
    }).not.toThrow()
  })
})
