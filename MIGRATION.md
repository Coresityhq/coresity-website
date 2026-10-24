# Migration: RedwoodJS 8.9 → Next.js 16

This records how the site moved from RedwoodJS to Next.js, what was removed or replaced, what the security audit found, and what is left to do. The Redwood code is still in git history up to the tag `pre-nextjs`.

## Summary

| Before                                                      | After                                                      |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| RedwoodJS 8.9 (web + api workspaces), React 18              | Next.js 16.4 App Router, React 19.3, static export         |
| Node 20 (end-of-life), Yarn 4                               | Node 24, npm 11, lockfile v3                               |
| Tailwind CSS 3.4 (`tailwind.config.js`, PostCSS 3)          | Tailwind CSS 4.3 (CSS-first config in `globals.css`)       |
| Jest via `@redwoodjs/testing`                               | Vitest 5 + Testing Library + jsdom                         |
| Redwood ESLint config, Prettier 3 + Tailwind plugin         | ESLint 10 flat config + `eslint-config-next`, Prettier 3.9 |
| Google Fonts from `fonts.googleapis.com`                    | Self-hosted fonts via `next/font/google`                   |
| Prisma + SQLite + GraphQL server (unused)                   | Removed. The site has no backend.                          |
| nginx serving `web/dist` with a `200.html` fallback         | nginx serving `out/` with real 404s                        |
| CSP `script-src 'self'` (would block Next's inline scripts) | CSP `script-src 'self'` + per-build sha256 hashes          |

The pages, design tokens, story engine and theme behaviour are unchanged. The copy was rewritten after the migration to speak to operators (see [Follow-up changes](#follow-up-changes-after-the-migration)).

## What the audit of the Redwood project found

- The whole `api/` side was untouched scaffolding: no GraphQL schema, no services, a stub `auth.ts` (`isAuthenticated` always true, `getCurrentUser` throws "Auth is not set up yet"), and a Prisma schema with only the `UserExample` placeholder model. Nothing on the web side queried it. It was removed rather than migrated; there was no functionality to carry over.
- The web side used Redwood in six places only: `Routes.tsx`, `Link`/`routes` in the Navbar, `Metadata` in the four pages, the providers in `App.tsx`, `DevFatalErrorPage`, and `@redwoodjs/testing/web` in the tests.
- No environment variable reached the browser (`includeEnvironmentVariables` was empty), no form posted anywhere (the Contact page is a WhatsApp link and a `mailto:`), and there was no analytics or third-party script.
- The story feature (`src/lib/story`, `src/components/Story`) imported nothing from Redwood and touched the browser only inside effects and handlers, so it moved without code changes beyond `'use client'` directives.

## Route and layout mapping

| Redwood                                                           | Next.js                                                             |
| ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| `<Set wrap={StoryLayout}>` + `/` → `HomePage`                     | `src/app/(story)/layout.tsx` + `page.tsx`                           |
| `<Set wrap={MainLayout}>` + `/about`, `/how-it-works`, `/contact` | `src/app/(main)/layout.tsx` + `about/`, `how-it-works/`, `contact/` |
| `<Route notfound page={NotFoundPage} />`                          | `src/app/not-found.tsx` → `out/404.html`, served with status 404    |
| `FatalErrorPage` / `FatalErrorBoundary`                           | `src/app/error.tsx` and `src/app/global-error.tsx`                  |
| `App.tsx`, `entry.client.tsx`, `index.html`                       | `src/app/layout.tsx` (fonts, metadata, `<html>`/`<body>`)           |
| `<Metadata title=... />` with `titleTemplate`                     | `export const metadata` with `title.template: '%s                   | Coresity'` |
| `web/public/*`                                                    | `public/*` at the same URLs                                         |

Page titles are now "About | Coresity" and so on. Before, the pages passed "About | Coresity" into a "%PageTitle | %AppTitle" template, producing "About | Coresity | Coresity".

## Code changes in migrated files

- `Navbar.tsx`: `next/link` with literal hrefs instead of `@redwoodjs/router`'s `Link` and `routes`; marked `'use client'` (it has state).
- `'use client'` added to `StoryHeader.tsx`, `Story.tsx`, `scenes/HeroScene.tsx` and `StoryLayout.tsx`, the files that use hooks or browser APIs. The other scenes are unchanged.
- `MainLayout.tsx`: typed `children`; `flex-grow` → `grow` (removed in Tailwind 4).
- `Button.tsx`: `focus-visible:outline-none` → `focus-visible:outline-hidden` (renamed in Tailwind 4; same effect).
- `NotFoundPage`: rebuilt on the site's tokens inside `MainLayout`, without the scaffold's inline `<style>` and nested `<main>`.
- `web/src/index.css` → `src/app/globals.css`: see Tailwind below. The design tokens are otherwise verbatim.
- Tests: `@redwoodjs/testing/web` → `@testing-library/react`; `jest.fn` → `vi.fn`; `theme.test.ts` uses `vi.resetModules()` + dynamic import instead of `jest.isolateModules`; the `StoryLayout` test asserts `backgroundColor` because jsdom 30 reports the `background` shorthand through its longhands. The four identical page smoke tests became one `src/app/pages.test.tsx`, which also covers the 404 page.
- `e2e/story.spec.ts`: the `scrollScene` helper now waits for the scene element before scrolling, because the story mounts after the page's `load` event (see below), where the Redwood single-page app rendered during it. It also scrolls with `behavior: 'instant'`: the page's `scroll-behavior: smooth` animates `window.scrollTo`, and a long jump was still in flight when the phone test measured the final scene. The tests' assertions are unchanged.

### The homepage renders on the client only

Redwood built `/` with `--no-prerender`, so production served an empty shell and the browser rendered the story. The Next.js version keeps that: `src/app/(story)/StoryShell.tsx` loads `StoryLayout` with `next/dynamic` and `ssr: false`. Server-rendering the story would have changed what visitors see: the theme comes from `localStorage` and the system preference (the server would always paint light), and the engine hides the hero's words at boot before animating them in (the server would paint the finished headline first). A small inline script in the root layout paints the `<html>` ground in the visitor's theme before the story mounts, so dark-mode visitors never see a white flash.

To server-render the story later: move the `--c-*` theme variables from inline `style` to CSS rules keyed on `data-theme`, set `data-theme` from the boot script, hide `[data-hw]`/`[data-hcta]` through CSS when JavaScript is present, and drop `StoryShell`.

## Tailwind CSS 3 → 4

`globals.css` starts with `@import 'tailwindcss'` and two `@theme` blocks. Things checked in this codebase:

- `flex-grow` was removed in v4 (→ `grow`); `outline-none` changed meaning (→ `outline-hidden`). Those were the only two hits.
- The design tokens reuse Tailwind's theme variable names (`--text-sm`, `--text-4xl`, `--radius-lg`, `--shadow-*`, `--ease-out`). In v4, utilities read those variables, and the tokens in `:root` would win, resizing `rounded-lg` to 14px and `text-4xl` to 38px. A `@theme inline` block pins Tailwind's defaults for those utilities; `var(--text-sm)` and friends in the markup still resolve to the tokens. Verified in Chromium: `rounded-lg` = 8px, `rounded-md` = 6px, `text-4xl` = 36px, as in v3.
- Every `border*` class carries an explicit colour, so v4's `currentColor` default does not apply.
- v4 only applies `hover:` styles on devices that support hover and resets `button` to `cursor: default`. `@custom-variant hover (&:hover)` and a base rule restore the v3 behaviour the story's hover effects rely on.
- The font families are now defined in `@theme` from the `next/font` variables, which also generates the `font-display` and `font-body` utilities.

## Dependencies

Removed:

| Package                                                                                        | Why                                                   |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `@redwoodjs/core`, `project-config`, `web`, `router`, `forms`, `vite`, `api`, `graphql-server` | RedwoodJS; replaced by Next.js                        |
| `@redwoodjs/testing`, Jest, `@storybook/*` (transitive)                                        | Replaced by Vitest + Testing Library; stories deleted |
| Prisma, GraphQL Yoga, Apollo (transitive through Redwood)                                      | Nothing used them                                     |
| `lucide-react`                                                                                 | Listed but never imported                             |
| `autoprefixer`, `postcss-loader`                                                               | Tailwind 4 handles prefixing; no webpack loaders      |
| the `resolutions` download from `verdaccio.tobbe.dev`                                          | Redwood-only workaround                               |

Added or upgraded (all pinned exactly in `package.json`; `package-lock.json` is the reproducible install):

| Package                                                   | Version                       |
| --------------------------------------------------------- | ----------------------------- |
| `next`                                                    | 16.4.2                        |
| `react`, `react-dom`                                      | 19.3.1                        |
| `typescript`                                              | 5.9.3                         |
| `tailwindcss`, `@tailwindcss/postcss`                     | 4.3.3                         |
| `eslint` / `eslint-config-next`                           | 10.13.0 / 16.4.2              |
| `prettier` / `prettier-plugin-tailwindcss`                | 3.9.10 / 0.8.1                |
| `vitest`, `@vitejs/plugin-react`, `jsdom`                 | 5.0.5, 6.1.2, 30.1.3          |
| `@testing-library/react`, `dom`, `jest-dom`, `user-event` | 16.3.3, 10.4.2, 7.0.1, 14.6.8 |
| `@playwright/test`                                        | 1.64.1                        |

Storybook: the repository had `*.stories.tsx` files but no Storybook installation or configuration. They were deleted rather than adding Storybook. The unused `CTA` scaffold component (whose test imported `./Cta` and only resolved on case-insensitive filesystems) was deleted too.

## Security audit

`npm audit` on the full install reports **5 high-severity findings, all one advisory**: `braces` ≤ 3.0.3 (GHSA-vfj7-8cjw-p6xm, stack exhaustion through deeply nested glob patterns), reached only through `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch`. No patched version of `braces` exists yet. It is a development-only dependency used by the linter; the shipped image contains nginx and static files, no Node.js.

`npm audit --omit=dev` (what could reach production) reports **0 vulnerabilities**.

Other changes with a security effect:

- The Content-Security-Policy no longer allows `fonts.googleapis.com` or `fonts.gstatic.com`; fonts are self-hosted. `script-src` is `'self'` plus the sha256 hashes of this build's inline scripts, rendered by `scripts/csp-hashes.mjs`; `'unsafe-inline'` is never used for scripts.
- Unknown routes return a real 404 instead of a 200 with the client-side not-found page.
- `web/public/README.md`, previously served at `/README.md`, is gone.
- The build image moved from Node 20 (end-of-life) to Node 24; the runtime image is unchanged (`nginxinc/nginx-unprivileged:1.30.5-alpine`, read-only, no capabilities).

## Validation performed

On Node 24.21.0 / npm 11.19.0, from a clean `npm ci`:

- `tsc --noEmit`, `eslint .`, `prettier --check .`: clean.
- `vitest run`: 13 files, 52 tests pass.
- `next build`: 9 routes exported; `csp-hashes.mjs` rendered 12 script hashes from 10 pages.
- `scripts/docker/smoke.sh` against `npm run preview` (which sends the rendered security headers): all 13 checks pass.
- `playwright test` against the production export: all 12 tests pass (10 for the homepage story, the contact form's submission with Google intercepted, and the site-wide dark theme on a prerendered page), with the real Content-Security-Policy applied and no console errors.
- Portfolio images: a 390px phone at 3x and a 1440px desktop at 2x each download the three 1200px AVIF variants, 202 KB in total, where the originals were 8.7 MB.
- Docker was **not** installed on the machine that performed the migration, so `scripts/docker/build.sh` and the container smoke test were not run there. The Dockerfile follows the same stages as before (`npm ci` → `npm run build` → nginx) and the nginx routing it ships was exercised through `scripts/preview.mjs`, which mirrors `docker/nginx/default.conf`. Run `scripts/docker/build.sh && scripts/docker/prod.sh up && scripts/docker/smoke.sh` on a machine with Docker before the first release.

## Follow-up changes after the migration

A review of the migrated site in the browser found three regressions from the Tailwind 3 → 4 move and one from the root layout, all fixed:

- **Primary buttons rendered violet text on a violet background** (the header's call to action, the Contact page's WhatsApp button), and story headings would have been invisible in dark mode. Tailwind 4 places its utilities in a real CSS cascade layer, so the unlayered element rules in `globals.css` (`a { color }`, `h1–h6 { color }`, `:focus-visible`) beat every `text-*` utility. Tailwind 3 only ordered rules by source. Those element rules now sit in `@layer base`, where they belong.
- **EXPERTISE, OPPORTUNITY and the model panels sat off-centre** as the pinned scenes scrolled. Tailwind 4 implements `-translate-x-1/2` with the CSS `translate` property, which stacks with the `transform` the story engine writes every frame, so those elements moved twice. The utilities were removed from engine-positioned elements and a unit test now fails if one comes back.
- **The deploy ring's labels overlapped on phones.** Labels now sit beside, above or below their dot depending on where it is on the ring.
- **A hydration warning on every page load** in development: the theme boot script sets an inline style on `<html>` before React hydrates. `<html>` now carries `suppressHydrationWarning`, which only covers that element's own attributes.

Other changes made at the same time:

- **Images.** The three portfolio pictures were 2.6–3.4 MB JPEGs. `scripts/images.mjs` (sharp) now builds AVIF, WebP and JPEG variants at 480, 800 and 1200 px from the originals in `assets/work/`; the story serves them through `<picture>` with `srcset`/`sizes`, intrinsic dimensions and lazy loading. A phone fetches about 13–25 KB per picture, a 2x desktop about 50–100 KB. nginx and the preview server cache `/CORESITY-IMAGE/` for a day. The HR Boolean Search picture was replaced with the new artwork.
- **Copy.** Every scene, the three pages and the metadata were rewritten around the operator: someone who needs practical expertise to get something done, pass something, implement something, or solve a real problem. The six-step model is now Problem → Expertise → Distill → Shape → Apply → Result; the three levels of help are Tools, Programs and Guidance; the How It Works page shares its four steps with the story. Every call to action is "Get started" and leads to the Contact page (`GET_STARTED_URL` in `src/lib/links.ts`).
- **Playwright** honours `PORT` so the e2e suite can run while another server holds 8910.
- **Contact and legal pages.** The Contact page offers WhatsApp, a phone number, two WhatsApp groups and Coresity's own form, which asks for the goal, what success looks like, the kind of help, the current situation and what is holding the person back, then posts them into the existing Google Form (fused into its two free-text questions) without showing Google's form. Four legal pages (Privacy Policy, Terms, Data Processing Agreement, Disclaimer) share one `LegalPage` component and are linked from the footer line. The CSP allows `connect-src https://docs.google.com` for the submission; because Google sends no CORS headers the response is opaque, so delivery cannot be confirmed in the browser and WhatsApp stays the fallback.
- **One design system.** Every page now uses the story's header (`SiteHeader`, with the scene index on the homepage and the navigation elsewhere), footer line, palette, type and theme. The theme moved from inline variables on a wrapper to `<html>`: the boot script in `src/app/layout.tsx` applies it before React runs and `ThemeShell` keeps it in sync, so prerendered pages render dark for dark-mode visitors without a flash. `Navbar`, `Footer` and `StoryHeader` were replaced; `PageIntro`, `StepsRule` and `LevelsGrid` are shared between the story and the pages.

## Remaining limitations

- The Contact page carries the real WhatsApp and phone number, two group links and the Google Form (`src/lib/links.ts`). The email address `hello@coresity.com` and the two group labels were not supplied and should be confirmed. The legal pages state a 12-month retention period and Nigerian governing law; both are editable in one place and should be checked by whoever owns them.
- The homepage story is client-rendered (see above), so its HTML contains the title and description but not the story's text. This matches the previous deployment.
- The footer year is computed at build time (`new Date().getFullYear()` in a static export), so a deployment left running across New Year shows the previous year until rebuilt.
- `next build` downloads the three Google Fonts once per build; a build without network access fails at that step. Switch to `next/font/local` with committed `.woff2` files if that becomes a problem.
- Story engine hover effects rely on the restored v3 hover behaviour; if that `@custom-variant` is ever removed, touch devices lose them.
