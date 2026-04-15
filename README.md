# toyeshh.com

Personal portfolio and terminal-style website built with Vite, React, and TypeScript.

## Overview

- Animated, multi-page portfolio (Home, About, Work, Contact)
- Work detail pages powered by slug-based project data
- Terminal feature with live AI agent chatbot powered by Minstral API
- Structured long-form content under the content directory
- Unit and E2E test coverage
- Cloudflare Workers deployment support

## Tech Stack

- Vite
- React + TypeScript
- React Router 
- Tailwind CSS
- Framer Motion
- Vitest + Testing Library
- Playwright
- Cloudflare Workers (Wrangler)
  
## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

The site runs on port 8080 by default.

## Scripts

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - ESLint checks
- `npm test` - unit tests (Vitest)
- `npm run test:watch` - unit tests in watch mode
- `npx playwright test` - E2E tests
- `npm run deploy` - deploy to Cloudflare Workers

## Project Structure

- `src/pages` - route-level pages
- `src/components` - reusable app components
- `src/components/ui` - generated UI primitives
- `src/lib` - shared constants, helpers, and project metadata
- `src/hooks` - custom hooks
- `content` - markdown/mdx content for terminal and agent context
- `e2e` - Playwright tests

## Testing

- Unit tests are colocated in `src` with `.test.ts` / `.spec.ts` naming.
- E2E tests live in `e2e`.

## Deployment

Cloudflare Worker configuration lives in `wrangler.toml`.

```bash
npm run deploy
```
