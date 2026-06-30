// Pre-compile the barrel into a real ESM dist entry the converter can consume
// via --entry. Automatic JSX (these are React-19 components with no `import
// React`), React externalized (the converter shims it to window.React), every
// other dep inlined so the converter doesn't need to re-resolve them.
//
// Run this before package-build.mjs whenever src/components/* change:
//   node .design-sync/prebuild.mjs
// esbuild is resolved from the staged converter deps in .ds-sync/node_modules.
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const repo = resolve(here, '..')
const { build } = await import(pathToFileURL(resolve(repo, '.ds-sync/node_modules/esbuild/lib/main.js')).href)

await build({
  entryPoints: [resolve(here, 'ds-entry.tsx')],
  outfile: resolve(here, 'dist/index.mjs'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  nodePaths: [resolve(repo, 'node_modules')],
  loader: { '.svg': 'dataurl', '.png': 'dataurl', '.woff': 'dataurl', '.woff2': 'dataurl' },
  define: { 'process.env.NODE_ENV': '"development"' },
  logLevel: 'info',
})
console.error('prebuilt -> .design-sync/dist/index.mjs')
