# Saad Rimeh — Portfolio

A responsive portfolio for mobile, web, desktop, and backend projects. Built with React 19, TypeScript, and Vite, and published at [saadrimeh.github.io/portfolio](https://saadrimeh.github.io/portfolio/).

## Local development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the `/portfolio/` URL printed by Vite. This base path is required by the existing GitHub Pages deployment.

## Checks and deployment

```sh
npm run check   # ESLint, project regression tests, TypeScript, production build
npm run preview
npm run deploy # Build and publish dist/ to the existing gh-pages branch
```

The `Check portfolio` GitHub Actions workflow runs the checks on pushes to `main` and pull requests. Publishing uses the existing `gh-pages` script; source changes alone do not deploy the site.

## Updating the content

- `src/data/projects.ts` contains the 18 curated projects, categories, technology tags, repository slugs, and optional live URLs. Source links use the public `SaadRimeh` GitHub account.
- Set `featured: true` for a featured project and add its illustration to `src/components/ProjectVisual.tsx`.
- The four featured visuals are decorative, simplified product explorations created in HTML/CSS, **not application screenshots**. They are hidden from assistive technology.
- Only add a `live` URL when a visitor can open the deployed app. APK downloads and restricted admin pages should not be labeled as live demos.
- Biography, contact information, and capabilities live in `src/App.tsx`.
- Global colors, fonts, focus states, and reduced-motion support live in `src/index.css`; layout and responsive styles live in `src/App.css`.
- `index.html` contains search/social metadata and the GitHub Pages canonical URL. `public/favicon.svg` provides the custom site icon.

Project summaries were checked against public repository descriptions and READMEs on September 29, 2026. Salloum and RuScholar returned HTTP 200. GetAlphaBit returned HTTP 503, so it currently has a source-code link only. Review deployments periodically before adding or restoring demo links.

## UI and accessibility

- Persistent navigation with current-section feedback and anchor offsets.
- A skip link, one primary heading, semantic sections, labeled controls, and visible keyboard focus.
- Search and category filtering work together; result counts are announced, and empty results offer a reset.
- Project pagination reveals six more entries at a time. Keyboard focus moves to the first newly revealed project.
- Email copy reports success or failure; the email address remains selectable and available as a mail link.
- Project illustrations are decorative; the portrait has descriptive alternative text and a reserved display area.
- Reduced-motion preferences disable smooth scrolling. Content is visible without scroll-triggered animation.
- Google Fonts has local system-font fallbacks. Project data is bundled locally, so the portfolio does not depend on GitHub API availability or rate limits at runtime.

## Regression checks

`tests/projects.test.mjs` verifies search normalization, combined filters, unique project identities, populated categories, and the corrected source/live links. Browser checks should also cover 320px, 390px, 600px, 768px, 1024px, and 1440px layouts; keyboard navigation; email copying; all 18 projects; empty results; and loading the production bundle under `/portfolio/`.
