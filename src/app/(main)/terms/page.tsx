import type { Metadata } from 'next'

import LegalPage from 'src/components/LegalPage/LegalPage'
import { CONTACT_EMAIL } from 'src/lib/links'

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'The terms that apply to using the Coresity website and contacting Coresity.',
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro="These terms apply to using this website and to contacting Coresity through it. Tools, programs and guidance you buy or take part in are covered by their own agreement, which you see before you commit to anything."
      sections={[
        {
          title: 'Using the site',
          body: [
            'You may read, link to and share this site freely. You may not copy its content for commercial use, scrape it, or try to interfere with how it runs.',
            'The text, design, images and the Coresity name and mark belong to Coresity Solutions. Trademarks of other companies named on the site belong to their owners.',
          ],
        },
        {
          title: 'Contacting us',
          body: [
            'Sending the form, a message, an email or a call is an invitation to talk. It does not create an engagement, a contract or an obligation on either side until we agree the work in writing.',
            'Please only send us information you have the right to share. Do not send passwords, card numbers or other secrets; we will never ask for them in a form or a chat.',
          ],
        },
        {
          title: 'Information, not advice',
          body: [
            'What is published on this site is general information. It is not legal, financial, medical, safety or other professional advice for your specific situation, and acting on it is your decision. See the Disclaimer.',
          ],
        },
        {
          title: 'Third-party services',
          body: [
            'The Contact page uses Google Forms and links to WhatsApp. Those services are provided by Google and WhatsApp under their own terms and privacy policies, which apply when you use them.',
          ],
        },
        {
          title: 'Liability',
          body: [
            'The site is provided as it is. We take care to keep it accurate and available, but we do not guarantee that it is error-free or always reachable, and we are not liable for loss arising from your use of the site or reliance on its content, to the extent the law allows.',
          ],
        },
        {
          title: 'Law and changes',
          body: [
            'These terms are governed by the laws of the Federal Republic of Nigeria. We may update them; the version on this page, with its effective date, is the one that applies.',
            `Questions about these terms: ${CONTACT_EMAIL}.`,
          ],
        },
      ]}
    />
  )
}
