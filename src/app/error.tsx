'use client'

// Shown when a page throws during rendering. Kept deliberately simple so it
// cannot fail itself; `reset` re-renders the route.
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface-subtle)] px-4 text-center">
      <section className="w-full max-w-lg rounded-[var(--radius-md)] bg-white p-8 shadow-[var(--shadow-md)]">
        <h1 className="mb-6 text-3xl font-semibold text-[var(--text-heading)]">
          Something went wrong
        </h1>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-10 items-center rounded-[var(--radius-sm)] bg-[var(--brand)] px-4 font-semibold text-[var(--text-inverse)] hover:bg-[var(--brand-hover)]"
        >
          Try again
        </button>
      </section>
    </main>
  )
}
