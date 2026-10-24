import type { Metadata } from 'next'

import LegalPage from 'src/components/LegalPage/LegalPage'
import { CONTACT_EMAIL, RETENTION } from 'src/lib/links'

export const metadata: Metadata = {
  title: 'Data Processing Agreement',
  description:
    'How Coresity processes the personal data you send through the Contact page: purpose, roles, retention, security and your rights.',
}

export default function DataProcessingPage() {
  return (
    <LegalPage
      title="Data Processing Agreement"
      intro="This agreement sets out how Coresity Solutions processes the personal data you send us through the Contact page, on WhatsApp, by phone or by email. It applies alongside the Privacy Policy and takes effect when you first send us data."
      sections={[
        {
          title: 'Roles',
          body: [
            'Coresity Solutions decides why and how your data is processed and is the data controller. You are the data subject.',
            'Google LLC processes form responses on our behalf through Google Forms, and WhatsApp LLC and your phone network carry messages and calls. They act under their own terms as processors or independent services. We use no other sub-processors.',
          ],
        },
        {
          title: 'What is processed, and why',
          body: [
            [
              'Identity and contact details: your name, phone number, WhatsApp number or email address.',
              'What you tell us about your goal, your current situation, what you have tried and what is holding you back.',
            ],
            'The sole purpose is to understand your situation and get in touch with you about it. We process only what you give us, only for that purpose, and only on your request to be contacted.',
          ],
        },
        {
          title: 'Our commitments',
          body: [
            [
              'We do not share, sell, rent or disclose your data to third parties, and we do not use it for advertising or profiling.',
              'Access is limited to the Coresity team members who respond to enquiries.',
              'Form responses sit in a Google account protected by strong authentication; message history stays on the devices and accounts we use to talk to you.',
              `We delete your data ${RETENTION}, or sooner on your request.`,
              'If we become aware that your data has been accessed without authorisation, we will tell you without undue delay and explain what happened and what we are doing about it.',
            ],
          ],
        },
        {
          title: 'Your rights',
          body: [
            `You can ask to see, correct, receive a copy of, or delete the data we hold about you, or object to its processing, by messaging us or emailing ${CONTACT_EMAIL}. We act on requests within a reasonable time, normally within 14 days, and we never charge for them.`,
            'We process your data under applicable data protection law, including the Nigeria Data Protection Act 2023. If you believe we have handled your data wrongly, tell us first so we can put it right; you may also complain to the data protection authority where you live.',
          ],
        },
        {
          title: 'Changes',
          body: [
            'If this agreement changes, the new version appears on this page with a new effective date. The version in force is the one with the date at the top.',
          ],
        },
      ]}
    />
  )
}
