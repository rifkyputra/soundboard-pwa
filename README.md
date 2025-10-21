# soundboard-pwa

Soundboard PWA — a small, modern progressive web app built with React + Vite + TypeScript.
This repository is a custom app based on the "react-pwa" starter kit and contains a soundboard application that demonstrates PWA features, accessibility shortcuts (hotkeys), and offline capabilities.

- Progressive Web App setup (service worker + manifest)
- React + TypeScript + Vite for fast development
- Material UI for UI components
- Recoil for lightweight state management
- Hotkeys and keyboard accessibility
- Playwright end-to-end tests and Vitest unit tests
Key features

- Progressive Web App setup (service worker + manifest)
- React + TypeScript + Vite for fast development
- Material UI for UI components
- Recoil for lightweight state management
- Hotkeys and keyboard accessibility
- Playwright end-to-end tests and Vitest unit tests
- Progressive Web App setup (service worker + manifest)
- React + TypeScript + Vite for fast development
- Material UI for UI components
- Recoil for lightweight state management
- Hotkeys and keyboard accessibility
- Playwright end-to-end tests and Vitest unit tests

Quick start

Requirements

- Node.js (v18+ recommended)
- pnpm, npm or yarn (this project was tested with pnpm but npm/yarn will work)

Install dependencies

```bash
pnpm install
```

Run the dev server

```bash
pnpm run dev
```

Build for production

```bash
pnpm run build
```

Preview production build (local static server)

```bash
pnpm run preview
```

HTTPS preview (serve `dist` over HTTPS — requires `https-localhost` / `serve` installed globally)

```bash
pnpm run https-preview
```

Scripts

- `dev` — starts Vite dev server
- `build` — runs TypeScript check and builds with Vite
- `preview` — preview the production build
- `https-preview` — serve `dist` via HTTPS (helper command)
- `prepare` — husky install (pre-commit hooks) and environment helper
- `prettier:check` — check formatting
- `lint:check` — run ESLint with zero-tolerance for warnings
- `ts:check` — TypeScript type check
- `test:unit` — run unit tests (Vitest)
- `test:e2e` — run end-to-end tests (Playwright)
- `test:e2e:ui` — run Playwright with its UI runner

Testing

Unit tests (Vitest):

```bash
pnpm run test:unit
```

End-to-end tests (Playwright):

```bash
pnpm run test:e2e
```

Project structure (high level)

- `src/` — application source
- `public/` — static assets and manifest
- `e2e/` — Playwright tests
- `env/` — environment templates

Configuration & tools

- Vite for dev server and build
- TypeScript for types
- ESLint + Prettier for linting & formatting
- Husky + lint-staged for pre-commit hooks
- vite-plugin-pwa and Workbox for service-worker handling

Contributing

- Open an issue to discuss larger changes.
- Pull requests should include a description, tests (when applicable), and pass linting and tests.

License

This project is released under the MIT License — see the `LICENSE` file for details.

More info

- Homepage / original starter: [react-pwa.surenatoyan.com](https://react-pwa.surenatoyan.com/)
- Repository (upstream starter): [suren-atoyan/react-pwa](https://github.com/suren-atoyan/react-pwa)
