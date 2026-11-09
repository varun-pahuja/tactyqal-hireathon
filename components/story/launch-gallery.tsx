"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./smooth-scroll";

const launches = [
  {
    name: "KrishiDrishti",
    line: "Krishi Drishti — AI crop health for farmers",
    tag: "Agriculture · India",
    revenue: "₹1,00,000",
    revLabel: "monthly revenue",
    tone: "emerald",
  },
  {
    name: "Aether",
    line: "Aether — sustainable fashion marketplace",
    tag: "E-commerce · India",
    revenue: "₹9,000",
    revLabel: "first week revenue",
    tone: "emerald-deep",
  },
  {
    name: "EduSphere",
    line: "EduSphere — 15+ schools onboarded",
    tag: "EdTech · India",
    revenue: "15+",
    revLabel: "schools live",
    tone: "emerald-light",
  },
  {
    name: "ReWear",
    line: "ReWear — thrift & upcycling platform",
    tag: "Sustainability · India",
    revenue: "₹2.5L",
    revLabel: "raised on grant",
    tone: "charcoal",
  },
  {
    name: "Mindspace",
    line: "Mindspace — teen mental-health support",
    tag: "HealthTech · India",
    revenue: "1,000+",
    revLabel: "users in week 1",
    tone: "ink",
  },
  {
    name: "MedTrack",
    line: "MedTrack — medicine adherence tracker",
    tag: "HealthTech · India",
    revenue: "500+",
    revLabel: "patients supported",
    tone: "brand-300",
  },
];

const toneMap: Record<string, string> = {
  emerald: "border-brand-400/30 from-brand-400/20 to-transparent",
  "emerald-deep": "border-brand-600/40 from-brand-600/25 to-transparent",
  "emerald-light": "border-brand-300/30 from-brand-300/20 to-transparent",
  charcoal: "border-charcoal/70 from-charcoal/40 to-transparent",
  ink: "border-ink/25 from-ink/10 to-transparent",
  "brand-300": "border-brand-300/25 from-brand-300/15 to-transparent",
};

export default function LaunchGallery() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();

    // Desktop: pinned horizontal scroll
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const track = root.current?.querySelector<HTMLElement>(".gallery-track");
        if (!track) return;
        const distance = track.scrollWidth - window.innerWidth + 96;
        gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: `+=${distance}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="stories" className="relative overflow-hidden lg:h-[100svh]">
      <div className="container-x pt-20 lg:pt-28">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-dim/80">
          Chapter 03
        </p>
        <h2 className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
          The apps they <span className="text-gradient">shipped</span>
        </h2>
        <p className="mt-3 max-w-xl text-dim">
          Real students. Real products. Real rupees — not certificates.
        </p>
      </div>

      {/* mobile: native swipe · desktop: scroll-driven horizontal */}
      <div className="mt-10 overflow-x-auto pb-6 lg:overflow-visible lg:pb-0">
        <div className="gallery-track flex w-max gap-5 px-4 lg:pl-[max(1rem,calc((100vw-80rem)/2+1rem))] lg:pr-24">
          {launches.map((s) => (
            <article
              key={s.name}
              className={`group relative w-[85vw] shrink-0 overflow-hidden rounded-3xl border bg-card p-7 sm:w-[26rem] ${toneMap[s.tone]}`}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b to-transparent opacity-0 transition group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative flex h-44 flex-col justify-end">
                <span className="text-5xl opacity-25" aria-hidden>
                  {s.name.slice(0, 1)}
                </span>
                <span className="mt-3 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-ink/85 w-fit">
                  {s.tag}
                </span>
              </div>
              <p className="mt-5 font-heading text-xl font-medium text-ink">
                {s.line}
              </p>
              <div className="mt-5 flex items-baseline gap-2 border-t border-white/10 pt-4">
                <strong className="font-heading text-3xl font-semibold text-brand-400">
                  {s.revenue}
                </strong>
                <span className="text-xs uppercase tracking-wider text-dim/80">
                  {s.revLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="container-x pb-16 pt-4 text-center text-xs uppercase tracking-[0.2em] text-dim/60 lg:pb-20">
        Keep scrolling →
      </div>
    </section>
  );
}
