# Bonenza Front-End

A Next.js (pages-router) crypto-casino front-end. This codebase has been
converted to run **fully standalone with no backend** — every API request is
replaced by a local mock layer, so the UI keeps working and flows like sign
up / login complete locally and move to the next screen.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out  (output: 'export')
```

No environment/back-end setup is required to run the app.

## Project structure

All source lives under `src/`:

```
src/
  api/            Mock service layer (keeps the original api_* function names)
    _mock/        Central mock data (db.ts) + response helpers (respond.ts)
    auth/  user/  wallet/  game/  bonus/  spin/  vip/  chat/  notification/
  components/     UI components, grouped by feature
  config/         i18n and money config
  constants/      App constants, endpoints, validation
  hooks/          Reusable hooks
  libs/           Utilities, storage, helpers
  pages/          Next.js pages (*.page.tsx)
  redux/          Store, reducers
  styles/         Global + module SCSS
  types/          Shared TypeScript types
public/           Static assets + locales (kept at project root for Next.js)
```

## No-backend / mock layer

The app was previously backed by a REST API (axios) and socket.io. Those have
been removed and replaced with local mocks. The important details:

- **`src/api/<domain>/index.ts`** — every `api_*` / `apiSSR_*` function keeps
  its original name and signature, but resolves locally with mock data instead
  of making a network request. Consumers (components, redux, pages) are
  unchanged.
- **`src/api/_mock/db.ts`** — central mock data (user, currencies, wallet,
  games, providers, bets, …).
- **`src/api/_mock/respond.ts`** — helpers that wrap mock data in an
  axios-like `{ data, status }` response (`respond`, `respondCreated`,
  `respondPaged`).
- **`src/api/api.ts` / `src/api/apiSSR.ts`** — former axios instances, now
  no-op mock clients (any stray `api.get/post/...` call is a harmless no-op).
- **`src/libs/utils/socket-helpers.ts`** — returns a no-op fake socket; no
  real-time connection is opened.

### Auth flows (offline)

- **Sign up** (email or phone) → advances to the verification step → entering a
  code logs the user in and closes the modal.
- **Login** (email/phone + password) → logs the user in with a mock profile.
- **Logout** clears local state. 2FA is disabled in the mock so login is single
  step.

To populate different mock content (more games, balances, a different demo
user, etc.), edit `src/api/_mock/db.ts`.
