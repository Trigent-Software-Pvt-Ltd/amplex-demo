# Amplex Corporation — AI-Powered Customer Portal — Build Plan

## Overview
Build a production-grade Next.js customer portal for Amplex Corporation (3PL in Grand Prairie TX).
This is their competitive differentiator for an active RFP. The portal shows live iSeries V7R3
data with an AI chat assistant as the "wow factor."

**Stack:** Next.js 16 (already installed) · Tailwind CSS 4 · shadcn/ui · OpenAI via Vercel AI SDK · Recharts · NextAuth.js v5 · Lucide React

**Target repo:** https://github.com/Trigent-Software-Pvt-Ltd (new repo or existing amplex-demo)
**Deploy:** Vercel (`vercel --prod --yes --scope trigent-ark-os`)

---

## Phase 1: Foundation & Dependencies
**Goal:** Install all packages, configure Tailwind theme, fonts, shadcn/ui, and auth.

### 1.1 Install dependencies
```bash
npx shadcn@latest init
npx shadcn@latest add button input label textarea card badge tabs table sheet alert-dialog dialog sonner progress separator avatar dropdown-menu select scroll-area tooltip skeleton
npm install ai @ai-sdk/react @ai-sdk/openai recharts lucide-react next-auth@beta
npm install -D @types/node
```

### 1.2 Tailwind & Theme Configuration
- Light theme with custom palette:
  - navy: `#0C2340` (topbar, dark sections)
  - ampblue: `#1652CC` (primary accent, CTAs)
  - ampteal: `#0891B2` (secondary accent)
  - ampgreen: `#0D7A45` (success states)
  - Background: `#F4F6FA` (light gray)
- Add `Instrument Sans` (Google Fonts) as primary font via `next/font`
- Add `IBM Plex Mono` for order numbers, SKUs, tracking numbers, financial figures
- Update `globals.css` with light-first design tokens

### 1.3 Branding Assets
- Download Trigent favicon from `https://trigent.com/wp-content/uploads/trigent-_favicon.svg` to `public/`
- Reference ArkOS logo: `https://www.arkos.studio/TrigentArkOS-fullcolor-white.svg`
- Reference Trigent logo: `https://trigent.com/wp-content/uploads/trigent-_yellow-white-ho.svg`
- Logo areas use dark backgrounds so white logos work

### 1.4 Environment Setup
- Create `.env.local` with `OPENAI_API_KEY`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- Create `.env.example` with empty values for documentation
- Create `vercel.json` with env var references

### 1.5 NextAuth.js v5 Configuration
- Credentials provider (mock: `walmart@amplex.com` / `demo123`)
- Session with customer name "Walmart Stores Inc."
- Auth middleware to protect `/dashboard` and all portal routes
- Redirect unauthenticated users to `/login`

---

## Phase 2: Core Layout & Components
**Goal:** Build the shell — topbar, sidebar, AI panel, and reusable components.

### 2.1 Shared Components (`components/`)
- `ISeriesTag` — teal badge showing iSeries source table name with pulse dot
- `StatCard` — KPI card with value, label, sub-label, trend indicator
- `DataTable` — generic table wrapper with hover, monospace IDs, status pills
- `AlertBanner` — full-width alert (warning/danger/info) with optional action button
- `StockBar` — colored progress bar for inventory levels
- `ActionCard` — AI action confirmation card (Confirm/Cancel/View buttons)
- `Footer` — "Powered by Trigent ArkOS" with logo on dark background

### 2.2 Layout Components
- `Topbar` — fixed navy bar: Amplex logo, nav tabs, iSeries pill, AI status, customer avatar
- `Sidebar` — left sidebar (w-52) with module sections per spec (Overview, Receiving, Kitting, Bundling, Inventory, Fulfillment, Returns) with badges
- `AIPanel` — right panel (w-96) with chat, quick chips, streaming AI responses, action cards

### 2.3 Route Groups
- `(auth)/login/page.tsx` — login page (public)
- `(portal)/layout.tsx` — portal shell with Topbar + Sidebar + AIPanel
- `(portal)/dashboard/page.tsx` through `(portal)/reorder/page.tsx`

---

## Phase 3: Mock Data & Types
**Goal:** Create typed mock data matching all iSeries tables.

### 3.1 Types (`lib/types.ts`)
- InventoryItem, Order, BackOrder, Shipment, InboundPO, ReceivedPO
- KittingWO, BundlingWO, BOMComponent, Return, OrderChange
- CustomerInfo, AIMessage types

### 3.2 Mock Data (`lib/mockData.ts`)
All data from the system prompt:
- INVENTORY (3 SKUs with full detail)
- OPEN_ORDERS (4), BACK_ORDERS (2), SHIPPED_ORDERS (5), CANCELLED_ORDERS (3)
- ORDER_CHANGES (2 pending)
- INBOUND_POS (4 with progress %), RECEIVED_POS (5 with variance)
- KITTING_OPEN (3 WOs, one AT RISK), KITTING_DONE (4)
- BUNDLING_OPEN (5), BUNDLING_DONE (4)
- RETURNS (6 RMAs)
- BOMS (component lists per kit type)

---

## Phase 4: Pages (Build Order)
**Goal:** Build all 10 pages with full functionality.

### 4.1 Login Page (`/login`)
- Split layout: navy left (branding), white right (form)
- Amplex wordmark, tagline, feature pills
- Email + password fields → mock auth → redirect to `/dashboard`
- "Powered by Trigent ArkOS" footer with ArkOS logo on dark strip

### 4.2 Dashboard (`/dashboard`)
- Navy hero banner with greeting + 3 KPIs (OTIF 97.2%, Active Orders 7, Alerts 3)
- 4 StatCards row (Open Orders, Units Available, Inbound POs, Returns MTD)
- 3 AlertBanners (backorder, quarantine, order changes)
- Recent Shipments table with ISeriesTag "SHIPHDR"

### 4.3 Receiving (`/receiving`)
- Open Inbound POs table with progress bars (ISeriesTag: "PORCVHDR")
- Received POs table with variance column (ISeriesTag: "PORCVHDR + RCVLOG")

### 4.4 Kitting (`/kitting`)
- Context banner about kitting process
- Open WOs table with "At Risk" status for KIT-0043 (ISeriesTag: "WOHDR · type=KIT")
- "View BOM" sheet with component list + SIM pairing note
- Completed WOs table

### 4.5 Bundling (`/bundling`)
- Context banner about bundling
- Open WOs with Table/Timeline toggle (Recharts BarChart for timeline)
- Completed WOs table (ISeriesTag: "WOHDR · type=BND")

### 4.6 Inventory (`/inventory`)
- 3 tabs: Available (SKU cards with stock bars) | Allocated (table) | Quarantined (table + red alert)
- "Order Now" buttons on cards (ISeriesTag: "INVMST")

### 4.7 Fulfillment (`/fulfillment`)
- 5 tabs: Open Orders | Back Orders | Shipped | Cancelled | Order Changes
- Order Changes tab: Accept/Reject with AlertDialog confirmation + toast
- Order detail Sheet on "Details" click

### 4.8 Returns (`/returns`)
- 3 stat cards (Returns MTD, Restocked, Destroyed)
- RMA Log table (ISeriesTag: "RTNHDR + RTNDTL + INVADJ")
- "Raise New Return" multi-step Sheet (3 steps)

### 4.9 Reorder (`/reorder`)
- AI Insight banner about low stock
- Reorder cards per SKU with quantity controls
- Previous Orders table with "Repeat Order" button
- AlertDialog confirmation + success toast

### 4.10 Reports (`/reports`)
- Report generation page with available report types
- Download/email options

---

## Phase 5: AI Chat Integration
**Goal:** Wire up OpenAI streaming via Vercel AI SDK.

### 5.1 API Route (`app/api/chat/route.ts`)
- Use `@ai-sdk/openai` with `gpt-4o` model
- Full system prompt with all mock data context (verbatim from spec)
- Stream responses via `streamText` → `toDataStreamResponse()`

### 5.2 AI Panel Client (`components/layout/AIPanel.tsx`)
- `useChat` hook from `@ai-sdk/react`
- Typing indicator (bouncing dots) during streaming
- Quick chips for common queries
- Parse responses for action card triggers (reorder, return, report)
- Animated gradient orb avatar

---

## Phase 6: Polish & Quality
**Goal:** Responsive, loading states, error handling, animations.

- Skeleton loaders on all async sections
- Empty states for all tables
- Toast notifications (Sonner) for all actions
- Mobile responsive (iPad-friendly — Mika may demo on tablet)
- Smooth transitions on page navigation
- All order numbers/SKUs/tracking in `font-mono`
- "Powered by Trigent ArkOS" footer on every page

---

## Phase 7: Deploy
**Goal:** Push to GitHub and deploy to Vercel.

### 7.1 Pre-deploy
- Backup `.env.local` to `.env.local.backup` (not committed)
- Ensure `.gitignore` includes `.env*.local`, `.env.local.backup`
- Run `npm run build` to verify no errors
- Run `npm run lint` to verify no lint issues

### 7.2 GitHub Push
- Add remote: `https://github.com/Trigent-Software-Pvt-Ltd/amplex-demo`
- Push `master` branch (or `main`)

### 7.3 Vercel Deploy
```bash
# Backup env
cp .env.local .env.local.backup

# Deploy
npx vercel --prod --yes --scope trigent-ark-os

# Restore env after vercel overwrites
cp .env.local.backup .env.local
```

### 7.4 Set Vercel Environment Variables
- `OPENAI_API_KEY` — user must set in Vercel dashboard
- `NEXTAUTH_SECRET` — set via dashboard or CLI
- `NEXTAUTH_URL` — set to production URL
- `AUTH_SECRET` — NextAuth v5 uses this

---

## File Inventory (estimated ~25 files to create/modify)

```
app/
├── (auth)/login/page.tsx
├── (portal)/
│   ├── layout.tsx
│   ├── dashboard/page.tsx
│   ├── receiving/page.tsx
│   ├── kitting/page.tsx
│   ├── bundling/page.tsx
│   ├── inventory/page.tsx
│   ├── fulfillment/page.tsx
│   ├── returns/page.tsx
│   ├── reorder/page.tsx
│   └── reports/page.tsx
├── api/chat/route.ts
├── layout.tsx (update)
├── page.tsx (update → redirect to /login or /dashboard)
├── globals.css (update)
components/
├── layout/Topbar.tsx
├── layout/Sidebar.tsx
├── layout/AIPanel.tsx
├── layout/Footer.tsx
├── portal/ISeriesTag.tsx
├── portal/StatCard.tsx
├── portal/DataTable.tsx
├── portal/AlertBanner.tsx
├── portal/StockBar.tsx
├── portal/ActionCard.tsx
lib/
├── mockData.ts
├── types.ts
├── utils.ts
├── auth.ts (NextAuth config)
.env.example
vercel.json
```

---

## Execution Order

1. **Phase 1** — Foundation (deps, theme, fonts, auth, env) ~15 min
2. **Phase 3** — Mock data & types (needed by everything) ~10 min
3. **Phase 2** — Core components (ISeriesTag, StatCard, etc.) ~15 min
4. **Phase 2** — Layout (Topbar, Sidebar, portal layout) ~15 min
5. **Phase 4.1** — Login page ~10 min
6. **Phase 4.2** — Dashboard ~15 min
7. **Phase 4.3-4.9** — Remaining pages ~45 min
8. **Phase 5** — AI Chat integration ~15 min
9. **Phase 6** — Polish ~10 min
10. **Phase 7** — Deploy ~10 min
