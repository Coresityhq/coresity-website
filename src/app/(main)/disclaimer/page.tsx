import type { Metadata } from 'next'

import LegalPage from 'src/components/LegalPage/LegalPage'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'What the information on the Coresity website is, and what it is not.',
}

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      intro="Coresity gives operators practical expertise to get things done. This page says plainly what the content on this site is, and what it is not, so you can decide how to use it."
      sections={[
        {
          title: 'General information',
          body: [
            'Everything published on this site, including field notes, descriptions of tools and programs, and examples of work, is general information. It describes approaches that have worked for others. It is not advice tailored to your situation.',
          ],
        },
        {
          title: 'Not professional advice',
          body: [
            'Nothing here is legal, financial, tax, medical, health-and-safety or other regulated professional advice. Where a decision needs a qualified professional who knows your circumstances, consult one. Certification, compliance and exam requirements come from the bodies that set them; check the current rules with those bodies.',
          ],
        },
        {
          title: 'Results depend on you',
          body: [
            'Tools, programs and guidance help people get results, but the result depends on your situation, your effort and factors outside anyone’s control. Examples on this site show what particular operators achieved; they are not a promise of what you will achieve.',
          ],
        },
        {
          title: 'Third-party links and services',
          body: [
            'The site links to services we do not run, such as WhatsApp and Google Forms. We are not responsible for their content, availability or how they handle your data; their own terms apply.',
          ],
        },
        {
          title: 'Accuracy and availability',
          body: [
            'We keep the site accurate and up to date as best we can, but we do not warrant that it is complete, current or free of errors, or that it will always be available.',
          ],
        },
      ]}
    />
  )
}
