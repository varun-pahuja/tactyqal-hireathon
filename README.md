# Tactyqal Labs — Hire-a-thon Submission

**Task 1 — Homepage redesign** · **Task 2 — Blog backend architecture**

A single Next.js application that replaces the old split (CodeIgniter homepage + separate WordPress blog) with one modern, deployable product: a redesigned marketing homepage, a REST API–driven blog, and an admin CMS.

🌐 **Live demo:** https://tactyqal-hireathon.vercel.app  
🎬 **Video walkthrough:** _link added after recording_

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui (radix) |
| Database | Supabase (hosted Postgres + Auth) |
| API | Next.js Route Handlers (REST) + Zod validation |
| Blog rendering | react-markdown |
| Deploy | Vercel |

## Architecture

```
tactyqal-hireathon/
├── app/
│   ├── page.tsx                # Task 1: homepage (13 sections)
│   ├── blog/page.tsx           # Blog index
│   ├── blog/[slug]/page.tsx    # Article view (markdown)
│   ├── admin/page.tsx          # CMS: Supabase Auth + CRUD UI
│   └── api/posts/route.ts      # GET list · POST create
│       └── [id]/route.ts       # GET · PUT · DELETE
├── components/                 # navbar, reveal, count-up, sections/
├── lib/
│   ├── content.ts              # homepage copy/data
│   ├── types.ts                # Post types
│   └── supabase/
│       ├── admin.ts            # service-role client (server-only)
│       └── auth.ts             # JWT verification for mutations
├── supabase/schema.sql         # tables + indexes + RLS
└── scripts/seed.mjs            # seeds 6 real posts from tactyqal.com
```

### Entity-relationship diagram

```mermaid
erDiagram
    authors ||--o{ posts : writes
    categories ||--o{ posts : "categorizes"
    posts ||--o{ post_tags : ""
    tags ||--o{ post_tags : ""
    authors { uuid id PK name text avatar_url text bio text }
    categories { uuid id PK name text slug text }
    tags { uuid id PK name text slug text }
    posts { uuid id PK slug text title text excerpt text content text cover_image text author_id FK category_id FK status text read_time int published_at timestamptz created_at timestamptz updated_at timestamptz }
    post_tags { uuid post_id PK,FK uuid tag_id PK,FK }
```

**RLS policy:** public can `SELECT` only `status='published'` posts (and reference tables). All `INSERT/UPDATE/DELETE` are denied to anon — mutations happen exclusively through route handlers holding `SUPABASE_SERVICE_ROLE_KEY` (server-side env var, never exposed to the browser). Mutations additionally require a valid Supabase Auth JWT.

## REST API

Base path: `/api/posts`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/posts` | — | List posts. Query: `slug`, `category`, `status` (`draft` requires auth), `page`, `limit` (≤50). Returns `{ items, total, page, limit }` |
| `POST` | `/api/posts` | Bearer JWT | Create post (Zod-validated; kebab-case slug enforced) |
| `GET` | `/api/posts/:idOrSlug` | —* | Fetch one post (*drafts require auth) |
| `PUT` | `/api/posts/:idOrSlug` | Bearer JWT | Partial update; publishing auto-stamps `published_at` |
| `DELETE` | `/api/posts/:idOrSlug` | Bearer JWT | Delete post |

Example:

```bash
# Public list
curl https://<deploy>/api/posts?limit=6

# Authenticated create
curl -X POST https://<deploy>/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -d '{"slug":"my-post","title":"My Post","content":"# Hello","status":"published"}'
```

Error shape: `{ "error": string, "details"?: object }` with 400/401/404/409/500.

## Database setup (Supabase cloud)

1. Create a project at [supabase.com](https://supabase.com)
2. SQL Editor → paste `supabase/schema.sql` → Run
3. Authentication → Providers → Email enabled; Settings → **disable sign-ups**
4. Authentication → Users → add your admin user
5. Project Settings → API → copy URL, anon key, service role key into `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>   # server-only, never NEXT_PUBLIC_
```

Seed the 6 original blog posts (scrapes live content from tactyqal.com):

```bash
node scripts/seed.mjs
```

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

- **Homepage:** `/`
- **Blog:** `/blog`
- **Admin CMS:** `/admin` (sign in with your Supabase Auth user)

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import in Vercel → Framework: Next.js
3. Add the 3 env vars above → Deploy

## Design direction & inspiration

The redesign keeps Tactyqal's brand (near-black navy + emerald) and levels it up with:

- **godly.website / recent.design** — dark editorial rhythm, oversized display type, one idea per screen
- **21st.dev** — component patterns (bento feature grids, single pricing card, testimonial cards, marquee stats)
- **reactbits.dev** — motion vocabulary: staggered word-reveal hero, scroll reveals, count-up stats, spotlight cards (implemented as lightweight CSS/IntersectionObserver equivalents to keep JS small)
- **Pinterest / Instagram** — avatar-led testimonials, screenshot-first showcase grid
- **shadcn/ui** — accordion, sheet (mobile nav), dialog, table primitives throughout

UX guardrails: WCAG AA contrast, `prefers-reduced-motion` respected globally, keyboard-operable nav/accordion/dialogs, 44px touch targets, skeleton/empty/error states on async content, click-to-load video facade protecting LCP, `next/image` with reserved aspect ratios (no CLS).

## Requirements checklist

- [x] Homepage redesign — modern UI, responsive, all original sections reimagined
- [x] Blog backend — relational schema + CRUD REST APIs + validation + auth
- [x] Blog frontend — index + article views served by our own API/DB (no WordPress)
- [x] Admin interface — login, create, edit, publish/draft, delete
- [x] GitHub repository — https://github.com/varun-pahuja/tactyqal-hireathon
- [x] Live URL — https://tactyqal-hireathon.vercel.app
- [ ] Video walkthrough — added after recording
