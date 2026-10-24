// The Contact page's form posts into a Google Form, so responses land in the
// same place as before without anyone seeing Google's form. The Google Form
// has five questions; the richer answers from our form are fused into its two
// free-text questions.
//
// If the Google Form's questions change, re-read its entry ids: open the
// form's /viewform page, view source, and find `FB_PUBLIC_LOAD_DATA_`; each
// question lists its id after the title.

export const FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdghnfOGStIW3iuxzsHnMqMlXGwbv4mPiReR7UKgTPIto3pcQ/formResponse'

export const ENTRY = {
  name: 'entry.1621912667', // Full name
  email: 'entry.1993300934', // Email address
  achieve: 'entry.1727831875', // What you're trying to achieve (paragraph)
  now: 'entry.534735766', // Where are you right now
  phone: 'entry.1061849039', // Phone / WhatsApp number
} as const

export const HELP_OPTIONS = [
  'Guidance',
  'Training',
  'Expert advice',
  'A strategy',
  'Hands-on assistance',
  'Not sure yet',
] as const

export type Submission = {
  name: string
  email: string
  phone: string
  /** The goal: what they want to accomplish. */
  goal: string
  /** The desired outcome: what success looks like. */
  outcome: string
  /** The help they need, one of HELP_OPTIONS. */
  help: string
  /** The current situation and what they have tried. */
  situation: string
  /** The problem or knowledge gap: what is holding them back. */
  blocker: string
}

const part = (label: string, text: string) => {
  const t = text.trim()
  return t ? `${label}: ${t}` : null
}

const join = (parts: (string | null)[]) => parts.filter(Boolean).join('\n\n')

/** The urlencoded body the Google Form accepts, with the answers fused. */
export const composeSubmission = (v: Submission) =>
  new URLSearchParams({
    [ENTRY.name]: v.name.trim(),
    [ENTRY.email]: v.email.trim(),
    [ENTRY.phone]: v.phone.trim(),
    [ENTRY.achieve]: join([
      part('Goal', v.goal),
      part('Success looks like', v.outcome),
      part('Help needed', v.help),
    ]),
    [ENTRY.now]: join([
      part('Current situation', v.situation),
      part('What is holding me back', v.blocker),
    ]),
  })

/**
 * Sends a submission. Google answers without CORS headers, so the request
 * runs in no-cors mode and the reply is opaque: resolving means the request
 * went out, rejecting means it did not.
 */
export const submitToGoogleForm = (v: Submission) =>
  fetch(FORM_RESPONSE_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: composeSubmission(v),
  })
