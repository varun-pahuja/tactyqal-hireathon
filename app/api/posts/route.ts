import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { adminClient } from "@/lib/supabase/admin";
import { getUserFromRequest } from "@/lib/supabase/auth";


const LIST_PARAMS = z.object({
  slug: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

const postInput = z.object({
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  title: z.string().min(1).max(300),
  excerpt: z.string().max(1000).default(""),
  content: z.string().default(""),
  cover_image: z.string().url().nullish(),
  category_id: z.string().uuid().nullish(),
  status: z.enum(["draft", "published"]).default("draft"),
  read_time: z.number().int().min(1).max(120).nullish(),
  published_at: z.string().datetime().nullish(),
});

/** GET /api/posts — list posts (public: published only unless authed with ?status=draft) */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const parsed = LIST_PARAMS.safeParse(Object.fromEntries(sp));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const { slug, category, status, page, limit } = parsed.data;

  if (status === "draft") {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabase = adminClient();
  let query = supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, cover_image, status, read_time, published_at, category_id, created_at, updated_at",
      { count: "exact" },
    );

  if (slug) query = query.eq("slug", slug);
  if (status) query = query.eq("status", status);
  else query = query.eq("status", "published");
  if (category) query = query.eq("category_id", category);

  query = query
    .order("published_at", { ascending: false, nullsFirst: false })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    items: data ?? [],
    total: count ?? 0,
    page,
    limit,
  });
}

/** POST /api/posts — create a post (auth required) */
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = postInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const supabase = adminClient();
  const { data, error } = await supabase
    .from("posts")
    .insert({
      ...input,
      published_at: input.status === "published" ? (input.published_at ?? new Date().toISOString()) : null,
      author_id: null,
    })
    .select()
    .single();

  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
  return NextResponse.json(data, { status: 201 });
}
