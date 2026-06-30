# design-sync notes — win-solutions-automations

This repo is a **single-page marketing site**, not a component library. The
"components" are zero-prop, default-export **page sections** tuned for one dark
scrolling page (`#05050a`). It was imported as a `package`-shape DS by explicit
user request, not because it's a natural design system.

Synced project: **Win Solutions Automations**
`projectId: 5720f9b7-f40d-4735-ac62-c6e91c82eff2`
https://claude.ai/design/p/5720f9b7-f40d-4735-ac62-c6e91c82eff2

## How the build is wired (non-standard — read before any re-sync)
- **No library dist** — components are default exports with no `.d.ts`. We
  re-export them as NAMED exports via a barrel (`.design-sync/ds-entry.tsx`) and
  pre-compile it to a real ESM entry with `.design-sync/prebuild.mjs`
  (automatic JSX, React externalized, deps inlined) → `.design-sync/dist/index.mjs`.
  `cfg.entry` / `--entry` points there. `componentSrcMap` lists all 10 names.
- **JSX trap**: root `tsconfig.json` has no `compilerOptions`; `jsx:"react-jsx"`
  lives in `tsconfig.app.json` (esbuild won't auto-discover that filename). So
  the converter's esbuild would default to classic JSX and fail — hence the
  pre-compile step above.
- **CSS**: Tailwind v4 utilities only exist after compilation. `cfg.cssEntry`
  points at the Vite build output `dist/assets/index-*.css` — **HASHED name that
  changes every `vite build`. Re-point `cfg.cssEntry` after each site build.**
- esbuild deps are in `.ds-sync/node_modules`; `prebuild.mjs` imports esbuild by
  absolute path from there.
- Playwright `1.59.1` pins chromium build 1217 (in the local ms-playwright
  cache) — installed in `.ds-sync` with browser download skipped.

## Re-sync recipe (the order matters)
1. `npx vite build`  → produces fresh `dist/assets/index-*.css`
2. update `cfg.cssEntry` in config.json to the new hashed CSS filename
3. `node .design-sync/prebuild.mjs`  → rebuilds `.design-sync/dist/index.mjs`
4. re-stage scripts if needed:
   `cp -r <skill>/package-*.mjs <skill>/resync.mjs <skill>/lib <skill>/storybook .ds-sync/`
5. fetch the project anchor → `.design-sync/.cache/remote-sync.json`
   (`DesignSync get_file _ds_sync.json`)
6. `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./.design-sync/dist/index.mjs --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json`
7. upload per the skill's atomic path (full writes; deletes from the diff).

## Per-component render gotchas (why authored previews exist)
All 10 previews wrap the section in the dark theme (`#05050a`) — the floor card
hardcodes a white body, which breaks these dark-designed sections.
- **Navbar / AIChat / WhatsApp / AutomationBackground** are page chrome
  (fixed-position nav, floating FABs, canvas backdrop), not standalone parts.
  Overrides: `cardMode:single` + tuned `viewport`. The FAB/nav previews add a
  scoped CSS override (`.stage .fixed{position:absolute!important;transform:none
  !important;opacity:1!important}`) to re-anchor `position:fixed` into the card
  AND defeat framer-motion entrance animations (scale/opacity, 1–1.2s delays)
  that otherwise race the static capture → intermittently blank cards.
- **Navbar** desktop links are `hidden md:` — the card viewport must be ≥768px
  wide (1100×200) for them to show.
- **Calendly** injects an external widget script; offline it shows only the
  section heading (expected).
- **Navbar logo**: `logo.png` lives in `public/` and isn't bundled → a small
  broken-image icon appears next to the "WIN SOLUTIONS" wordmark. Cosmetic.

## Re-sync risks
- `cfg.cssEntry` hash changes every `vite build` — re-point it (step 2 above).
- The pre-compile barrel must be re-run on component changes; it's the real
  source of `window.WinSolutions.*`.
- The force-visible CSS overrides are tied to current component markup (Tailwind
  `fixed` class, framer-motion inline styles). If those change, revisit.
- The durable inputs under `.design-sync/` (config.json, previews/, ds-entry.tsx,
  prebuild.mjs, this file) were once accidentally deleted and recreated — keep
  them committed so a future sync isn't stranded.
