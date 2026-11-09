import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import ReactMarkdown from "react-markdown";
import { adminClient } from "@/lib/supabase/admin";


export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = adminClient();
  const { data } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (!data) return { title: "Post not found — Tactyqal Labs" };
  return { title: `${data.title} — Tactyqal Labs`, description: data.excerpt };
}

export default async function BlogPost({ params }: Props) {
  await connection();
  const { slug } = await params;
  const supabase = adminClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*, authors(name, avatar_url), categories(name, slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!post) notFound();

  const author = post.authors as { name: string; avatar_url: string | null } | null;
  const category = post.categories as { name: string; slug: string } | null;

  return (
    <main className="pt-24 md:pt-28">
      <article className="section-pad">
        <div className="container-x max-w-3xl">
          <Link href="/blog" className="text-sm text-brand-400 hover:underline">
            ← All articles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-dim">
            {category && (
              <span className="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-300">
                {category.name}
              </span>
            )}
            {post.published_at && (
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            {post.read_time && <span>• {post.read_time} min read</span>}
          </div>

          <h1 className="mt-4 font-heading text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {author && (
            <p className="mt-4 text-sm text-dim">By {author.name}</p>
          )}

          {post.cover_image && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          <div className="prose-blog mt-10">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <hr className="my-10 border-white/10" />
          <Link
            href="/blog"
            className="inline-flex h-11 items-center rounded-full bg-brand-500 px-6 font-semibold text-white transition hover:bg-brand-400"
          >
            More articles
          </Link>
        </div>
      </article>
    </main>
  );
}
