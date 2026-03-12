# Spendx 🗺️✨

> No more group chat graveyards. One link controls your whole day—where you go, how you get there, who's coming, and what it costs.

Spendx is a next-generation social planning and live-location coordination platform. It combines real-time map visualization, AI-driven venue planning, and seamless group coordination into a single, high-performance web application.

---

##  Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling & Animation:** [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **AI Engine:** [OpenRouter](https://openrouter.ai/)
- **Routing & Maps:** [Valhalla](https://github.com/valhalla/valhalla)
- **Payments:** [Dodo Payments](https://dodopayments.com/)
- **Notifications:** [OneSignal](https://onesignal.com/)

---

## 🏗️ Project Architecture

The project follows a strict domain-driven structure within the Next.js App Router paradigm. Business logic is strictly separated from UI components.

```text
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/             # Authentication routes (login, signup)
│   │   ├── (main)/             # Core app routes (dashboard, map, chat)
│   │   └── api/                # Serverless API endpoints (chat, squad, payments, etc.)
│   ├── components/             # Reusable React components (UI, layout, domain-specific)
│   ├── lib/                    # Core business logic and external integrations
│   │   ├── affiliates/         # Affiliate link generation and tracking
│   │   ├── ai/                 # OpenRouter client, prompts, and venue querying
│   │   ├── db/                 # Supabase client and schema definitions
│   │   ├── geolocation/        # Geocoding, distance math, and bounds calculation
│   │   ├── notifications/      # OneSignal client and push triggers
│   │   ├── payments/           # Dodo client and webhook handlers
│   │   ├── routing/            # Valhalla routing client and polyline decoding
│   │   └── snapchat/           # Snapchat Lens client and filter templates
│   ├── public/                 # Static assets (manifest, fonts, icons, images)
│   ├── scripts/                # Utility scripts (Valhalla build, DB seeding, type gen)
│   ├── tests/                  # Unit, integration, and E2E tests
│   └── types/                  # Global TypeScript definitions
```

---

## ✅ What Has Been Done (Current State)

1. **Map UI Upgrade (Landing Page):**
   - **Design System Integration:** Implemented a new design system using CSS variables (`src/styles/tokens.css`) for seamless light/dark mode switching.
   - **Typography:** Integrated `DM Sans` (body), `Fraunces` (display), and `JetBrains Mono` (numbers).
   - **Heatmap Illusion:** Added a dynamic heatmap layer (`HeatmapLayer.tsx`) that visualizes venue "vibe" scores.
   - **Animated Elements:** Implemented CSS animations (`pop-in`, `bounce`, `pulse-lime`, `pulse-cyan`, `dash-move`) to create a "living" map feel.
   - **Interactive Map Features:** 
     - Venue pins with dynamic emojis and colors based on category.
     - "Trending" badges for high-vibe venues.
     - Marker clustering using `react-leaflet-cluster` for performance.
     - Squad distance lines with tooltips.
     - Animated route overlays showing movement.
   - **Bottom Sheet Enhancements:** 
     - Implemented a draggable bottom sheet (`BottomSheet.tsx`) with collapsed, half, and full states.
     - Added an AI suggestion section with a "Plan it" button.
     - Integrated scrollable lists for active squad members and trending nearby venues.
   - **Global Geolocation:** 
     - Implemented browser Geolocation API with an IP-based fallback (`ipapi.co`).
     - Added reverse geocoding via Nominatim OpenStreetMap API to detect the user's city.
   - **Lottie Animations:** Replaced static icons in the HUD and Theme Toggle with Lottie animations for a premium feel.
   - **Social Proof:** Updated the waitlist section with DiceBear avatars and dynamic participant counts.
   - **Footer:** Updated footer branding to "A Detova Labs Project".
2. **Next.js 14 Scaffolding:**
   - Set up the App Router structure with `(auth)` and `(main)` route groups.
   - Created foundational API route files (`/api/auth`, `/api/chat`, `/api/squad`, `/api/payment`, etc.) with `NextResponse` boilerplate.
3. **Domain-Driven Library Structure:**
   - Scaffolded all necessary integration files in `src/lib/` for Database, AI, Routing, Payments, Notifications, Affiliates, Geolocation, and Snapchat.
4. **Type & Script Foundations:**
   - Created placeholder files for global types (`database.ts`, `models.ts`, etc.) and utility scripts (`build-valhalla.ts`, `seed-venues.ts`).

---

## 🚧 What Needs To Be Done (Developer Roadmap)

### Phase 1: Data & Authentication
- [ ] **Database Schema:** Define the PostgreSQL schema in `src/lib/db/schema.ts` (Users, Squads, Venues, Plans, Messages).
- [ ] **Supabase Setup:** Initialize the Supabase client in `src/lib/db/client.ts` and configure Row Level Security (RLS).
- [ ] **Authentication:** Implement login/signup flows in `src/app/(auth)` using Supabase Auth.

### Phase 2: Core Features (Map & AI)
- [ ] **Live Map Integration:** Replace the landing page map placeholder with a real interactive map (e.g., Mapbox GL JS or MapLibre).
- [ ] **Valhalla Routing:** Implement `src/lib/routing/valhalla-client.ts` to fetch directions and decode polylines for squad movement.
- [ ] **AI Venue Planning:** Wire up `src/lib/ai/openrouter.ts` to take user prompts and return structured venue itineraries.

### Phase 3: Real-Time Squad Coordination
- [ ] **Live Location Sync:** Use Supabase Realtime to broadcast and subscribe to squad member coordinates.
- [ ] **Group Chat:** Implement real-time messaging in `src/components/chat` and `/api/chat`.

### Phase 4: Monetization & Growth
- [ ] **Payments:** Implement Dodo Payments checkout flow and handle webhooks in `src/lib/payments/webhook-handler.ts`.
- [ ] **Affiliates:** Build the tracking logic in `src/lib/affiliates/tracking.ts` to attribute venue bookings to referrers.
- [ ] **Snapchat Integration:** Connect the Snapchat Lens API to generate custom squad filters.

---

## 💻 Developer Setup Guide

### Prerequisites
- Node.js (v18.17+)
- npm or pnpm
- Docker (optional, for local Valhalla/Postgres instances)

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory. You will need the following keys:

```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenRouter (AI)
OPENROUTER_API_KEY=your_openrouter_api_key

# Valhalla (Routing)
VALHALLA_ENDPOINT=http://localhost:8002/route

# Dodo Payments
DODO_SECRET_KEY=your_dodo_secret_key
DODO_WEBHOOK_SECRET=your_dodo_webhook_secret

# OneSignal (Push Notifications)
NEXT_PUBLIC_ONESIGNAL_APP_ID=your_onesignal_app_id
ONESIGNAL_REST_API_KEY=your_onesignal_rest_api_key

# Snapchat
SNAPCHAT_CLIENT_ID=your_snapchat_client_id
SNAPCHAT_CLIENT_SECRET=your_snapchat_client_secret
```

### 3. Running the Development Server
Start the Next.js development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### 4. Available Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built production app.
- `npm run lint`: Lints the codebase using ESLint and TypeScript.
- `npm run typecheck`: Runs TypeScript compiler checks.

*(Custom scripts in `src/scripts/` can be executed via `npx tsx src/scripts/<script-name>.ts`)*

---

## 📐 Coding Guidelines

1. **Server Components by Default:** Use React Server Components (RSC) wherever possible. Only add `"use client"` when interactivity (hooks, event listeners) is strictly required.
2. **Secure API Routes:** All routes in `src/app/api/` must validate user sessions via Supabase before processing requests.
3. **No Business Logic in UI:** Keep components dumb. Complex logic should live in `src/lib/` and be called via Server Actions or API routes.
4. **Strict Typing:** Avoid `any`. Define all interfaces in `src/types/` and use them consistently.
