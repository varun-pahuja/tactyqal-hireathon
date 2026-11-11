"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./smooth-scroll";

// Bento showcase — pattern from 21st.dev's most-taken Bento Grid
// (kokonutd / Manu Arora): "hover items and shadow", varied cell types,
// one cell dominates, pairs stay side-by-side on mobile.
const launches = [
  {
    name: "KrishiDrishti",
    line: "AI crop health for farmers — disease detection, weather and mandi prices in one app.",
    tag: "Agriculture · India",
    revenue: "₹1,00,000",
    revLabel: "monthly revenue",
    span: "col-span-2 lg:row-span-2",
    stat: false,
    tone: "from-brand-400/25 via-brand-500/10 to-transparent",
  },
  {
    name: "Aether",
    line: "Sustainable fashion marketplace — thrift & upcycled drops.",
    tag: "E-commerce · India",
    revenue: "₹9,000",
    revLabel: "first week revenue",
    span: "col-span-2",
    stat: false,
    tone: "from-brand-600/30 to-transparent",
  },
  {
    name: "EduSphere",
    line: "",
    tag: "EdTech · India",
    revenue: "15+",
    revLabel: "schools live",
    span: "",
    stat: true,
    tone: "from-brand-300/20 to-transparent",
  },
  {
    name: "ReWear",
    line: "Thrift & upcycling platform.",
    tag: "Sustainability · India",
    revenue: "₹2.5L",
    revLabel: "raised on grant",
    span: "",
    stat: false,
    tone: "from-charcoal/50 to-transparent",
  },
  {
    name: "Mindspace",
    line: "",
    tag: "HealthTech · India",
    revenue: "1,000+",
    revLabel: "users in week 1",
    span: "lg:col-span-2",
    stat: true,
    tone: "from-ink/15 to-transparent",
  },
  {
    name: "MedTrack",
    line: "Medicine adherence tracker for patients and families.",
    tag: "HealthTech · India",
    revenue: "500+",
    revLabel: "patients supported",
    span: "lg:col-span-2",
    stat: false,
    tone: "from-brand-300/20 to-transparent",
  },
];

export default function LaunchGallery() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-cell",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="stories" className="section-pad relative border-y border-white/5 bg-[#0a0a0a]">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-dim/80">
            Chapter 03
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            The apps they <span className="text-gradient">shipped</span>
          </h2>
          <p className="mt-3 text-dim">
            Real students. Real products. Real rupees — not certificates.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:mt-14 lg:grid-cols-4 lg:auto-rows-[14rem] lg:gap-5">
          {launches.map((s) => (
            <article
              key={s.name}
              className={`bento-cell group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-[0_24px_60px_-24px_rgba(0,169,130,0.4)] lg:p-7 min-w-0 ${s.span}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${s.tone}`}
                aria-hidden
              />
              {s.stat ? (
                <>
                  <span
                    className="pointer-events-none absolute right-5 top-4 text-7xl leading-none font-black text-white/5 select-none"
                    aria-hidden
                  >
                    {s.name.slice(0, 1)}
                  </span>
                  <strong className="mt-auto font-heading text-[clamp(2.4rem,4vw,3.4rem)] leading-none font-semibold text-brand-400">
                    {s.revenue}
                  </strong>
                  <span className="mt-2 text-xs uppercase tracking-wider text-dim/80">
                    {s.revLabel}
                  </span>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="font-heading text-sm font-medium text-ink">
                      {s.name}
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] text-ink/80">
                      {s.tag}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative flex items-start justify-between gap-3">
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-ink/85">
                      {s.tag}
                    </span>
                    <span
                      className={`${s.span.includes("row-span-2") ? "text-8xl" : "text-5xl"} leading-none font-black text-white/10 select-none`}
                      aria-hidden
                    >
                      {s.name.slice(0, 1)}
                    </span>
                  </div>
                  <div className="relative mt-auto">
                    <h3
                      className={`font-heading font-medium text-ink ${s.span.includes("row-span-2") ? "text-2xl lg:text-3xl" : "text-lg"}`}
                    >
                      {s.name}
                    </h3>
                    <p
                      className={`mt-1.5 text-sm leading-relaxed text-dim ${s.span.includes("row-span-2") ? "max-w-md" : ""}`}
                    >
                      {s.line}
                    </p>
                    <div className="mt-4 flex items-baseline gap-2 border-t border-white/10 pt-3">
                      <strong className="font-heading text-2xl font-semibold text-brand-400 lg:text-3xl">
                        {s.revenue}
                      </strong>
                      <span className="text-[11px] uppercase tracking-wider text-dim/80">
                        {s.revLabel}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
