# Video walkthrough — shot script (≈2.5–3 min)

Record your screen (any recorder works — `ffmpeg`, OBS, or the browser extension).
Narrate casually; this is the script, not a teleprompter.

| # | Shot | What to show / say | ~Time |
|---|------|-------------------|-------|
| 1 | **Intro** | Open https://tactyqal-hireathon.vercel.app — "This is my hire-a-thon submission: a full redesign of the Tactyqal homepage plus a new blog backend to replace the separate WordPress blog." | 10s |
| 2 | **Hero** | Pause on the hero — point out the animated headline, stat counters, pricing badge. Resize the window to phone width to show the mobile nav (hamburger → sheet). | 20s |
| 3 | **Scroll-through** | Slow scroll: success stories → 8-week timeline → why-us bento → video → tools → testimonials. One line: "All original sections, rebuilt responsive with a consistent dark-emerald design system." | 25s |
| 4 | **Blog preview on homepage** | Stop at "Learn from Industry Experts" — "These six cards are fetched live from my own API — not WordPress." | 10s |
| 5 | **Pricing + FAQ + contact** | Quick pass; open one FAQ item (keyboard-operable accordion), show the contact card + Google Calendar embed. | 15s |
| 6 | **Blog index** | Go to /blog — category badge, read time, cards from the DB. Click one article; show markdown rendering. | 20s |
| 7 | **Admin login** | Go to /admin, sign in with the admin account. "Auth via Supabase — signups are disabled, only the admin can log in." | 15s |
| 8 | **CRUD demo** | New post → fill title (slug auto-fills) → paste a couple markdown lines → status Published → Create. Show it in the table, Edit it (change title), then Delete it. | 35s |
| 9 | **API proof** | Open a terminal: `curl https://tactyqal-hireathon.vercel.app/api/posts?limit=3` (shows JSON), then `curl -X POST .../api/posts -d '{}'` → **401 Unauthorized**. "CRUD API with Zod validation; mutations require a Supabase JWT." | 25s |
| 10 | **Schema** | Switch to Supabase Dashboard → Table Editor: authors / categories / tags / posts / post_tags + RLS policies visible. "Relational schema with row-level security — public reads only published posts." | 20s |
| 11 | **Repo + outro** | Show github.com/varun-pahuja/tactyqal-hireathon (README with architecture, ER diagram, API docs). "Full source, setup guide and seed script are in the repo." | 15s |

**Total ≈ 3 min.** Export as MP4 and drop the link into README.md (replace "link added after recording") + the submission form.
