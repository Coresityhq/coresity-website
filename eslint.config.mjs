import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'node_modules/**',
    'playwright-report/**',
    'test-results/**',
    'next-env.d.ts',
  ]),
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // The brand images are plain <img> tags on purpose: the site is a static
      // export with no image optimiser, and the tests assert the exact src.
      '@next/next/no-img-element': 'off',
    },
  },
])
