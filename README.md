# Coresity

The Coresity website: a [Next.js](https://nextjs.org) 16 site written in TypeScript, exported to static files and served by nginx. It has no server-side code, no database and no runtime configuration.

The homepage is a scroll-driven story (`src/components/Story`, `src/lib/story`). The other pages (About, How It Works, Contact, and the four legal pages) are plain static pages on the same design system: one header (`SiteHeader`), one footer line (`FooterLine`), the story's palette and type, and a light/dark theme that applies site-wide and is remembered. The copy speaks to operators: people and teams who need practical expertise to get something done.

## Requirements

- **Node.js 24.x** (`.nvmrc` has the version; `nvm use` picks it up). `engines` in `package.json` enforces 24.15 or newer.
- **npm 11** (ships with Node 24). There is no Yarn or pnpm in this project.
- For the Docker image and deployment: Docker with Compose v2 and buildx. See [scripts/docker/README.md](scripts/docker/README.md).

## Install

```sh
nvm use          # or install Node 24 another way
npm ci           # exact versions from package-lock.json
```

### What `npm install` prints

- **`ERESOLVE overriding peer dependency` warnings** for `eslint-plugin-import`, `eslint-plugin-jsx-a11y` and `eslint-plugin-react`: these plugins, pulled in by `eslint-config-next`, have not yet added ESLint 10 to their declared peer range. ESLint 10 is what Next.js 16 ships with and linting works; the warnings are noise.
- **`5 high severity vulnerabilities`**: one advisory in `braces` (a glob helper used by the linter), reached only through `eslint-config-next`, with no patched release yet. It is a development-only dependency and never ships; the production image holds nginx and static files. See [MIGRATION.md](MIGRATION.md#security-audit). **Do not run `npm audit fix --force`**: it "fixes" this by downgrading `eslint-config-next` to 14.x, which is built for Next.js 14 and ESLint 8 and pulls in a vulnerable `glob`. If that has happened, run `git checkout -- package.json package-lock.json && npm ci`.
- **`npm run dev` fails with `EADDRINUSE :::8910`** when another server is already on that port. Find it with `lsof -nP -iTCP:8910 -sTCP:LISTEN`, or start on another port: `npm run dev -- --port 3000`.

## Environment variables

The site needs **none**. There is no `.env` file to create.

Optional, for the tooling only:

| Variable                  | Where      | Effect                                                     |
| ------------------------- | ---------- | ---------------------------------------------------------- |
| `NEXT_TELEMETRY_DISABLED` | build, dev | `1` turns off Next.js telemetry (the Dockerfile sets it)   |
| `CI`                      | e2e        | When set, Playwright always builds and starts its own site |
| `PORT`, `HOST`            | preview    | Port and interface for `npm run preview` (8910, 127.0.0.1) |
| `PORT`                    | e2e        | Port for the server Playwright starts and tests (8910)     |

## Development

```sh
npm run dev      # http://localhost:8910 with hot reload
```

Pages live in `src/app`; the two layouts are route groups:

| URL                                                     | Page                                             | Layout                               |
| ------------------------------------------------------- | ------------------------------------------------ | ------------------------------------ |
| `/`                                                     | `src/app/(story)/page.tsx`                       | `(story)/layout.tsx` → `StoryLayout` |
| `/about`                                                | `src/app/(main)/about/page.tsx`                  | `(main)/layout.tsx` → `MainLayout`   |
| `/how-it-works`                                         | `src/app/(main)/how-it-works/page.tsx`           | `MainLayout`                         |
| `/contact`                                              | `src/app/(main)/contact/page.tsx`                | `MainLayout`                         |
| `/privacy`, `/terms`, `/data-processing`, `/disclaimer` | `src/app/(main)/<name>/page.tsx` via `LegalPage` | `MainLayout`                         |
| anything else                                           | `src/app/not-found.tsx` (404)                    | `MainLayout`                         |

Imports use the `src/...` alias (`tsconfig.json` paths). Styling is Tailwind CSS 4 with the design tokens in `src/app/globals.css`. Fonts are self-hosted through `next/font`.

The homepage story renders in the browser only (`src/app/(story)/StoryShell.tsx`); the engine (`src/lib/story/engine.ts`) drives the scenes from a single `requestAnimationFrame` loop. The theme (`src/lib/story/theme.ts`) comes from `localStorage` or the system preference. An inline script in `src/app/layout.tsx` puts it on `<html>` before React runs, so prerendered pages never flash the wrong theme, and `ThemeShell` keeps it there after each toggle.

## Checks

```sh
npm run typecheck      # tsc
npm run lint           # eslint
npm run format:check   # prettier (npm run format to fix)
npm test               # vitest unit and component tests (src/**/*.test.ts[x])
npm run test:e2e       # playwright motion tests for the homepage (e2e/)
npm run check          # typecheck, lint, format:check, test, build
```

`npm run test:e2e` builds the site and serves the export on port 8910 with the production headers. If something is already listening on 8910 (`npm run dev`, `npm run preview`, or the Docker image), it is reused instead, so make sure it is this site; `PORT=8911 npm run test:e2e` moves everything to a free port. The first run needs `npx playwright install chromium`.

## Images

The portfolio pictures on the homepage are served as AVIF, WebP and JPEG at three widths, so a phone downloads tens of kilobytes rather than the multi-megabyte originals. The originals live in `assets/work/`; the variants in `public/CORESITY-IMAGE/work/` and the size manifest `src/components/Story/work-images.json` are generated and committed:

```sh
npm run images   # assets/work/*.jpeg -> public/CORESITY-IMAGE/work/*, work-images.json
```

To add or replace a picture, drop the file in `assets/work/` (any size; 1200px wide or more is best), run `npm run images`, and reference its base name in `WORK` in `src/components/Story/story.data.ts`. The logos in `public/CORESITY-IMAGE/` are small PNGs used as they are.

## Production build

```sh
npm run build    # next build -> out/, then scripts/csp-hashes.mjs -> build/nginx/security-headers.conf
npm run preview  # serve out/ on http://localhost:8910 like nginx does
```

`out/` holds the whole site: one HTML file per page, `404.html`, the hashed assets under `_next/static/` and the files from `public/`.

`scripts/csp-hashes.mjs` reads every exported page, hashes the inline scripts Next.js emits, and renders the nginx security headers from `docker/nginx/security-headers.conf.template`. The Content-Security-Policy therefore allows exactly this build's scripts and nothing else.

## Deployment

The site ships as one Docker image: nginx serving `out/` on port 8080 as a non-root user, with a read-only filesystem. Traefik terminates TLS in front of it.

```sh
scripts/docker/build.sh       # build coresity-web:local
scripts/docker/prod.sh up     # run it on http://localhost:8910
scripts/docker/smoke.sh       # health, pages, 404, headers, caching
scripts/docker/prod.sh down
```

Releases, the VPS deployment (`deploy/vps`) and the SecretVM deployment (`deploy/secretvm`) are documented in [scripts/docker/README.md](scripts/docker/README.md).

Because the site reads no runtime configuration, every content change means building a new image. Contact details (WhatsApp and phone number, group links, the email address, the data retention period) live in `src/lib/links.ts`; the legal pages' effective date is in `src/components/LegalPage/LegalPage.tsx`.

### The contact form

The form on the Contact page (`src/components/ContactForm`) is Coresity's own. On submit it posts into a Google Form (`src/lib/googleForm.ts`), where the five answers are fused into the Google Form's two free-text questions, so responses keep landing in the same Google sheet and nobody sees Google's form. The Content-Security-Policy allows `connect-src https://docs.google.com` for that one request; it is the only third-party origin the site talks to. Google answers without CORS headers, so the browser cannot read the reply: a request that goes out counts as sent, a network failure shows the WhatsApp and phone fallbacks.

If the Google Form's questions are ever edited, its entry ids change: open the form's `/viewform` URL, view the page source, find `FB_PUBLIC_LOAD_DATA_`, and copy each question's id into `ENTRY` in `src/lib/googleForm.ts`. The unit tests and `e2e/contact.spec.ts` never contact Google.

## Project layout

```
src/app/              routes, root layout, global CSS, error and 404 pages
src/components/       Button, Footer, Navbar, StoryHeader, Story (scenes)
src/layouts/          MainLayout (Navbar + Footer), StoryLayout (themed story shell)
src/lib/              links, site copy, the story engine and theme
public/               static files served at the site root
assets/work/          portfolio image originals (npm run images builds the served variants)
e2e/                  Playwright tests
scripts/              csp-hashes.mjs, images.mjs, preview.mjs, docker/ (build, run, release)
docker/nginx/         nginx config and the security headers template
deploy/               docker-compose files for the VPS and SecretVM
```

See [MIGRATION.md](MIGRATION.md) for how this project moved from RedwoodJS to Next.js.
