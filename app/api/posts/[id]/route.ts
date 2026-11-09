import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { adminClient } from "@/lib/supabase/admin";
import { getUserFromRequest } from "@/lib/supabase/auth";


type Params = { params: Promise<{ id: string }> };

const postUpdate = z.object({
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case")
    .optional(),
  title: z.string().min(1).max(300).optional(),
  excerpt: z.string().max(1000).optional(),
  content: z.string().optional(),
  cover_image: z.string().url().nullish(),
  category_id: z.string().uuid().nullish(),
  status: z.enum(["draft", "published"]).optional(),
  read_time: z.number().int().min(1).max(120).nullish(),
  published_at: z.string().datetime().nullish(),
});

async function findPost(id: string) {
  const supabase = adminClient();
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .or(isUuid ? `id.eq.${id},slug.eq.${id}` : `slug.eq.${id}`)
    .maybeSingle();
  return { data, error };
}

/** GET /api/posts/[id] — by id or slug */
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const { data, error } = await findPost(id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  // Drafts only visible to authed users
  if (data.status !== "published") {
    const user = await getUserFromRequest(_req);
    if (!user) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  }
  return NextResponse.json(data);
}

/** PUT /api/posts/[id] — update (auth required) */
export async function PUT(req: NextRequest, { params }: Params) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = postUpdate.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const patch: Record<string, unknown> = { ...parsed.data, updated_at: new Date().toISOString() };
  if (parsed.data.status === "published" && !parsed.data.published_at) {
    patch.published_at = new Date().toISOString();
  }

  const supabase = adminClient();
  const { data, error } = await supabase
    .from("posts")
    .update(patch)
    .or(`id.eq.${id},slug.eq.${id}`)
    .select()
    .maybeSingle();

  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
  if (!data) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}

/** DELETE /api/posts/[id] — delete (auth required) */
export async function DELETE(req: NextRequest, { params }: Params) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const supabase = adminClient();
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .or(`id.eq.${id},slug.eq.${id}`)
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
