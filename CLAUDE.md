# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Live URL

https://amplex-demo.vercel.app

## Commands

- **Dev server:** `npm run dev` (starts on http://localhost:3000)
- **Build:** `npm run build`
- **Start production:** `npm run start`
- **Lint:** `npm run lint` (ESLint 9 flat config with Next.js core-web-vitals + TypeScript rules)
- **Deploy:** `npx vercel --prod --yes --scope trigent-ark-os`

## Architecture

Amplex Corporation AI-Powered Customer Portal — a 3PL customer-facing portal with live iSeries V7R3 mock data and an AI chat assistant.

- **Framework:** Next.js 16.1.6, React 19.2.3
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/postcss`) with custom Amplex palette (navy, ampblue, ampteal, ampgreen)
- **UI:** shadcn/ui (base-nova style), Lucide React icons, Recharts for charts
- **Fonts:** Instrument Sans (display), IBM Plex Mono (code/data), Geist Sans/Mono (fallback)
- **AI:** Azure OpenAI gpt-4.1 via Vercel AI SDK (`@ai-sdk/azure`), streaming chat in right panel
- **Auth:** NextAuth.js v5 with mock credentials (walmart@amplex.com / demo123)
- **Language:** TypeScript (strict mode)
- **Path alias:** `@/*` maps to project root

## Route Structure

- `app/(auth)/login` — Split-screen login page
- `app/(portal)/layout.tsx` — Portal shell (Topbar + Sidebar + AIPanel + Footer)
- `app/(portal)/dashboard` — KPIs, alerts, recent shipments
- `app/(portal)/receiving` — Inbound PO tracking
- `app/(portal)/kitting` — Kit assembly work orders with BOM viewer
- `app/(portal)/bundling` — Bundling work orders with timeline chart
- `app/(portal)/inventory` — Available/Allocated/Quarantined tabs
- `app/(portal)/fulfillment` — 5-tab order management (Open/Back/Shipped/Cancelled/Changes)
- `app/(portal)/returns` — RMA log + multi-step return wizard
- `app/(portal)/reorder` — Quick reorder cards + previous orders
- `app/(portal)/reports` — Report generation (PDF/Excel/Email)
- `app/api/chat/route.ts` — Azure OpenAI streaming endpoint
- `app/api/auth/[...nextauth]/route.ts` — NextAuth API

## Key Files

- `lib/mockData.ts` — All iSeries mock data (inventory, orders, shipments, kitting, returns, BOMs)
- `lib/types.ts` — TypeScript interfaces for all data models
- `lib/auth.ts` — NextAuth v5 configuration
- `components/portal/` — Reusable components (ISeriesTag, StatCard, DataTable, AlertBanner, StatusPill, StockBar, ActionCard, Footer)
- `components/layout/` — Topbar, Sidebar, AIPanel

## Environment Variables

- `AZURE_RESOURCE_NAME` — Azure OpenAI resource name
- `AZURE_API_KEY` — Azure OpenAI API key
- `AUTH_SECRET` — NextAuth session encryption secret
- `AUTH_URL` — NextAuth base URL (production: https://amplex-demo.vercel.app)

## Branding

- Amplex logo: `https://amplex.com/wp-content/uploads/2020/12/amplex-logo.png`
- Trigent logo: `https://trigent.com/wp-content/uploads/trigent-_yellow-white-ho.svg`
- ArkOS logo: `https://www.arkos.studio/TrigentArkOS-fullcolor-white.svg`
- Trigent favicon: `https://trigent.com/wp-content/uploads/trigent-_favicon.svg`
