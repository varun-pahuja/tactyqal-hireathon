import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";
import { adminClient } from "@/lib/supabase/admin";
import { Badge } from "@/components/ui/badge";

export const instant = false;

export const metadata = {
  title: "Blog — Tactyqal Labs",
  description:
    "Startup ideas, growth playbooks and no-code insights from the Tactyqal Labs team.",
};

export default async function BlogIndex() {
  await connection();
  const supabase = adminClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, cover_image, read_time, published_at, status")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <main className="pt-24 md:pt-28">
      <section className="section-pad">
        <div className="container-x">
          <Link
            href="/"
            className="text-sm text-sage-400 hover:underline"
          >
            ← Back to home
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            The <span className="text-gradient">Tactyqal Blog</span>
          </h1>
          <p className="mt-3 max-w-2xl text-muted-grey">
            Startup ideas, growth playbooks and no-code insights — served by
            our own API, not WordPress.
          </p>

          {!posts || posts.length === 0 ? (
            <p className="mt-16 text-muted-grey/80">No published posts yet.</p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <article
                  key={p.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-sage-400/40 hover:shadow-xl hover:shadow-sage-500/10"
                >
                  {p.cover_image && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-noir-elevated">
                      <Image
                        src={p.cover_image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-sage-500/15 text-sage-300 hover:bg-sage-500/20">
                        {p.published_at
                          ? new Date(p.published_at).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </Badge>
                      {p.read_time ? (
                        <span className="text-xs text-muted-grey/80">
                          {p.read_time} min read
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-3 font-heading text-lg font-bold leading-snug">
                      <Link
                        href={`/blog/${p.slug}`}
                        className="after:absolute after:inset-0 after:content-[''] hover:text-sage-300"
                      >
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-muted-grey">
                      {p.excerpt.length > 140
                        ? `${p.excerpt.slice(0, 140)}…`
                        : p.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
