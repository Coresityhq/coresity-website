import { LEGAL_PAGES } from 'src/components/LegalPage/LegalPage'

// The site's footer line: the inverse lockup, the one-line model, the legal
// links and the copyright. The story's final scene lays it over its dark
// ground; SiteFooter puts it on a dark band under every other page.

const FooterLine = ({ className = '' }: { className?: string }) => (
  <div
    className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-4 font-mono text-[11px] tracking-[0.12em] text-[var(--ink-400)] uppercase ${className}`}
  >
    <img
      src="/CORESITY-IMAGE/lockup-inverse@2x.png"
      alt="Coresity"
      width="636"
      height="137"
      className="h-6 w-auto"
    />
    <span>Problem → expertise → tool → result</span>
    <span className="flex flex-wrap gap-x-4 gap-y-1">
      {LEGAL_PAGES.map((p) => (
        <a
          key={p.href}
          href={p.href}
          className="text-[var(--ink-400)] hover:text-white hover:no-underline"
        >
          {p.label}
        </a>
      ))}
    </span>
    <span>© 2026 Coresity Solutions</span>
  </div>
)

export default FooterLine
