# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (starts on http://localhost:3000)
- **Build:** `npm run build`
- **Start production:** `npm run start`
- **Lint:** `npm run lint` (ESLint 9 flat config with Next.js core-web-vitals + TypeScript rules)

## Architecture

This is a Next.js 16 App Router project using:

- **Framework:** Next.js 16.1.6, React 19.2.3
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/postcss`)
- **Fonts:** Geist Sans and Geist Mono via `next/font`
- **Language:** TypeScript (strict mode)
- **Path alias:** `@/*` maps to project root

All routes live in `app/` using the App Router convention. The project uses Server Components by default.
