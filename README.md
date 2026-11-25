# Omega Medical Laboratory & Scan Center — Website Demonstration

A premium, responsive healthcare and diagnostic services website demonstration built by **Falcus Media** for prospective presentation to **Omega Medical Laboratory & Scan Center** (Abuja, Federal Capital Territory, Nigeria).

> **Demonstration Notice:** Business information, services, test listings, pricing, and operational details in this showcase are demonstration placeholders subject to confirmation by Omega Medical Laboratory. No real patient records or clinical diagnoses are stored.

---

## Technology Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Routing:** React Router v7
- **Forms & Validation:** React Hook Form + Zod
- **Charts:** Recharts
- **Backend Architecture:** Supabase-ready (`@supabase/supabase-js` + `supabase/schema.sql` with PostgreSQL Row Level Security)

---

## Installation & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Type-check and build for production:**
   ```bash
   npm run build
   ```

4. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## Environment Variables & Supabase Setup

Copy `.env.example` to `.env` and populate your Supabase project credentials when moving from Demonstration Mode to a live backend:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

- When environment variables are **not set**, the app automatically runs in **Demonstration Mode** using local mock data (`src/data/mockData.ts`) persisted in browser `localStorage`.
- To provision the database tables and Row Level Security (RLS) policies, execute `supabase/schema.sql` in the Supabase SQL Editor.

---

## Admin Dashboard (`/admin`)

The protected management dashboard is available at `/admin`.

- **Demonstration Credentials (when Supabase env vars are unset):**
  - **Email:** `admin@omega-demo.local`
  - **Password:** `OmegaDemo2026!`
- **Production Security:** In production, never rely on frontend-only checks. Configure Supabase Auth and assign `role = 'admin'` or `'staff'` in the `public.profiles` table; all database reads/writes for sensitive tables (`appointments`, `contact_enquiries`, `website_settings`) are enforced server-side via RLS policies in `supabase/schema.sql`.

---

## Placeholder Replacement Guide

Before going live after client approval, replace all placeholders:

1. **Company Profile (`src/pages/AboutPage.tsx`):**
   - `[CONFIRMED COMPANY HISTORY]`
   - `[CONFIRMED YEAR ESTABLISHED]`
   - `[APPROVED MISSION]`
   - `[APPROVED VISION]`
   - `[CONFIRMED MANAGEMENT INFORMATION]`
2. **Contact & Location (`Website Settings` in `/admin` or `src/data/mockData.ts`):**
   - Verify provisional address (`NIPCO Filling Plaza, Banex Junction, off Aminu Kano Crescent, Wuse II, Abuja, Nigeria`)
   - Verify provisional phone (`+234 818 387 5164`)
   - Replace `[OFFICIAL BUSINESS EMAIL]` and `[CONFIRMED WORKING HOURS]`
   - Update Google Maps directions/embed URL
3. **Team Profiles (`Team Members` in `/admin` or `src/data/mockData.ts`):**
   - Replace placeholder names, biographies, verified qualifications, and professional registrations (if approved) and upload approved staff photographs.
4. **Services, Test Catalogue & Health Packages (`/admin`):**
   - Confirm active services, test preparation instructions, turnaround times (`turnaround_approved`), and approved package pricing (`is_price_approved`).
5. **Logo & Legal Pages:**
   - Set `logo_url` in Website Settings (or replace `src/components/BrandLogo.tsx`) with Omega's official logo.
   - Replace placeholder text in `src/pages/PrivacyPolicyPage.tsx` and `src/pages/TermsPage.tsx` after legal review.

---

## Deployment

This Vite application can be deployed to **Vercel**, **Netlify**, or **Cloudflare Pages**:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your hosting provider's environment variables, and ensure SPA fallback routing redirects all paths to `index.html`.
