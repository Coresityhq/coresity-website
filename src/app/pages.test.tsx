import { render } from '@testing-library/react'

import AboutPage from './(main)/about/page'
import ContactPage from './(main)/contact/page'
import DataProcessingPage from './(main)/data-processing/page'
import DisclaimerPage from './(main)/disclaimer/page'
import HowItWorksPage from './(main)/how-it-works/page'
import PrivacyPage from './(main)/privacy/page'
import TermsPage from './(main)/terms/page'
import HomePage from './(story)/page'
import NotFound from './not-found'

// Every page renders without throwing.
describe.each([
  ['HomePage', HomePage],
  ['AboutPage', AboutPage],
  ['HowItWorksPage', HowItWorksPage],
  ['ContactPage', ContactPage],
  ['PrivacyPage', PrivacyPage],
  ['TermsPage', TermsPage],
  ['DataProcessingPage', DataProcessingPage],
  ['DisclaimerPage', DisclaimerPage],
  ['NotFound', NotFound],
])('%s', (_name, Page) => {
  it('renders successfully', () => {
    expect(() => render(<Page />)).not.toThrow()
  })
})
