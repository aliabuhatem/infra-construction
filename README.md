# INFRA Construction — Website

Corporate website for **INFRA Construction**, a leading contracting company delivering infrastructure, buildings, energy, and industrial projects across the Middle East and Africa since 1990.

## Tech Stack

- **Next.js 16** (App Router, fully static)
- **Tailwind CSS v4**
- **TypeScript**
- **Google Fonts** — Barlow Condensed (headings) + Source Sans 3 (body)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design System

| Token | Value |
|-------|-------|
| Primary | `#213B4D` (Dark Blue) |
| Secondary | `#1F93A4` (Teal Blue) |
| Gray | `#5E5E5E` |
| Heading font | Barlow Condensed (600) |
| Body font | Source Sans 3 (400 / 600) |

Custom tokens are defined in `app/globals.css` under `@theme {}`.

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About |
| `/sectors` | Sectors overview |
| `/sectors/infrastructure-civil-works` | Infrastructure & Civil Works |
| `/sectors/engineering-epc` | Engineering & EPC |
| `/sectors/energy-power` | Energy & Power |
| `/sectors/water-utilities` | Water & Utilities |
| `/sectors/industrial-oil-services` | Industrial & Oil Services |
| `/sectors/facilities-management` | Facilities Management |
| `/projects` | Projects |
| `/news` | News |
| `/careers` | Careers |
| `/contact` | Contact |

## Project Structure

```
app/                  # Pages (Next.js App Router)
components/
  Navbar.tsx          # Fixed top navigation
  Footer.tsx          # Site footer
  SectorLayout.tsx    # Shared layout for all sector detail pages
public/media/         # Hero images and photography
```

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Run ESLint
```
