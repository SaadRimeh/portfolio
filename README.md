# Saad Rimeh — Portfolio

A responsive portfolio for mobile, web, desktop, and backend projects. Built with React 19, TypeScript, and Vite, and prepared for deployment on Vercel.

## Local development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Checks and deployment

```sh
npm run check   # ESLint, project regression tests, TypeScript, production build
npm run preview
```

The `Check portfolio` GitHub Actions workflow runs the checks on pushes to `main` and pull requests.

The `Deploy GitHub Pages` workflow builds with the `/portfolio/` base path and publishes every push to `main` to the existing `gh-pages` branch.

## Vercel deployment

Import this repository into Vercel. The included `vercel.json` uses the Vite framework preset with these settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`

Vercel can deploy every push to `main` automatically after the repository is connected.

## Updating the content

- `src/data/projects.ts` contains the curated projects, categories, technology tags, optional repository slugs, and optional live URLs. Source links use the public `SaadRimeh` GitHub account.
- Set `featured: true` for a featured project and add its visual to `src/components/ProjectVisual.tsx`.
- Featured visuals are decorative project images or simplified product explorations. They are hidden from assistive technology because the adjacent text names and describes each project.
- Only add a `live` URL when a visitor can open the deployed app. APK downloads and restricted admin pages should not be labeled as live demos.
- Biography, contact information, and capabilities live in `src/App.tsx`.
- Global colors, fonts, focus states, and reduced-motion support live in `src/index.css`; layout and responsive styles live in `src/App.css`.
- `index.html` contains search/social metadata. `public/favicon.svg` provides the custom site icon.

Review deployments periodically before adding or restoring demo links.

## UI and accessibility

- Persistent navigation with current-section feedback and anchor offsets.
- A skip link, one primary heading, semantic sections, labeled controls, and visible keyboard focus.
- Search and category filtering work together; result counts are announced, and empty results offer a reset.
- Project pagination reveals six more entries at a time. Keyboard focus moves to the first newly revealed project.
- Email copy reports success or failure; the email address remains selectable and available as a mail link.
- Project visuals are decorative; the portrait has descriptive alternative text and a reserved display area.
- Reduced-motion preferences disable smooth scrolling. Content is visible without scroll-triggered animation.
- Google Fonts has local system-font fallbacks. Project data is bundled locally, so the portfolio does not depend on GitHub API availability or rate limits at runtime.

## Regression checks

`tests/projects.test.mjs` verifies search normalization, combined filters, unique project identities, populated categories, and source/live links. Browser checks should also cover 320px, 390px, 600px, 768px, 1024px, and 1440px layouts; keyboard navigation; email copying; the complete project list; and empty results.
