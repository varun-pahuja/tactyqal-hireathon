"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./smooth-scroll";

const weeks = [
  {
    week: "Week 1–2",
    title: "Ideation & Market Research",
    body: "Find the idea worth building. Talk to real users. Kill the weak ones fast.",
    accent: "from-coral-400 to-coral-300",
    dot: "bg-coral-400",
  },
  {
    week: "Week 3–4",
    title: "Design & Prototyping",
    body: "Wireframes → clickable prototype. It starts looking like a real product.",
    accent: "from-coral-400 to-cyan-400",
    dot: "bg-cyan-400",
  },
  {
    week: "Week 5–6",
    title: "Full-Stack Development",
    body: "The actual build. No-code + AI tooling, guided 1:1 every single week.",
    accent: "from-cyan-400 to-violet-400",
    dot: "bg-violet-400",
  },
  {
    week: "Week 7–8",
    title: "Launch & Marketing",
    body: "Ship it. Product Hunt, press, first users, first rupees.",
    accent: "from-violet-400 to-fuchsia-400",
    dot: "bg-fuchsia-400",
  },
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".journey-card");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=2800",
            pin: true,
            scrub: 0.5,
          },
        });
        cards.forEach((card, i) => {
          if (i === 0) {
            gsap.set(card, { opacity: 1, scale: 1 });
            return;
          }
          gsap.set(card, { opacity: 0.25, scale: 0.94 });
          tl.to(
            card,
            { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
            i,
          );
          tl.to(
            cards[i - 1],
            { opacity: 0.25, scale: 0.94, duration: 1, ease: "power2.out" },
            i,
          );
        });
        tl.to(".journey-progress-fill", { scaleX: 1, duration: 4, ease: "none" }, 0);
      }, root);
      return () => ctx.revert();
    });

    // Mobile: simple reveal, no pin
    mm.add("(max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".journey-card", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="program"
      className="relative overflow-hidden border-y border-white/5 bg-[#0d2247] lg:flex lg:h-[100svh] lg:flex-col lg:justify-center"
    >
      <div className="container-x py-20 lg:py-0">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
            Chapter 02
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight">
            From <span className="text-gradient">crazy idea</span> to launched
            app
          </h2>
          <p className="mt-3 text-slate-400">
            One continuous 8-week journey. 1:1 live sessions. Real shipping.
          </p>
        </div>

        {/* progress rail */}
        <div className="mx-auto mt-10 hidden h-1.5 max-w-3xl overflow-hidden rounded-full bg-white/10 lg:block">
          <div className="journey-progress-fill h-full origin-left scale-x-[0.12] rounded-full bg-gradient-to-r from-coral-400 to-cyan-300" />
        </div>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-4">
          {weeks.map((w, i) => (
            <article
              key={w.week}
              className={`journey-card relative rounded-2xl border border-white/10 bg-card p-6 ${
                i === 0 ? "opacity-100" : "lg:opacity-25 lg:scale-[0.94]"
              }`}
            >
              <span
                className={`absolute right-5 top-5 h-2.5 w-2.5 rounded-full ${w.dot}`}
                aria-hidden
              />
              <p
                className={`bg-gradient-to-r ${w.accent} bg-clip-text font-heading text-sm font-bold uppercase tracking-wider text-transparent`}
              >
                {w.week}
              </p>
              <h3 className="mt-3 font-heading text-lg font-bold text-slate-100">
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {w.body}
              </p>
              <span className="mt-5 block font-heading text-3xl font-extrabold text-white/5">
                0{i + 1}
              </span>
            </article>
          ))}
        </div>

        <figure className="mx-auto mt-12 max-w-2xl rounded-2xl border-l-4 border-coral-500 bg-white/[0.03] p-6 text-center">
          <blockquote className="font-heading text-lg italic text-slate-200">
            “Learn to sell. Learn to build. If you can do both, you will be
            unstoppable.”
          </blockquote>
          <figcaption className="mt-2 text-sm text-coral-400">
            — Naval Ravikant
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
