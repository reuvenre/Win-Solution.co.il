# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workspace Structure

This workspace contains two independent React/TypeScript marketing websites, both targeting Hebrew-speaking audiences with RTL layouts:

- **`orly-iluz-law/`** — Real estate law firm landing page (production-ready, has webhook integration)
- **`Win Solutions Automations/`** — B2B automation services company landing page (in development)

Each project is a standalone Vite app. Run all commands from within the respective project directory.

## Commands

Both projects share the same command structure:

```bash
npm run dev       # Start dev server
npm run build     # TypeScript compile (tsc -b) then Vite build
npm run preview   # Preview production build
```

Win Solutions also has:

```bash
npm run lint      # ESLint check
```

There are no test suites in either project.

## Architecture

Both are single-page, section-based marketing sites with identical high-level structure:

```text
App.tsx → Header/Navbar → [Hero → Services → About → (Testimonials) → Contact/ContactForm] → Footer
```

### Orly Iluz Law (`orly-iluz-law/`)

- **Content**: All Hebrew copy lives in `src/content/he.ts` as typed constants — edit copy there, not in components
- **Lead capture**: `src/sections/Contact.tsx` submits to a Zapier/Make webhook via `src/lib/lead.ts`. Requires `VITE_LEAD_WEBHOOK_URL` env var (see `.env.example`)
- **Notifications**: Sonner toaster in `App.tsx`; toast calls happen in the Contact section after form submission
- **UI primitives**: `src/components/ui/` wraps Radix UI (`button.tsx`, `card.tsx`) — prefer these over raw HTML elements
- **Path alias**: `@/` maps to `src/` (configured in `vite.config.ts`)
- **Theme**: Dark background `#070b18`, gold accent `#D6A74A`

### Win Solutions Automations (`Win Solutions Automations/`)

- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin — **no `tailwind.config.js`**. Design tokens (`--color-accent`, etc.) are in `src/index.css` under `@theme`. Custom utility classes (`.glass`, `.glass-dark`, `.text-gradient`, `.glow-accent`) are defined there in `@layer utilities`
- **Theme**: Dark background `#0a0a0f`, electric-blue accent `#00d4ff`
- **Animations**: Framer Motion throughout. Scroll-triggered sections use `useInView({ once: true })`. When defining custom `Variants` with an `ease` property, import the `Easing` type from `framer-motion` and type the value explicitly — plain string `'easeOut'` causes a TS error with this version
- **AI Chat** (`src/components/AIChat.tsx`): Uses `@google/genai` (`GoogleGenAI` class). Creates a chat session per send with full message history. System prompt is hardcoded in the file. Requires `VITE_GEMINI_API_KEY` env var (copy `.env.example` → `.env`)
- **Calendly** (`src/components/Calendly.tsx`): Injects Calendly script on mount. Update `CALENDLY_URL` constant at top of file
- **WhatsApp** (`src/components/WhatsApp.tsx`): Update `WA_NUMBER` (format: `972XXXXXXXXX`, no `+`) at top of file
- **Form** (`src/components/ContactForm.tsx`): React Hook Form + Zod. `onSubmit` simulates a delay — wire to a Make/Zapier webhook for production
- **Config split**: TypeScript uses composite projects — `tsconfig.app.json` for source, `tsconfig.node.json` for Vite config

## Key Conventions

- **Hebrew/RTL**: Both sites are `dir="rtl"` in `index.html`. Keep font stacks using Heebo or Rubik for Hebrew text
- **Israeli phone validation**: Orly strips non-digits and validates local formats; Win Solutions uses Zod regex `/^0\d{8,9}$/`
- **Spam protection**: Orly's contact form has a honeypot field — do not remove it
- **Animations**: Both projects respect `prefers-reduced-motion` — keep animation code conditional or use CSS media queries
