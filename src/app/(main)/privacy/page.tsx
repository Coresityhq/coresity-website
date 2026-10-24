import type { Metadata } from 'next'

import LegalPage from 'src/components/LegalPage/LegalPage'
import { CONTACT_EMAIL, PHONE_DISPLAY, RETENTION } from 'src/lib/links'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What Coresity collects when you contact us, what it is used for, who can see it and how long it is kept.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what we collect when you contact Coresity, what we use it for, who can see it and how long we keep it. The short version: we use what you share only to understand your situation and get back to you, we don’t share it with third parties, and we delete it after a while."
      sections={[
        {
          title: 'What we collect',
          body: [
            'When you fill in the form on the Contact page, we receive what you type: your name and contact details, what you’re trying to achieve and where you are right now.',
            'When you message or call us on WhatsApp or by phone, we receive your number and what you send us. When you email us, we receive your address and your message.',
            'The website itself collects nothing about you. It sets no analytics, no advertising cookies and no tracking. It remembers your light or dark theme choice in your own browser only.',
          ],
        },
        {
          title: 'What we use it for',
          body: [
            'To understand what you need to get done, decide whether and how we can help, and reach out to you about it.',
            'We do not use it for anything else: no marketing lists, no profiling, no selling.',
          ],
        },
        {
          title: 'Who can see it',
          body: [
            'Only the Coresity team. We do not share, sell or rent what you tell us to third parties.',
            'Two services carry your messages for us: the form is hosted by Google Forms, so your answers are stored in Google’s systems under our account; WhatsApp and your phone network carry messages and calls. Each has its own privacy terms, which apply to how they handle the data in transit and storage. We have no other processors.',
          ],
        },
        {
          title: 'How long we keep it',
          body: [
            `Form responses and message history are deleted ${RETENTION}, or sooner if you ask us to.`,
            'If we go on to work together, what is needed for that work is kept for as long as the work lasts and then deleted on the same basis.',
          ],
        },
        {
          title: 'Your choices',
          body: [
            'You can ask us at any time to show you what we hold about you, correct it or delete it. Message us on WhatsApp, call ' +
              PHONE_DISPLAY +
              ' or email ' +
              CONTACT_EMAIL +
              ' and we will do it within a reasonable time, normally within 14 days.',
            'You can also delete your messages on your own side at any time; WhatsApp and your email provider explain how.',
          ],
        },
        {
          title: 'Changes',
          body: [
            'If this policy changes, the new version will appear on this page with a new effective date. The date at the top is the version that applies.',
          ],
        },
      ]}
    />
  )
}
