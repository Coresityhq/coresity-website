import { test, expect } from '@playwright/test'

import { ENTRY } from '../src/lib/googleForm'

// The Contact page's form and the site-wide theme on a prerendered page.
// Google is never contacted: the submission is intercepted and inspected.

test('the contact form posts the fused answers to the Google Form', async ({
  page,
}) => {
  let posted = ''
  await page.route('**/formResponse', async (route) => {
    posted = route.request().postData() ?? ''
    await route.fulfill({ status: 200, body: '' })
  })

  await page.goto('/contact')
  await page.getByLabel('Full name').fill('Ada Lovelace')
  await page.getByLabel('Phone / WhatsApp').fill('08100000000')
  await page.getByLabel('Email').fill('ada@example.com')
  await page
    .getByLabel('What do you want to accomplish?')
    .fill('Pass the PMP exam')
  await page
    .getByLabel('What would success look like?')
    .fill('Certified by June')
  // The radio itself is visually hidden; its chip is what people click.
  await page.getByText('Training', { exact: true }).click()
  await expect(page.getByLabel('Training')).toBeChecked()
  await page
    .getByLabel('Where are you right now?')
    .fill('Read the guide twice, failed one mock')
  await page
    .getByLabel('What is holding you back?')
    .fill('Time management in the exam')
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: 'Send →' }).click()

  await expect(page.getByRole('status')).toContainText(
    'Thanks. We have your note'
  )
  const body = new URLSearchParams(posted)
  expect(body.get(ENTRY.name)).toBe('Ada Lovelace')
  expect(body.get(ENTRY.achieve)).toBe(
    'Goal: Pass the PMP exam\n\nSuccess looks like: Certified by June\n\nHelp needed: Training'
  )
  expect(body.get(ENTRY.now)).toBe(
    'Current situation: Read the guide twice, failed one mock\n\nWhat is holding me back: Time management in the exam'
  )
})

test('a saved dark theme applies to a prerendered page', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  await page.addInitScript(() => localStorage.setItem('coresity-theme', 'Dark'))
  await page.goto('/about')

  const html = page.locator('html')
  await expect(html).toHaveAttribute('data-theme', 'dark')
  await expect(html).toHaveCSS('background-color', 'rgb(19, 16, 34)')
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS(
    'color',
    'rgb(246, 245, 250)'
  )
  await page.getByRole('button', { name: 'Toggle light and dark mode' }).click()
  await expect(html).toHaveAttribute('data-theme', 'light')
  await expect(html).toHaveCSS('background-color', 'rgb(246, 245, 250)')
  expect(errors).toEqual([])
})
