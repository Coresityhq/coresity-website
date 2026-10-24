'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { FormEvent } from 'react'

import Button from 'src/components/Button/Button'
import { HELP_OPTIONS, submitToGoogleForm } from 'src/lib/googleForm'
import {
  PHONE_DISPLAY,
  PHONE_URL,
  RETENTION,
  WHATSAPP_URL,
} from 'src/lib/links'

// The Coresity form. It asks for the five things that let us help (the goal,
// what success looks like, the kind of help, the current situation, and what
// is holding the person back) and posts them into the Google Form behind the
// scenes (src/lib/googleForm.ts). A hidden "company" field catches bots:
// if it is filled, nothing is sent and the form simply says thanks.

const LABEL =
  'mb-2 block font-mono text-[11px] tracking-[0.14em] text-[var(--c-muted)] uppercase'
const HINT =
  'mb-2 -mt-1 block text-[length:var(--text-sm)] text-[var(--c-faint)]'
const FIELD =
  'w-full rounded-[var(--radius-sm)] border border-[var(--c-line2)] bg-[var(--c-bg)] px-3 py-2.5 text-[length:var(--text-base)] leading-[1.4] text-[var(--c-ink)] placeholder:text-[var(--c-faint)] focus-visible:border-[var(--c-ink)] focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-hidden'
const CHIP =
  'cursor-pointer rounded-full border border-[var(--c-line2)] px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-[var(--c-ink)] uppercase transition-colors peer-checked:border-[var(--c-ink)] peer-checked:bg-[var(--c-ink)] peer-checked:text-[var(--c-bg)] peer-focus-visible:shadow-[var(--shadow-focus)] hover:border-[var(--c-ink)]'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const value = (data: FormData, key: string) => String(data.get(key) ?? '')

const ContactForm = () => {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (value(data, 'company')) {
      setStatus('sent')
      return
    }
    setStatus('sending')
    try {
      await submitToGoogleForm({
        name: value(data, 'name'),
        email: value(data, 'email'),
        phone: value(data, 'phone'),
        goal: value(data, 'goal'),
        outcome: value(data, 'outcome'),
        help: value(data, 'help'),
        situation: value(data, 'situation'),
        blocker: value(data, 'blocker'),
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="py-6">
        <div className="flex items-center gap-[14px] font-mono text-[11px] tracking-[0.16em] text-[var(--c-muted)] uppercase">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          Received
        </div>
        <h3 className="mt-5 font-display text-[length:clamp(28px,3vw,44px)] leading-[1.05] font-bold tracking-[-0.03em] text-[var(--c-ink)]">
          Thanks. We have your note
          <span className="text-[var(--accent)]">.</span>
        </h3>
        <p className="mt-4 max-w-[520px] text-[length:var(--text-base)] leading-[var(--lh-base)] text-[var(--c-body2)]">
          We’ll read it and get back to you by email or WhatsApp. If it’s
          urgent, message us now and mention you filled in the form.
        </p>
        <div className="mt-6">
          <Button variant="outline" href={WHATSAPP_URL}>
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form
      onSubmit={onSubmit}
      noValidate={false}
      className="flex flex-col gap-8"
    >
      <fieldset className="flex flex-col gap-5">
        <legend className="mb-5 font-display text-[length:var(--text-xl)] leading-[var(--lh-xl)] font-semibold text-[var(--c-ink)]">
          About you
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className={LABEL}>
              Full name
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="cf-phone" className={LABEL}>
              Phone / WhatsApp
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={FIELD}
            />
          </div>
        </div>
        <div>
          <label htmlFor="cf-email" className={LABEL}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD}
          />
        </div>
        {/* Honeypot: hidden from people, tempting to bots. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-company">Company</label>
          <input
            id="cf-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-5 font-display text-[length:var(--text-xl)] leading-[var(--lh-xl)] font-semibold text-[var(--c-ink)]">
          What you need
        </legend>
        <div>
          <label htmlFor="cf-goal" className={LABEL}>
            What do you want to accomplish?
          </label>
          <span className={HINT}>
            The goal, and by when if there is a date.
          </span>
          <textarea
            id="cf-goal"
            name="goal"
            required
            rows={3}
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="cf-outcome" className={LABEL}>
            What would success look like?
          </label>
          <span className={HINT}>How you will know it worked.</span>
          <textarea id="cf-outcome" name="outcome" rows={2} className={FIELD} />
        </div>
        <fieldset>
          <legend className={LABEL}>What kind of help do you need?</legend>
          <div className="flex flex-wrap gap-2">
            {HELP_OPTIONS.map((opt) => (
              <label key={opt} className="relative">
                <input
                  type="radio"
                  name="help"
                  value={opt}
                  className="peer sr-only"
                />
                <span className={`inline-block ${CHIP}`}>{opt}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="cf-situation" className={LABEL}>
            Where are you right now?
          </label>
          <span className={HINT}>
            What is already in place, what you have tried, and what happened.
          </span>
          <textarea
            id="cf-situation"
            name="situation"
            required
            rows={3}
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="cf-blocker" className={LABEL}>
            What is holding you back?
          </label>
          <span className={HINT}>The part you don’t yet know how to do.</span>
          <textarea id="cf-blocker" name="blocker" rows={2} className={FIELD} />
        </div>
      </fieldset>

      <div className="flex flex-col gap-5 border-t border-[var(--c-line)] pt-6">
        <label className="flex items-start gap-3 text-[length:var(--text-sm)] leading-[var(--lh-sm)] text-[var(--c-body2)]">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-[3px] h-4 w-4 shrink-0 accent-[var(--c-vio)]"
          />
          <span>
            I agree to the{' '}
            <Link href="/privacy" className="font-semibold text-[var(--c-vio)]">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="font-semibold text-[var(--c-vio)]">
              Terms
            </Link>
            . What I share is used only to understand my situation and get back
            to me, is not shared with anyone else, and is deleted {RETENTION}.
          </span>
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" variant="primary" size="lg" disabled={sending}>
            {sending ? 'Sending…' : 'Send →'}
          </Button>
          <span className="font-mono text-xs text-[var(--c-muted)]">
            We reply by email or WhatsApp
          </span>
        </div>
        <p
          role="alert"
          aria-live="polite"
          className={`text-[length:var(--text-sm)] leading-[var(--lh-sm)] text-[var(--c-amber-ink)] ${
            status === 'error' ? '' : 'hidden'
          }`}
        >
          That didn’t send. Please try again, or{' '}
          <a href={WHATSAPP_URL} className="font-semibold">
            message us on WhatsApp
          </a>{' '}
          or call{' '}
          <a href={PHONE_URL} className="font-semibold">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    </form>
  )
}

export default ContactForm
