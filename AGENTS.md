# AGENTS.md

Wanderlust — a travel landing-page app (currently `src/app/page.tsx` is an empty shell; image assets sit in `public/images/`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

- Next.js 16 (App Router) + React 19 on Turbopack. TypeScript `strict`.
- Tailwind CSS v4 wired through Turbopack, **not** PostCSS — there is no `postcss.config`; Tailwind is loaded by the `turbopack.rules` entry in `next.config.ts`. Design tokens (CSS vars, oklch) and theme imports all live in `src/app/globals.css`; keep that file as the single source of styling truth.
- Path alias `@/*` → `./src/*`.

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build (Turbopack)
npm run lint       # bare `eslint` — Next 16 removed `next lint`; flat config in eslint.config.mjs
npx tsc --noEmit   # typecheck (no script defined)
```

- No test runner exists; the verification loop is `lint` → `tsc --noEmit` → `build`.
- tsconfig includes `.next/types/**` and `.next/dev/types/**`, so run `tsc --noEmit` after a `dev`/`build` session — on a clean checkout those route-type files don't exist yet.

## React Compiler

`reactCompiler: true` is set in `next.config.ts`. Components are auto-memoized — do **not** add manual `useMemo`/`useCallback`/`React.memo` for performance; the compiler handles it.

## shadcn/UI conventions (non-standard)

- `components.json` uses style `base-nova`, which is built on **Base UI** (`@base-ui/react/*`), **not Radix**. Imports are per-feature, e.g. `@base-ui/react/button`. Let `npx shadcn@latest add <component>` generate components; don't hand-port Radix-based shadcn snippets from memory.
- Generated components live in `src/components/ui/`; aliases in `components.json` (`@/components`, `@/components/ui`, `@/lib`, `@/hooks`).
- `cn` comes from the standalone `cn` npm package and is re-exported from `@/lib/utils` — always import `cn` from `@/lib/utils`, never from `clsx`/`tailwind-merge`.
- Icons: `lucide-react` (v1.x in this repo).

## Stale docs

`README.md` is unmodified create-next-app boilerplate — it describes the wrong font (Geist; the app actually uses Josefin Sans in `src/app/layout.tsx`) and default page content. Trust the code over the README.
