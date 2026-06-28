## How to build with this design system

This is **not** a kit of small parts (buttons, inputs). Every component is a
**zero-prop, full-width page section** for one dark, single-scroll marketing page
in **Hebrew / RTL**. You build a page by stacking sections, not by configuring
props — all 10 components take no meaningful props (`<Name>Props` is an open
index type; render them bare: `<Hero />`, `<Services />`).

### Wrapping and setup

No provider or context is required. What the sections DO require is the page
shell they were designed against — without it they render as light-on-light and
left-aligned:

- **`dir="rtl"`** on a wrapping element (or `<html>`). All copy is Hebrew and
  laid out right-to-left.
- **Dark background `#05050a`** with light text `#e8e8f0`. The sections paint
  their own foreground but assume this dark canvas behind them.
- **Load order:** React must be on the page first, then `_ds_bundle.js` (exposes
  `window.WinSolutions.*`), and link `styles.css` once — it `@import`s
  `_ds_bundle.css`, which carries the Heebo font, the design tokens, and every
  utility class below.

### Page composition (the real "API")

Compose a landing page by stacking, in document order:

`Navbar` (fixed top bar) → `Hero` → `Services` → `About` → `ContactForm` →
`Footer`.

- **`AutomationBackground`** is a fixed, full-viewport animated backdrop (drifting
  gradient orbs + grid). Render it once, behind everything, `position: fixed`.
- **`Navbar`** is `position: fixed` and its desktop links only appear ≥768px wide.
- **`WhatsApp`** and **`AIChat`** are floating action buttons (`position: fixed`,
  corners) — page chrome, render once.
- **`Calendly`** embeds an external scheduling widget (loads at runtime).

### Styling idiom

**Tailwind CSS v4 utilities** (no `tailwind.config.js` — tokens live in an
`@theme` block) plus a small set of **custom utility classes** the brand relies
on. Use these for any layout glue you add around the sections:

| Class | Effect |
|---|---|
| `text-accent` | electric-blue text (`#00d4ff`) |
| `text-gradient` | blue gradient clipped to text |
| `bg-gradient-accent` | blue gradient fill |
| `glow-accent` / `glow-accent-sm` | neon blue box-shadow glow |
| `glass` | translucent blurred panel + hairline border |
| `glass-dark` | opaque dark blurred bar (used by the navbar) |
| `card-sharp` | subtle bordered card with hover lift |
| `grid-bg` | faint blue grid background pattern |
| `hero-headline` | fluid `clamp()` headline size |

Design **tokens** (CSS custom properties, usable as `var(--*)`):
`--color-accent` (`#00d4ff`), `--color-accent-dark` (`#0055cc`), `--font-sans`
(`'Heebo', …`). The page background is the literal `#05050a`.

### Where the truth lives

- `styles.css` → `_ds_bundle.css` — the compiled stylesheet; read it for the
  exact utility/token definitions before styling.
- `components/general/<Name>/<Name>.prompt.md` — per-section usage + a render
  example for each section.

### Minimal build snippet

```jsx
// React + _ds_bundle.js already loaded; styles.css linked.
const { Hero, Services, About, ContactForm, Footer, AutomationBackground } = window.WinSolutions;

() => (
  <div dir="rtl" style={{ background: '#05050a', color: '#e8e8f0', position: 'relative', minHeight: '100vh' }}>
    <AutomationBackground />
    <main style={{ position: 'relative', zIndex: 1 }}>
      <Hero />
      <Services />
      <About />
      <ContactForm />
      <Footer />
    </main>
  </div>
);
```
