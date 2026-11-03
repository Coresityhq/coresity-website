import { LEGAL_PAGES } from 'src/components/LegalPage/LegalPage'

// The site's footer line: two rows, the inverse lockup across from the legal
// links, the one-line model across from the copyright. It stacks on a phone.
// The story's final scene closes on it; SiteFooter puts it on a dark band
// under every other page.

const FooterLine = ({ className = '' }: { className?: string }) => (
  <div
    className={`grid grid-cols-1 items-center justify-between gap-x-8 gap-y-3 font-mono text-[11px] leading-[1.5] tracking-[0.12em] text-[var(--ink-400)] uppercase sm:grid-cols-[auto_auto] ${className}`}
  >
    <img
      src="/CORESITY-IMAGE/lockup-inverse@2x.png"
      alt="Coresity"
      width="636"
      height="137"
      className="h-6 w-auto"
    />
    <span className="flex flex-wrap gap-x-4 gap-y-1 sm:justify-end sm:justify-self-end">
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
    <span>Problem → expertise → tool → result</span>
    <span className="sm:justify-self-end">© 2026 Coresity Solutions</span>
  </div>
)

export default FooterLine
