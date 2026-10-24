import type { Metadata } from 'next'
import Link from 'next/link'

import Button from 'src/components/Button/Button'
import ContactForm from 'src/components/ContactForm/ContactForm'
import PageIntro from 'src/components/PageIntro/PageIntro'
import {
  CONTACT_EMAIL,
  PHONE_DISPLAY,
  PHONE_URL,
  RETENTION,
  WHATSAPP_GROUPS,
  WHATSAPP_URL,
} from 'src/lib/links'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us what you are working toward and we will show you what to do next. Message us on WhatsApp, call, or send the short form.',
}

const BLOCK_TITLE =
  'font-display text-[length:var(--text-2xl)] leading-[var(--lh-2xl)] font-semibold text-[var(--c-ink)]'

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title={
          <>
            Tell us what you need to{' '}
            <span className="text-[var(--c-vio)]">get done.</span>
          </>
        }
        lede="Trying to pass something, implement something, or solve a real problem? Tell us what you’re working toward and we’ll show you what to do next. Message us, call, or send the form."
      />

      <div className="grid gap-x-16 gap-y-14 px-[5vw] pb-[14vh] lg:grid-cols-[2fr_3fr] lg:items-start">
        <div className="flex flex-col gap-14">
          <section className="border-t border-[var(--c-ink)] pt-8">
            <h2 className={BLOCK_TITLE}>Talk to us</h2>
            <p className="mt-3 max-w-[420px] text-[length:var(--text-base)] leading-[var(--lh-base)] text-[var(--c-body2)]">
              The quickest way. Say what you&apos;re working on and we&apos;ll
              take it from there.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href={WHATSAPP_URL}>
                Chat on WhatsApp
              </Button>
              <Button variant="outline" size="lg" href={PHONE_URL}>
                Call {PHONE_DISPLAY}
              </Button>
            </div>
            <p className="mt-5 font-mono text-xs text-[var(--c-muted)]">
              Prefer email?{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[var(--c-vio)]"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <section className="border-t border-[var(--c-ink)] pt-8">
            <h2 className={BLOCK_TITLE}>Join other operators</h2>
            <p className="mt-3 max-w-[420px] text-[length:var(--text-base)] leading-[var(--lh-base)] text-[var(--c-body2)]">
              Two WhatsApp groups, open to anyone.
            </p>
            <ul className="mt-6">
              {WHATSAPP_GROUPS.map((g) => (
                <li key={g.url}>
                  <a
                    href={g.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-[var(--c-line)] py-5 text-[var(--c-ink)] transition-[padding,background-color] duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-[var(--c-surface)] hover:pl-4 hover:text-[var(--c-ink)] hover:no-underline"
                  >
                    <span>
                      <span className="block font-display text-[length:clamp(18px,1.6vw,24px)] leading-[1.2] font-medium tracking-[-0.015em]">
                        {g.label}
                      </span>
                      <span className="mt-1 block text-[length:var(--text-sm)] leading-[var(--lh-sm)] text-[var(--c-body2)]">
                        {g.desc}
                      </span>
                    </span>
                    <span className="font-mono text-xs tracking-[0.12em] text-[var(--c-vio)] uppercase transition-[gap] group-hover:text-[var(--c-ink)]">
                      Join →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section
          id="form"
          className="scroll-mt-24 border border-[var(--c-line)] bg-[var(--c-surface)] p-6 md:p-10"
        >
          <div className="mb-8 flex items-center gap-[14px] font-mono text-[11px] tracking-[0.16em] text-[var(--c-muted)] uppercase">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            Or tell us in writing
          </div>
          <ContactForm />
          <p className="mt-8 border-t border-[var(--c-line)] pt-5 text-[length:var(--text-sm)] leading-[var(--lh-sm)] text-[var(--c-muted)]">
            What you share here is used only to understand your situation and
            get back to you. We don&apos;t share it with anyone else, and we
            delete it {RETENTION}. See the{' '}
            <Link href="/privacy" className="font-semibold text-[var(--c-vio)]">
              Privacy Policy
            </Link>
            , the{' '}
            <Link
              href="/data-processing"
              className="font-semibold text-[var(--c-vio)]"
            >
              Data Processing Agreement
            </Link>{' '}
            and the{' '}
            <Link href="/terms" className="font-semibold text-[var(--c-vio)]">
              Terms
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  )
}
