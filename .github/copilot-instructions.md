<!-- CoPilot instructions for the getkap.co repo -->
# getkap.co — Assistant guide for code tasks

This file contains focused, actionable information for AI coding agents working in this repository. Keep guidance tightly tied to discoverable code, commands, and patterns.

1) Big picture
- Framework: Next.js (app-router, Next 14) using the `app/` directory. Top-level layout is `app/layout.tsx` and the entry page is `app/page.tsx` which renders `app/HomePage.tsx`.
- Static/public assets live under `public/static/` and are referenced as `/static/...` (e.g. `app/layout.tsx` uses `/static/favicon/*` and `/static/images/ogp/*`).
- The repo is the marketing/website for the Kap app; runtime is served via Vercel (see `README.md`).

2) Developer workflows & commands
- Install deps: `npm install` or `yarn`.
- Dev server: `npm run dev` (runs `next`).
- Build: `npm run build` (runs `next build`).
- Production start (local): `npm run start` (runs `NODE_ENV=production next start`).
- Tests: none present (`npm test` is a no-op). If adding tests, follow project style (mix of TS and JS) and ensure `type: "module"` compatibility in `package.json`.

3) Key project conventions (do not invent patterns)
- Code mixing: The repo mixes TypeScript (`.tsx`, `pages/api/*.ts`) and JavaScript/JSX (`.js`, `.jsx`). Follow the file's existing language.
- Component exports: components typically use `export default` and may provide named helpers (example: `app/components/Grid/index.js` exports default `Grid` and named `Column`).
- CSS Modules: component-scoped styles live alongside components as `*.module.css` (e.g. `app/components/Button/Button.module.css`). Use the same pattern for new components.
- Folder structure: components are organized under `app/components/`, often with an `index.js` or `index.js(x)` entry. Keep that structure when adding components.
- Metadata/head: `app/layout.tsx` contains canonical `<head>` meta tags — prefer editing metadata here for site-wide changes.

4) Integration and external dependencies
- GitHub Releases API: `pages/api/download/[arch].ts` queries `https://api.github.com/repos/wulkano/kap/releases/latest` using `got` and redirects to the matching `.dmg`. When editing, respect the existing `arm64`/`x64` logic.
- Analytics: `app/components/analytics.jsx` integrates `@vercel/analytics`. Small privacy-sensitive modifications should be done carefully.

5) Useful file examples (copyable patterns)
- App entry & layout: `app/page.tsx`, `app/layout.tsx`.
- Main page content: `app/HomePage.tsx`.
- Composed sections: `app/components/sections/*` (e.g. `footer/index.js`, `hero/index.js`). These compose `Section` and `Grid` helpers.
- API route example: `pages/api/download/[arch].ts` — demonstrates external HTTP fetch and redirect behavior.

6) Editing and pull request guidance
- Keep changes minimal and focused: modify only files necessary for the task.
- Preserve default exports and existing module patterns unless refactoring whole components.
- Run `npm run dev` to verify UI changes locally. There are no automated tests; visual/manual verification is expected for site changes.

7) When in doubt
- Prefer copying existing patterns: create component folder + `index.js` and `module.css` like `app/components/sections/footer/`.
- Note the README references older `pages/index.js`; trust `app/` router files over README when they conflict.

8) Security & external requests
- API routes may call third-party endpoints (see `pages/api/*`). Keep secrets out of source and follow the current code's minimal fetch/redirect pattern.

If anything here is unclear or you need more examples (e.g., add a sample component or an API change walkthrough), tell me which area to expand and I'll iterate.
