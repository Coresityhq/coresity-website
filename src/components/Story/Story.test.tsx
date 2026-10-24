import { render, screen } from '@testing-library/react'

import Story from './Story'

// The scenes in order, with the data-* hooks the engine binds and how many of
// each the design has. A mistyped hook fails here instead of silently
// breaking a scene at runtime.
const SCENES: {
  name: string
  heading?: string
  hooks?: Record<string, number>
}[] = [
  {
    name: 'hero',
    heading:
      'Coresity gives operators the practical expertise they need to get things done.',
    hooks: { 'data-hp': 3, 'data-hw': 12, 'data-hcta': 1, 'data-rail': 1 },
  },
  {
    name: 'problem',
    heading: 'Information is everywhere. Knowing what to do is not.',
    hooks: {
      'data-pw': 5,
      'data-pc': 6,
      'data-pl': 3,
      'data-pbox': 1,
      'data-pexp': 1,
      'data-pq': 1,
      'data-ptext': 1,
    },
  },
  {
    name: 'opportunity',
    heading: 'Expertise you can put to work today.',
  },
  {
    name: 'who',
    heading: 'Built for operators + the teams behind them.',
    hooks: { 'data-person': 7, 'data-portrait': 7, 'data-pdesc': 7 },
  },
  { name: 'why' },
  { name: 'pause', hooks: { 'data-q1': 1, 'data-q2': 1 } },
  {
    name: 'model',
    heading: 'Six steps from problem to result.',
    hooks: { 'data-ml': 6, 'data-mp': 6, 'data-mc': 1, 'data-mpanels': 1 },
  },
  { name: 'define', hooks: { 'data-dw': 5, 'data-dcon': 4, 'data-dopp': 1 } },
  {
    name: 'design',
    hooks: { 'data-br': 7, 'data-bf': 7, 'data-bo': 1, 'data-dhead': 1 },
  },
  {
    name: 'deploy',
    heading: 'Put it to work on the real problem.',
    hooks: {
      'data-ch': 12,
      'data-dc': 1,
      'data-dphead': 1,
      'data-dproutes': 1,
    },
  },
  {
    name: 'develop',
    heading: 'We learn from what gets you results, and build what comes next.',
  },
  {
    name: 'flywheel',
    heading: 'Every turn makes the next one stronger.',
    hooks: { 'data-fly': 1, 'data-fl': 5, 'data-fc': 5, 'data-fcd': 1 },
  },
  { name: 'work', heading: 'Built to be used', hooks: { 'data-tilt': 3 } },
  {
    name: 'partner',
    heading: 'You bring the problem. We bring the expertise.',
  },
  {
    name: 'notes',
    heading: 'Field notes',
    hooks: { 'data-notes': 1, 'data-nhint': 1, 'data-nprog': 1 },
  },
  {
    name: 'final',
    heading: 'Have something you need to get done?',
    hooks: { 'data-fin': 4 },
  },
]

describe('Story', () => {
  it('renders the sixteen scenes in the design’s order inside main', () => {
    const { container } = render(<Story />)

    const main = container.querySelector('main#top')
    expect(main).toBeInTheDocument()
    const names = [
      ...(main as HTMLElement).querySelectorAll('[data-scene]'),
    ].map((el) => el.getAttribute('data-scene'))
    expect(names).toEqual(SCENES.map((s) => s.name))
  })

  it('keeps every scene heading verbatim', () => {
    render(<Story />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SCENES[0].heading as string
    )
    for (const s of SCENES.slice(1)) {
      if (!s.heading) continue
      expect(
        screen.getByRole('heading', { name: s.heading })
      ).toBeInTheDocument()
    }
  })

  it('exposes each scene’s engine hooks with the right cardinality', () => {
    const { container } = render(<Story />)

    for (const s of SCENES) {
      if (!s.hooks) continue
      const scene = container.querySelector(
        `[data-scene="${s.name}"]`
      ) as HTMLElement
      for (const [hook, count] of Object.entries(s.hooks)) {
        expect(scene.querySelectorAll(`[${hook}]`)).toHaveLength(count)
      }
    }
    expect(container.querySelectorAll('[data-dark]')).toHaveLength(2)
    expect(container.querySelectorAll('[data-pin="1"]')).toHaveLength(7)
  })

  it('leaves transforms to the engine on the elements it positions', () => {
    // Tailwind 4 writes translate-*, rotate-* and scale-* through the CSS
    // translate/rotate/scale properties, which stack with the transform the
    // engine sets every frame and would move these elements twice.
    const { container } = render(<Story />)
    const positioned = container.querySelectorAll(
      '[data-hp], [data-hw], [data-hcta], [data-pw], [data-pc], [data-pq], [data-pexp], [data-q1], [data-q2], [data-ml], [data-mp], [data-mc], [data-mpanels], [data-dw], [data-dcon], [data-dopp], [data-br], [data-bo], [data-bf], [data-ch], [data-dc], [data-fl], [data-fin], [data-reveal]'
    )
    expect(positioned.length).toBeGreaterThan(50)
    for (const el of positioned) {
      expect(el.className).not.toMatch(/(^|\s)-?(translate|rotate|scale)-/)
    }
  })

  it('shows the inverse lockup at the model hub and in the footer', () => {
    render(<Story />)

    const logos = screen.getAllByRole('img', { name: 'Coresity' })
    expect(logos).toHaveLength(2)
    for (const logo of logos) {
      expect(logo).toHaveAttribute(
        'src',
        '/CORESITY-IMAGE/lockup-inverse@2x.png'
      )
    }
  })

  it('hides the canvas and grain from assistive technology', () => {
    const { container } = render(<Story />)

    expect(
      container.querySelector('canvas[data-story-canvas]')
    ).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })
})
