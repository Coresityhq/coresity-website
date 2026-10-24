import PageIntro from 'src/components/PageIntro/PageIntro'

// The four legal pages share this shape: a title, when it took effect, a short
// introduction, then numbered sections of paragraphs and bullet lists. Pages
// pass their text as data so the wording lives in one place per page. The
// links between the legal pages are in the footer line.

export type LegalSection = {
  title: string
  /** A string is a paragraph; an array of strings is a bullet list. */
  body: (string | string[])[]
}

export const LEGAL_PAGES = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/data-processing', label: 'Data Processing Agreement' },
  { href: '/disclaimer', label: 'Disclaimer' },
]

export const LEGAL_EFFECTIVE_DATE = '23 October 2026'

type Props = {
  title: string
  intro: string
  sections: LegalSection[]
}

const LegalPage = ({ title, intro, sections }: Props) => (
  <>
    <PageIntro
      eyebrow={`Legal · Effective ${LEGAL_EFFECTIVE_DATE}`}
      title={title}
      lede={intro}
    />
    <div className="px-[5vw] pb-[14vh]">
      <div className="max-w-[860px]">
        {sections.map((s, i) => (
          <section
            key={s.title}
            className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 border-t border-[var(--c-line)] py-9 first:border-[var(--c-ink)]"
          >
            <span className="pt-1 font-mono text-xs tracking-[0.14em] text-[var(--c-vio)]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h2 className="font-display text-[length:var(--text-2xl)] leading-[var(--lh-2xl)] font-semibold text-[var(--c-ink)]">
                {s.title}
              </h2>
              <div className="mt-4 flex flex-col gap-3 text-[length:var(--text-base)] leading-[var(--lh-base)] text-pretty text-[var(--c-body2)]">
                {s.body.map((part, j) =>
                  Array.isArray(part) ? (
                    <ul key={j} className="flex list-disc flex-col gap-2 pl-5">
                      {part.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j}>{part}</p>
                  )
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  </>
)

export default LegalPage
