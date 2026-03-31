# Amplex Corporation — AI-Powered Customer Portal

**Live:** [https://amplex-demo.vercel.app](https://amplex-demo.vercel.app)

An AI-powered customer portal for Amplex Corporation, a 3PL company in Grand Prairie, TX that kits and fulfills telecom handsets for brands like SimplMobile, TrackPhone, and TotalWireless.

## Features

- **AI Chat Assistant** — Azure OpenAI-powered chat with live iSeries V7R3 data context. Ask about inventory, orders, OTIF, or request reorders/returns/reports.
- **Dashboard** — KPIs, alert banners, recent shipments at a glance
- **Receiving** — Inbound PO tracking with progress bars
- **Kitting & Bundling** — Work order management with BOM viewer and timeline charts
- **Inventory** — Available/Allocated/Quarantined views with stock level bars
- **Fulfillment** — Full order lifecycle (open, back orders, shipped, cancelled, changes)
- **Returns** — RMA log with multi-step return wizard
- **Quick Reorder** — One-click reorder from previous orders
- **Reports** — Generate OTIF, inventory, fulfillment, and accessorial reports

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/) + Azure OpenAI (gpt-4.1)
- [NextAuth.js v5](https://authjs.dev/) (mock credentials)
- [Recharts](https://recharts.org/) + [Lucide React](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Demo login: `walmart@amplex.com` / `demo123`

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
AZURE_RESOURCE_NAME=    # Azure OpenAI resource name
AZURE_API_KEY=          # Azure OpenAI API key
AUTH_SECRET=            # NextAuth session secret
AUTH_URL=               # http://localhost:3000 for dev
```

## Deploy

```bash
npx vercel --prod --yes --scope trigent-ark-os
```

---

Powered by [Trigent ArkOS](https://www.arkos.studio/)
