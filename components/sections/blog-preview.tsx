"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/reveal";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  read_time: number | null;
  published_at: string | null;
};

export default function BlogPreview() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/posts?limit=6")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (!cancelled) setPosts(data.items ?? []);
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          setPosts([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="blog" className="section-pad border-t border-white/5">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-medium sm:text-4xl md:text-5xl">
            Learn from <span className="text-gradient">Industry Experts</span>
          </h2>
        </Reveal>

        {posts === null && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-2xl border border-white/10 bg-card"
              />
            ))}
          </div>
        )}

        {posts !== null && posts.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-xl hover:shadow-brand-500/10">
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
                    <h3 className="font-heading text-base font-medium leading-snug text-ink group-hover:text-brand-300">
                      <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-dim">
                      {p.excerpt.length > 120
                        ? `${p.excerpt.slice(0, 120)}…`
                        : p.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-dim/80">
                      By Tactyqal
                      {p.read_time ? ` • ${p.read_time} min read` : ""}
                      {p.published_at
                        ? ` • ${new Date(p.published_at).toLocaleDateString("en-CA")}`
                        : ""}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {posts !== null && posts.length === 0 && (
          <p className="mt-12 text-center text-dim/80">
            {failed
              ? "Blog is coming soon."
              : "No published posts yet — check back soon."}
          </p>
        )}

        <Reveal delay={150}>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex h-12 items-center rounded-full bg-brand-500 px-8 font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-400"
            >
              Read All Articles
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
