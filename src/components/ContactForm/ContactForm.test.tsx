import userEvent from '@testing-library/user-event'

import { render, screen } from '@testing-library/react'

import { ENTRY, FORM_RESPONSE_URL } from 'src/lib/googleForm'

import ContactForm from './ContactForm'

const fill = async () => {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText('Full name'), 'Ada Lovelace')
  await user.type(screen.getByLabelText('Phone / WhatsApp'), '08100000000')
  await user.type(screen.getByLabelText('Email'), 'ada@example.com')
  await user.type(
    screen.getByLabelText('What do you want to accomplish?'),
    'Pass the PMP exam'
  )
  await user.type(
    screen.getByLabelText('What would success look like?'),
    'Certified by June'
  )
  await user.click(screen.getByLabelText('Training'))
  await user.type(
    screen.getByLabelText('Where are you right now?'),
    'Read the guide twice, failed one mock'
  )
  await user.type(
    screen.getByLabelText('What is holding you back?'),
    'Time management in the exam'
  )
  await user.click(screen.getByRole('checkbox'))
  await user.click(screen.getByRole('button', { name: 'Send →' }))
}

describe('ContactForm', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('posts the fused answers to the Google Form and says thanks', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ type: 'opaque' })
    vi.stubGlobal('fetch', fetchMock)
    render(<ContactForm />)

    await fill()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe(FORM_RESPONSE_URL)
    expect(init.method).toBe('POST')
    expect(init.mode).toBe('no-cors')
    const body = init.body as URLSearchParams
    expect(body.get(ENTRY.name)).toBe('Ada Lovelace')
    expect(body.get(ENTRY.email)).toBe('ada@example.com')
    expect(body.get(ENTRY.phone)).toBe('08100000000')
    expect(body.get(ENTRY.achieve)).toBe(
      'Goal: Pass the PMP exam\n\nSuccess looks like: Certified by June\n\nHelp needed: Training'
    )
    expect(body.get(ENTRY.now)).toBe(
      'Current situation: Read the guide twice, failed one mock\n\nWhat is holding me back: Time management in the exam'
    )
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Thanks. We have your note'
    )
    expect(screen.queryByRole('button', { name: 'Send →' })).toBeNull()
  })

  it('keeps the form and offers WhatsApp when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')))
    render(<ContactForm />)

    await fill()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'That didn’t send'
    )
    expect(screen.getByLabelText('Full name')).toHaveValue('Ada Lovelace')
    expect(screen.getByRole('button', { name: 'Send →' })).toBeEnabled()
  })

  it('sends nothing when the honeypot is filled', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const { container } = render(<ContactForm />)

    const trap = container.querySelector(
      'input[name="company"]'
    ) as HTMLInputElement
    await userEvent.type(trap, 'Spam Ltd')
    await fill()

    expect(fetchMock).not.toHaveBeenCalled()
    expect(await screen.findByRole('status')).toBeInTheDocument()
  })
})
