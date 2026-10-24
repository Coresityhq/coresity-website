import { readFileSync } from 'node:fs'

import { THEMES } from './theme'

// globals.css declares the light --c-* palette on :root so pages read right
// before any script runs. It must stay in step with THEMES.light.vars.
describe('globals.css', () => {
  it('declares every light --c-* variable with the theme’s value', () => {
    const css = readFileSync('src/app/globals.css', 'utf8').toLowerCase()
    for (const [name, value] of Object.entries(THEMES.light.vars)) {
      expect(css).toContain(`${name}: ${value.toLowerCase()};`)
    }
  })
})
