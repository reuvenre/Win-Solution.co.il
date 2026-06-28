# design-sync notes — win-solutions-automations

This repo is a **single-page marketing site**, not a component library. The
"components" are zero-prop, default-export **page sections** tuned for one dark
scrolling page (`#05050a`). It was imported as a `package`-shape DS by explicit
user request (a dry run), not because it's a natural design system.

## How the build is wired (non-standard)
- **No library dist** — components are default exports with no `.d.ts`. We
  re-export them as NAMED exports via a barrel (`.design-sync/ds-entry.tsx`) and
  pre-compile it to a real ESM entry with `.design-sync/prebuild.mjs`
  (automatic JSX, React externalized, deps inlined) → `.design-sync/dist/index.mjs`.
  `cfg.entry` / `--entry` points there. `componentSrcMap` lists all 10 names.
- **JSX trap**: root `tsconfig.json` has no `compilerOptions`; `jsx:"react-jsx"`
  lives in `tsconfig.app.json` (esbuild won't auto-discover that filename). So
  the converter's esbuild would default to classic JSX and fail — hence the
  pre-compile step above. Re-run `node .design-sync/prebuild.mjs` before the
  converter whenever `src/components/*` change.
- **CSS**: Tailwind v4 utilities only exist after compilation. `cfg.cssEntry`
  points at the Vite build output `dist/assets/index-*.css` (hashed name — runs
  `npx vite build` first; update the path when the hash changes).
- esbuild deps are in `.ds-sync/node_modules`; `prebuild.mjs` imports esbuild by
  absolute path from there.
- Playwright `1.59.1` pins chromium build 1217 (already in the local
  ms-playwright cache) — installed in `.ds-sync` with browser download skipped.

## Per-component render gotchas (why authored previews exist)
All 10 previews wrap the section in the dark theme (`#05050a`) — the floor card
hardcodes a white body, which breaks these dark-designed sections.
- **Navbar / AIChat / WhatsApp / AutomationBackground** are page chrome
  (fixed-position nav, floating FABs, canvas backdrop), not standalone parts.
  Overrides: `cardMode:single` + tuned `viewport`. The FAB/nav previews add a
  scoped CSS override (`.stage .fixed{position:absolute!important;transform:none
  !important;opacity:1!important}`) to re-anchor `position:fixed` into the card
  AND defeat framer-motion entrance animations (scale/opacity with delays of
  1–1.2s) that otherwise race the static capture → intermittently blank cards.
- **Navbar** desktop links are `hidden md:` — the card viewport must be ≥768px
  wide (1100×200) for them to show.
- **Calendly** injects an external widget script; offline it shows only the
  section heading (expected).
- **Navbar logo**: `logo.png` lives in `public/` and isn't bundled → a small
  broken-image icon appears next to the "WIN SOLUTIONS" wordmark. Cosmetic.

## Re-sync risks
- `cfg.cssEntry` hash changes every `vite build` — re-point it.
- The pre-compile barrel must be re-run on component changes; it's the real
  source of `window.WinSolutions.*`.
- The force-visible CSS overrides are tied to current component markup (Tailwind
  `fixed` class, framer-motion inline styles). If those change, revisit.
- **First upload completed 2026-06-28** into Claude Design project
  `5720f9b7-f40d-4735-ac62-c6e91c82eff2` ("Win Solutions Automations",
  https://claude.ai/design/p/5720f9b7-f40d-4735-ac62-c6e91c82eff2). `projectId`
  is pinned in config.json; re-syncs fetch its `_ds_sync.json` anchor and skip
  unchanged components. All 10 uploaded; render check clean (0 bad).
- `.design-sync/conventions.md` authored this run and wired via
  `cfg.readmeHeader` — it's prepended to the README and inlined into the design
  agent's prompt. On re-sync, validate (don't rewrite) its named classes/tokens
  against the fresh `_ds_bundle.css`; `--color-bg`/`--color-bg-card` are
  tree-shaken out of the compiled CSS, so the header deliberately uses the
  literal `#05050a` for the page background, not a token.
