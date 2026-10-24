#!/usr/bin/env node
// Renders the nginx Content-Security-Policy snippet for a static export.
//
// Next.js writes a few inline <script> elements into every exported page (the
// React Server Components payload and the theme boot script in the root
// layout). Rather than allow 'unsafe-inline', this hashes each one and lists
// the hashes in script-src, so only those exact scripts may run. Run after
// `next build`; the Dockerfile copies the result into the nginx image.
//
//   node scripts/csp-hashes.mjs [out-dir] [template] [destination]

import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const [
  outDir = 'out',
  templatePath = 'docker/nginx/security-headers.conf.template',
  destPath = 'build/nginx/security-headers.conf',
] = process.argv.slice(2)

const PLACEHOLDER = '__SCRIPT_SRC__'

const htmlFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((e) => {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) return htmlFiles(p)
      return e.name.endsWith('.html') ? [p] : []
    })
  )
  return files.flat()
}

const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi
const TAG = /<[a-zA-Z][^>]*>/g
const HANDLER = /\son[a-z]+\s*=/i

const fail = (msg) => {
  console.error(`csp-hashes: ${msg}`)
  process.exit(1)
}

const files = await htmlFiles(outDir).catch(() =>
  fail(`cannot read ${outDir}; run \`next build\` first`)
)
if (files.length === 0) fail(`no HTML files under ${outDir}`)

const hashes = new Set()
const perFile = {}
for (const file of files) {
  const html = await readFile(file, 'utf8')
  for (const tag of html.match(TAG) ?? []) {
    if (HANDLER.test(tag)) fail(`${file} has an inline event handler: ${tag}`)
  }
  let count = 0
  for (const m of html.matchAll(SCRIPT)) {
    const [, attrs, body] = m
    if (/\ssrc\s*=/i.test(attrs)) continue
    // Browsers hash the element's raw text, byte for byte.
    const digest = createHash('sha256').update(body, 'utf8').digest('base64')
    hashes.add(`'sha256-${digest}'`)
    count += 1
  }
  perFile[path.relative(outDir, file)] = count
}
if (hashes.size === 0) fail('found no inline scripts; the export looks wrong')

const template = await readFile(templatePath, 'utf8')
if (!template.includes(PLACEHOLDER))
  fail(`${templatePath} has no ${PLACEHOLDER}`)
const scriptSrc = ["'self'", ...[...hashes].sort()].join(' ')
const rendered = template.split(PLACEHOLDER).join(scriptSrc)

await mkdir(path.dirname(destPath), { recursive: true })
await writeFile(destPath, rendered)
await writeFile(
  path.join(path.dirname(destPath), 'csp-hashes.json'),
  JSON.stringify({ files: perFile, hashes: [...hashes].sort() }, null, 2) + '\n'
)
console.log(
  `csp-hashes: ${hashes.size} inline script hash(es) from ${files.length} page(s) -> ${destPath}`
)
