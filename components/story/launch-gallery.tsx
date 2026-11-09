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
    tone: "sage",
  },
  {
    name: "Aether",
    line: "Aether — sustainable fashion marketplace",
    tag: "E-commerce · India",
    revenue: "₹9,000",
    revLabel: "first week revenue",
    tone: "deep-sage",
  },
  {
    name: "EduSphere",
    line: "EduSphere — 15+ schools onboarded",
    tag: "EdTech · India",
    revenue: "15+",
    revLabel: "schools live",
    tone: "sage-light",
  },
  {
    name: "ReWear",
    line: "ReWear — thrift & upcycling platform",
    tag: "Sustainability · India",
    revenue: "₹2.5L",
    revLabel: "raised on grant",
    tone: "forest",
  },
  {
    name: "Mindspace",
    line: "Mindspace — teen mental-health support",
    tag: "HealthTech · India",
    revenue: "1,000+",
    revLabel: "users in week 1",
    tone: "cream",
  },
  {
    name: "MedTrack",
    line: "MedTrack — medicine adherence tracker",
    tag: "HealthTech · India",
    revenue: "500+",
    revLabel: "patients supported",
    tone: "sage-200",
  },
];

const toneMap: Record<string, string> = {
  sage: "border-sage-400/30 from-sage-400/20 to-transparent",
  "deep-sage": "border-sage-600/40 from-sage-600/25 to-transparent",
  "sage-light": "border-sage-300/30 from-sage-300/20 to-transparent",
  forest: "border-forest/70 from-forest/40 to-transparent",
  cream: "border-cream/25 from-cream/10 to-transparent",
  "sage-200": "border-sage-200/25 from-sage-200/15 to-transparent",
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
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-grey/80">
          Chapter 03
        </p>
        <h2 className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight">
          The apps they <span className="text-gradient">shipped</span>
        </h2>
        <p className="mt-3 max-w-xl text-muted-grey">
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
                <span className="mt-3 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-cream/85 w-fit">
                  {s.tag}
                </span>
              </div>
              <p className="mt-5 font-heading text-xl font-bold text-cream">
                {s.line}
              </p>
              <div className="mt-5 flex items-baseline gap-2 border-t border-white/10 pt-4">
                <strong className="font-heading text-3xl font-extrabold text-sage-400">
                  {s.revenue}
                </strong>
                <span className="text-xs uppercase tracking-wider text-muted-grey/80">
                  {s.revLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="container-x pb-16 pt-4 text-center text-xs uppercase tracking-[0.2em] text-muted-grey/60 lg:pb-20">
        Keep scrolling →
      </div>
    </section>
  );
}
