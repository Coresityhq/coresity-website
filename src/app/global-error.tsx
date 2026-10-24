'use client'

// The last resort: shown when the root layout itself fails, so it renders its
// own <html> and <body> and uses no stylesheet.
const PAGE = {
  display: 'flex',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 0,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  textAlign: 'center',
  backgroundColor: '#f6f5fa',
} as const

const CARD = {
  backgroundColor: 'white',
  borderRadius: '0.25rem',
  width: '32rem',
  maxWidth: '100%',
  padding: '1rem',
  margin: '0 auto',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
} as const

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body style={PAGE}>
        <section style={CARD}>
          <h1
            style={{
              fontSize: '2rem',
              margin: 0,
              fontWeight: 500,
              lineHeight: 1,
              color: '#131022',
            }}
          >
            Something went wrong
          </h1>
          <p>
            <button type="button" onClick={reset}>
              Try again
            </button>
          </p>
        </section>
      </body>
    </html>
  )
}
