# Scheme Setu Data Architecture

## Current Data Sources
1. **Primary Source:** **myScheme Adapter**
   * **Role:** Acts as the primary, conceptual source for verified government schemes with structured eligibility rules.
   * **Implementation:** `server/services/adapters/MySchemeAdapter.js`. Since myScheme does not offer a public REST API for developers, this is currently backed by a high-quality, verified seeded dataset inside the adapter. This ensures no scraping is required and no fabricated APIs are created.
   
2. **Supplementary Source:** **Data.gov.in Adapter**
   * **Role:** Acts as a supplementary beneficiary/context source for unstructured/generic datasets (e.g., UDYAM registered units or demographic stats).
   * **Implementation:** `server/services/adapters/DataGovAdapter.js`. This fetches from the `DATA_GOV_RESOURCE_ID` if provided.
   * **Note:** The old "Eleventh Plan secondary-education" dataset is no longer treated as a primary scheme source because it is a generic, outdated dataset and does not contain structured eligibility rules.

## Data Normalization
The `Scheme` object is normalized across both sources via the adapters to match the `src/types/scheme.ts` interface. It includes:
- `id`, `name`, `description`, `ministry`, `category`
- `eligibilityRules` (structured operators)
- `requiredDocuments`
- `sourceName`, `sourceUrl`

## Eligibility-Rule Representation
Rules are evaluated by the backend `matchingEngine.js` using a structured JSON tree:
```json
{
  "operator": "AND",
  "conditions": [
    { "field": "income", "operator": "<=", "value": 1800000 },
    { "field": "category", "operator": "IN", "value": ["sc", "st"] }
  ]
}
```
Supported operators: `=`, `!=`, `>`, `>=`, `<`, `<=`, `IN`, `NOT_IN`, `TRUE`, `FALSE`.

## Match Statuses
The engine produces one of three match statuses per scheme:
1. `eligible`: All structured rules evaluate to true.
2. `needs_verification`: The user is missing profile fields required by the rules, OR the scheme does not have fully verified structured rules (`eligibilityRulesVerified: false`).
3. `not_eligible`: One or more structured rules evaluate to false (e.g., income too high).

## Source Attribution
Every returned scheme includes `sourceName` (e.g., "myScheme" or "data.gov.in (Supplementary)") and `sourceUrl` so users can verify the information officially.

## Adding Another Government Source
1. Create a new adapter in `server/services/adapters/NewAdapter.js`.
2. Normalize the external data to match the `Scheme` type.
3. Import and add it to `Promise.all` in `server/routes/public-schemes.js`.

## Environment Variables
- `DATA_GOV_API_KEY`: API key for data.gov.in
- `DATA_GOV_RESOURCE_ID`: ID for supplementary dataset fetching
- `JWT_SECRET`: Required in production (no insecure fallback)
- `ALLOWED_ORIGINS`: Comma-separated CORS allowlist (credentials enabled)
- `GEMINI_API_KEY`: Server-side chat only
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`: Admin seed script only

## API Endpoints
- `GET /api/schemes`: Returns all merged, cached schemes from all adapters.
- `POST /api/schemes/match`: Accepts a user profile body and returns structured evaluation results (`{ matchStatus, matchReasons, unmetCriteria, missingFields }`).
- `POST /api/user-schemes`: Recomputes matches server-side from the saved profile and persists **eligible** schemes only.
- `POST /api/chat`: Authenticated, rate-limited Gemini assistant grounded on the catalog.

## Recommendation policy
Only schemes with `matchStatus: "eligible"` (verified structured rules that fully pass) are saved to the user dashboard. Schemes without rules remain browseable via `GET /api/schemes` but are not auto-recommended.
