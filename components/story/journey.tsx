"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./smooth-scroll";

const weeks = [
  {
    week: "Week 1–2",
    title: "Ideation & Market Research",
    body: "Find the idea worth building. Talk to real users. Kill the weak ones fast.",
    accent: "from-brand-300 to-brand-500",
  },
  {
    week: "Week 3–4",
    title: "Design & Prototyping",
    body: "Wireframes → clickable prototype. It starts looking like a real product.",
    accent: "from-brand-300 to-brand-500",
  },
  {
    week: "Week 5–6",
    title: "Full-Stack Development",
    body: "The actual build. No-code + AI tooling, guided 1:1 every single week.",
    accent: "from-brand-600 to-brand-300",
  },
  {
    week: "Week 7–8",
    title: "Launch & Marketing",
    body: "Ship it. Product Hunt, press, first users, first rupees.",
    accent: "from-ink to-brand-300",
  },
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      let settle: ReturnType<typeof gsap.delayedCall> | undefined;
      const ctx = gsap.context(() => {
        const t = track.current;
        const skewEl = root.current!.querySelector<HTMLElement>(".journey-skew")!;
        const dist = () => Math.max(t!.scrollWidth - window.innerWidth + 48, 1);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // velocity skew on the inner wrapper (x lives on the outer track)
              const skew = gsap.utils.clamp(-8, 8, self.getVelocity() / -600);
              gsap.to(skewEl, {
                skewX: skew,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
              // shear settles back to 0 once scrolling stops
              settle?.kill();
              settle = gsap.delayedCall(0.15, () => {
                gsap.to(skewEl, {
                  skewX: 0,
                  duration: 0.6,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              });
            },
          },
        });

        tl.to(t, { x: () => -dist(), ease: "none", duration: 1 });
        tl.to(".journey-progress-fill", { scaleX: 1, ease: "none", duration: 1 }, 0);

        gsap.utils.toArray<HTMLElement>(".journey-panel").forEach((panel) => {
          gsap.from(panel.querySelectorAll(".journey-step"), {
            y: 48,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: "left 70%",
            },
          });
        });
      }, root);
      return () => {
        settle?.kill();
        ctx.revert();
      };
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
      className="relative overflow-hidden border-y border-white/5 bg-[#0a0a0a] lg:flex lg:flex-col lg:justify-center"
    >
      <div className="container-x py-20 lg:py-0">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-dim/80">
            Chapter 02
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            From <span className="text-gradient">crazy idea</span> to launched
            app
          </h2>
          <p className="mt-3 text-dim">
            One continuous 8-week journey. 1:1 live sessions. Real shipping.
          </p>
        </div>

        {/* progress rail */}
        <div className="mx-auto mt-8 hidden h-1.5 max-w-3xl overflow-hidden rounded-full bg-white/10 lg:block">
          <div className="journey-progress-fill h-full origin-left scale-x-[0.12] rounded-full bg-gradient-to-r from-brand-400 to-brand-300" />
        </div>

        <div
          ref={track}
          className="journey-track mt-10 grid gap-5 lg:mt-12 lg:flex lg:w-max lg:items-stretch lg:gap-6"
        >
          <div className="journey-skew contents lg:flex lg:w-max lg:gap-6">
            {weeks.map((w, i) => (
              <article
                key={w.week}
                className="journey-panel journey-card relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card p-6 lg:h-auto lg:w-[64vw] lg:max-w-[860px] lg:shrink-0 lg:p-10"
              >
                <span
                  className="pointer-events-none absolute right-4 top-0 select-none font-heading text-[9rem] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] lg:text-[13rem]"
                  aria-hidden
                >
                  0{i + 1}
                </span>

                <p
                  className={`journey-step relative bg-gradient-to-r ${w.accent} bg-clip-text font-heading text-sm font-medium uppercase tracking-wider text-transparent`}
                >
                  {w.week}
                </p>
                <h3 className="journey-step relative mt-4 font-heading text-xl font-medium text-ink lg:mt-6 lg:text-[clamp(1.6rem,2.6vw,2.4rem)]">
                  {w.title}
                </h3>
                <p className="journey-step relative mt-3 max-w-md text-sm leading-relaxed text-dim lg:mt-5 lg:text-base">
                  {w.body}
                </p>

                <div className="journey-step relative mt-auto flex items-center gap-4 pt-8">
                  <span className="h-px flex-1 bg-gradient-to-r from-brand-500/60 to-transparent" />
                  <span className="font-heading text-xs uppercase tracking-[0.25em] text-dim/70">
                    0{i + 1} / 04
                  </span>
                </div>
              </article>
            ))}

            <figure className="journey-panel journey-card flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-8 lg:w-[46vw] lg:max-w-[620px] lg:shrink-0 lg:p-12">
              <blockquote className="journey-step font-heading text-xl italic leading-snug text-ink lg:text-[clamp(1.5rem,2.2vw,2rem)]">
                “Learn to sell. Learn to build. If you can do both, you will be
                unstoppable.”
              </blockquote>
              <figcaption className="journey-step mt-5 text-sm text-brand-400">
                — Naval Ravikant
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
