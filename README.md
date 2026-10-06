# Tigotek HQ

An interactive headquarters based on **Tigotek HQ Workplace Concept — Draft 01, 4 October 2026**. This is the developed version, kept separate from the original live-office prototype.

- Website: https://tigotek-hq.vercel.app
- Repository: https://github.com/iratul825/tigotek-development
- Preserved prototype: https://tigotek-live-office.vercel.app
- Prototype repository: https://github.com/iratul825/tigotek-prototype

## Experience

Explore The Commons (G), The Studio (L1), and The Engine Room (L2). Floor selection animates the architectural model into focus. Switch to a plan, inspect 28 rooms, search by purpose, and read the original concept brief. Room areas and capacities come from the PDF; modeled geometry is indicative and is not a construction drawing or live occupancy feed.

The linked client workspace retains the original project dashboard, approvals, assets, tasks and review tools. The dashboard starts with clearly labeled FABRIPASS demo data. Invited users share the connected preview discussion; other original prototype state remains scoped to each signed-in account. This release does not synchronize external task trackers or deployment percentages.

## Local development

Requires Node.js 24 and npm. Run `npm ci --ignore-scripts`, then `npm run dev`. The local preview uses SQLite and files under ignored `.data/`, and serves http://127.0.0.1:3185. Local authentication is a loopback-only preview identity; do not expose that server publicly.

Run `npm run build`, `npx tsc --noEmit`, and `node --test tests/server.test.mjs` for the portable build, type check and persistence/security regression tests.

## Vercel

The Vercel Build Output API adapter is `server/vercel.ts`; `node scripts/vercel-build.mjs` builds the static client and the Node.js 24 API function. Deploy with `vercel deploy --prebuilt --prod` after linking this directory to **tigotek-hq**, never the prototype project.

Vercel uses its own Neon database/Auth instance and private Blob store. Required environment variables are `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `BLOB_READ_WRITE_TOKEN`, and `PORTAL_OWNER_EMAIL`. Never commit `.env*` values. Configure the production domain as a trusted origin in Neon Auth. The owner creates an account with the configured owner email and verifies it, then uses **Client access** to allow client emails.

Access is invitation-only and verified on the server. Untrusted identity headers are discarded. The owner controls the connected preview URL, while invited users can comment and reply. Private asset downloads require an authenticated owner match. Vercel uploads are limited to approximately 3.5 MB because requests pass through a server function.

The original Sites deployment and its existing data are independent; they are not migrated or overwritten by this repository.
