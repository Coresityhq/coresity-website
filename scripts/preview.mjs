#!/usr/bin/env node
// Serves the static export in `out/` the way nginx does in production
// (docker/nginx/default.conf): a path maps to the file, then `<path>.html`,
// then `<path>/index.html`; anything else gets 404.html with a 404 status.
// When `npm run build` has rendered build/nginx/security-headers.conf, the
// same security headers are sent too, so the Content-Security-Policy can be
// checked in a real browser. For checking a build locally, for
// scripts/docker/smoke.sh and for the Playwright tests. Not for production:
// there, nginx serves the files.
//
//   node scripts/preview.mjs            # http://localhost:8910
//   PORT=3000 node scripts/preview.mjs

import { createReadStream } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

const root = path.resolve(process.argv[2] ?? 'out')
const port = Number(process.env.PORT ?? 8910)
const host = process.env.HOST ?? '127.0.0.1'

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.map': 'application/json',
}

const isFile = async (p) => {
  try {
    return (await stat(p)).isFile()
  } catch {
    return false
  }
}

const inRoot = (p) => p === root || p.startsWith(root + path.sep)

// `add_header Name "value" always;` lines from the rendered nginx snippet.
const loadSecurityHeaders = async () => {
  const file = path.resolve(
    process.env.SECURITY_HEADERS ?? 'build/nginx/security-headers.conf'
  )
  let text
  try {
    text = await readFile(file, 'utf8')
  } catch {
    console.warn(`preview: ${file} not found; serving without security headers`)
    return {}
  }
  const headers = {}
  for (const m of text.matchAll(/^\s*add_header\s+(\S+)\s+"([^"]*)"/gm)) {
    headers[m[1]] = m[2]
  }
  return headers
}
const securityHeaders = await loadSecurityHeaders()

const resolve = async (urlPath) => {
  let decoded
  try {
    decoded = decodeURIComponent(urlPath)
  } catch {
    return null
  }
  const base = path.normalize(path.join(root, decoded))
  if (!inRoot(base)) return null
  const candidates = decoded.endsWith('/')
    ? [path.join(base, 'index.html')]
    : [base, `${base}.html`, path.join(base, 'index.html')]
  for (const c of candidates) {
    if (inRoot(c) && (await isFile(c))) return c
  }
  return null
}

// Mirrors the Cache-Control rules in docker/nginx/default.conf.
const cacheControl = (file) => {
  const rel = path.relative(root, file).split(path.sep).join('/')
  if (rel.startsWith('_next/static/'))
    return 'public, max-age=31536000, immutable'
  if (rel.startsWith('CORESITY-IMAGE/')) return 'public, max-age=86400'
  return 'no-cache'
}

const send = (res, status, file, extraHeaders = {}) => {
  res.writeHead(status, {
    'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream',
    'Cache-Control': cacheControl(file),
    ...securityHeaders,
    ...extraHeaders,
  })
  createReadStream(file).pipe(res)
}

const server = createServer(async (req, res) => {
  const url = new URL(
    req.url ?? '/',
    `http://${req.headers.host ?? 'localhost'}`
  )
  if (url.pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('ok\n')
    return
  }
  const file = await resolve(url.pathname)
  if (file) {
    send(res, 200, file)
    return
  }
  const notFound = path.join(root, '404.html')
  if (await isFile(notFound)) {
    send(res, 404, notFound)
    return
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('Not found\n')
})

server.listen(port, host, () => {
  console.log(`preview: serving ${root} at http://${host}:${port}`)
})
