# SchemeSetu: Bridging Citizens to Benefits

> **Team Bug Squashers**

![Project Status](https://img.shields.io/badge/Status-Prototype-orange)

## Abstract
**SchemeSetu** (Scheme Bridge) helps citizens discover Indian government schemes. Users enter a profile; a **rules-based matching engine** evaluates structured eligibility criteria and recommends schemes that pass verified rules. An optional **Gemini** chat assistant answers questions grounded on the scheme catalog (sign-in required).

## How matching works
1. Capture profile attributes (age, income, occupation, location, etc.).
2. Evaluate each scheme’s `eligibilityRules` tree (`AND` / `OR`, operators like `<=`, `IN`).
3. Return `eligible`, `needs_verification`, or `not_eligible`.
4. **Recommendations only include `eligible` schemes** with verified rules — schemes without structured rules are browseable but not auto-recommended.

See [SCHEME_DATA_ARCHITECTURE.md](./SCHEME_DATA_ARCHITECTURE.md) for adapters, caching, and rule format.

## Tech stack
- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Express, MongoDB (Mongoose), JWT (httpOnly cookie)
- **Matching:** Deterministic rules engine (`server/services/matchingEngine.js`)
- **Chat:** Google Gemini 2.5 Flash (authenticated, rate-limited, catalog-grounded)

## Setup
```bash
cp .env.example .env
# set MONGODB_URI, JWT_SECRET, GEMINI_API_KEY, ALLOWED_ORIGINS
npm install
npm run seed   # requires SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD
npm run dev
```

## Scripts
| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite + API |
| `npm run server` | API only |
| `npm test` | Matching engine unit tests |
| `npm run seed` | Create/update admin from env |

## Security notes
- `JWT_SECRET` is required in production (no hardcoded fallback).
- Auth cookies are httpOnly; CORS is allowlisted via `ALLOWED_ORIGINS`.
- `/api/chat` requires login and is rate-limited.
- User-scheme saves are recomputed on the server (clients cannot forge eligibility scores).

## Roadmap
- [ ] Expand verified structured rules across the catalog
- [ ] Multilingual / voice UX beyond EN/HI UI strings
- [ ] Admin scheme CRUD and rule editor
- [ ] Application-form assistant
