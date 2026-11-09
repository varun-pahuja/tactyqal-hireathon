// Seed the Supabase blog with the 6 real Tactyqal blog posts.
// Usage: node scripts/seed.mjs   (requires .env.local with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import * as cheerio from "cheerio";
import TurndownService from "turndown";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  const raw = readFileSync(resolve(root, ".env.local"), "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

const POSTS = [
  {
    slug: "elevator-pitch-with-examples-for-business-entrepreneurs",
    title: "The elevator pitch for business entrepreneurs",
    excerpt:
      "An elevator pitch is the fastest way to describe what your startup does — and why anyone should care.",
    read_time: 3,
    published_at: "2024-05-01T00:00:00.000Z",
    cover_image:
      "https://www.tactyqal.com/application/assets/images/blog-ele.png",
    url: "https://www.tactyqal.com/blog/elevator-pitch-with-examples-for-business-entrepreneurs/",
    category: "Entrepreneurship",
  },
  {
    slug: "how-to-build-a-tech-startup-team-2",
    title: "How to build a tech startup team?",
    excerpt:
      "In the early days, the fewer employees, the better. Managing people takes up a lot of time — here's how to get the team right.",
    read_time: 4,
    published_at: "2024-04-20T00:00:00.000Z",
    cover_image:
      "https://www.tactyqal.com/application/assets/images/blog-startup.png",
    url: "https://www.tactyqal.com/blog/how-to-build-a-tech-startup-team-2/",
    category: "Startup Growth",
  },
  {
    slug: "11-reasons-why-startups-fail-at-idea-stage",
    title: "11 reasons why startups fail at the idea stage",
    excerpt:
      "The default state of a startup is failure — and there are many reasons it happens before v1 even ships.",
    read_time: 3,
    published_at: "2024-04-10T00:00:00.000Z",
    cover_image:
      "https://www.tactyqal.com/application/assets/images/blog-fail.png",
    url: "https://www.tactyqal.com/blog/11-reasons-why-startups-fail-at-idea-stage/",
    category: "Startup Growth",
  },
  {
    slug: "50-no-code-startup-ideas-to-build-without-programming-skills",
    title: "50 No-code startup app ideas",
    excerpt:
      "Find a list of 50 unique ideas you can explore for your startup — no programming skills required.",
    read_time: 5,
    published_at: "2025-07-09T00:00:00.000Z",
    cover_image:
      "https://www.tactyqal.com/application/assets/images/50-No-Code-Startup-Ideas-You-Can-Build-Without-Programming-Skills.webp",
    url: "https://tactyqal.com/blog/50-no-code-startup-ideas-to-build-without-programming-skills/",
    category: "Ideas & Inspiration",
  },
  {
    slug: "30-startup-ideas-for-solving-food-waste-problems",
    title: "30 Startup ideas to solve food waste problems",
    excerpt:
      "Food waste is a massive problem. Every year, we throw away one-third of all food — 30 ideas to fix that.",
    read_time: 4,
    published_at: "2024-03-15T00:00:00.000Z",
    cover_image:
      "https://www.tactyqal.com/application/assets/images/30-startup-ideas-for-food-waste-problems.jpg",
    url: "https://tactyqal.com/blog/30-startup-ideas-for-solving-food-waste-problems/",
    category: "Ideas & Inspiration",
  },
  {
    slug: "50-startup-ideas-for-generation-z-entrepreneurs",
    title: "50 Startup ideas for Gen-Z Entrepreneurs",
    excerpt:
      "Looking at the opportunities ahead, Generation Z entrepreneurs has advantages — 50 ideas to run with.",
    read_time: 6,
    published_at: "2024-03-05T00:00:00.000Z",
    cover_image:
      "https://www.tactyqal.com/application/assets/images/50-Startup-Ideas-for-Generation-Z-Entrepreneurs.jpg",
    url: "https://tactyqal.com/blog/50-startup-ideas-for-generation-z-entrepreneurs/",
    category: "Ideas & Inspiration",
  },
];

const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });

async function fetchMarkdown(url) {
  const res = await fetch(url, { headers: { "user-agent": "tactyqal-seed/1.0" } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${url}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const el = $(".blog-single-content").first();
  if (!el.length) throw new Error(`Content container not found: ${url}`);
  // Make relative links absolute
  el.find("[href]").each((_, a) => {
    const href = $(a).attr("href");
    if (href && !href.startsWith("http") && !href.startsWith("#")) {
      $(a).attr("href", new URL(href, url).toString());
    }
  });
  el.find("[src]").each((_, img) => {
    const src = $(img).attr("src");
    if (src && !src.startsWith("http")) {
      $(img).attr("src", new URL(src, url).toString());
    }
  });
  // Strip WPBakery chrome
  el.find(".vc_btn3-container, .wpb_single_image.wpb_content_element .vc_single_image-wrapper img").remove();
  return turndown.turndown($.html(el));
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

// 1. Author
let { data: author } = await db.from("authors").select("*").eq("name", "Tactyqal").maybeSingle();
if (!author) {
  const { data: created, error: aErr } = await db
    .from("authors")
    .insert({ name: "Tactyqal", bio: "Tactyqal Labs editorial team" })
    .select()
    .single();
  if (aErr) throw aErr;
  author = created;
}

// 2. Categories
const catNames = [...new Set(POSTS.map((p) => p.category))];
const cats = {};
for (const name of catNames) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const { data, error } = await db
    .from("categories")
    .upsert({ name, slug }, { onConflict: "slug" })
    .select()
    .single();
  if (error) throw error;
  cats[name] = data.id;
}

// 3. Posts
for (const p of POSTS) {
  console.log(`→ ${p.slug}`);
  let content = "";
  try {
    content = await fetchMarkdown(p.url);
    console.log(`  content: ${content.length} chars`);
  } catch (e) {
    console.warn(`  ! ${e.message} — seeding excerpt only`);
    content = `> ${p.excerpt}\n\nRead the original at ${p.url}`;
  }
  const { error } = await db.from("posts").upsert(
    {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content,
      cover_image: p.cover_image,
      author_id: author.id,
      category_id: cats[p.category],
      status: "published",
      read_time: p.read_time,
      published_at: p.published_at,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );
  if (error) throw error;
}

const { count } = await db.from("posts").select("*", { count: "exact", head: true });
console.log(`\nDone. Posts in DB: ${count}`);
