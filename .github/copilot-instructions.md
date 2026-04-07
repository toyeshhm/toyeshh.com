# Project Guidelines

## Stack And Architecture
- Frontend app uses Vite + React + TypeScript with React Router and Tailwind.
- Main routing shell is in src/App.tsx with route pages under src/pages.
- Reusable app-specific components live in src/components; generated shadcn/ui primitives live in src/components/ui.
- Shared utilities and constants are in src/lib, and custom hooks are in src/hooks.

## Build And Test
- Install dependencies: npm install
- Local development server: npm run dev (port 8080)
- Production build: npm run build
- Preview production build: npm run preview
- Lint: npm run lint
- Unit tests: npm test
- Unit tests in watch mode: npm run test:watch
- E2E tests: npx playwright test
- Deployment (Cloudflare Workers): npm run deploy

## Coding Conventions
- Use TypeScript + React function components and existing path aliases (import from @/...).
- Prefer existing utility patterns, including cn from src/lib/utils.ts for class composition.
- Preserve the current animation and interaction approach (Framer Motion patterns used across page and nav components).
- Keep edits scoped: avoid broad refactors of generated files in src/components/ui unless the task explicitly requires it.

## Testing Conventions
- Place unit tests in src with *.test.ts or *.spec.ts naming to match vitest include patterns.
- Keep browser-oriented unit tests compatible with jsdom and existing setup in src/test/setup.ts.
- Place Playwright specs in e2e.

## Tooling And Environment Notes
- TypeScript strictness is intentionally relaxed in this repo (strict and unused checks are off); do not introduce strict-only assumptions without request.
- ESLint enforces React Hooks and React Refresh rules; run lint after non-trivial changes.
- Keep Vite resolve dedupe settings in vite.config.ts unless there is a clear dependency-resolution reason to change them.
- Cloudflare SPA fallback in wrangler.toml is required for client-side routing; preserve not_found_handling and html_handling behavior.

## References
- Script overview and quick start: README.md
- Build/test/deploy scripts and dependencies: package.json
- Vite setup and alias/dedupe behavior: vite.config.ts
- Unit test configuration: vitest.config.ts
- Cloudflare worker deployment behavior: wrangler.toml
