@AGENTS.md

## Project

ATS landing page — Next.js 16 (App Router), React 19, TypeScript (strict). Routes live in `app/`, shared components in `app/components/`. Import alias `@/*` maps to the repo root.

## Commands

- Install: `npm ci`
- Lint: `npm run lint`
- Type-check: `npx tsc --noEmit`
- Build: `npm run build`

There is no test suite; lint + type-check + build must all pass before a change is considered done.

## Rules

- Read the relevant guide in `node_modules/next/dist/docs/` before using any Next.js API.
- Do not add dependencies or edit `package.json` / `package-lock.json`.
- Do not modify anything under `.github/`.
- Match the existing code style; keep changes scoped to the ticket.
