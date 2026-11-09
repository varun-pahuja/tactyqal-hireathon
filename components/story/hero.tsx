"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./smooth-scroll";
import HeroWaves from "./waves";

export default function StoryHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
      });
      gsap.from(".hero-fade", {
        y: 18,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.45,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#030303] px-5 pb-28 pt-36"
    >
      {/* emerald flowing waves */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[82%]" aria-hidden>
        <HeroWaves />
      </div>

      {/* centered hero copy on frosted glass */}
      <div className="glass-panel relative z-10 flex w-full max-w-[720px] flex-col items-center rounded-[28px] px-6 py-10 text-center sm:px-12 sm:py-14">
        <h1 className="hero-line text-[clamp(2.25rem,6vw,4rem)] font-light leading-[1.15] tracking-[-0.03em] text-ink">
          Your kid has an idea.
          <br />
          In 8 weeks, it makes money.
        </h1>

        <p className="hero-fade mt-6 max-w-[500px] text-[15px] leading-[1.6] text-dim sm:text-base">
          We turn curious teenagers into founders — idea to full-stack app to
          real revenue, with 1:1 mentoring every single week.
        </p>

        <div className="hero-fade mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#pricing"
            className="inline-flex h-10 items-center rounded-lg bg-[#009b78] px-5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#00a982] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          >
            See Plans
          </a>
          <a
            href="#program"
            className="inline-flex h-10 items-center rounded-lg bg-charcoal px-5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#333333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
          >
            Explore Features
          </a>
        </div>

        <p className="hero-fade mt-8 text-xs tracking-wide text-faint">
          ₹16,000 · 15 spots this month · results guaranteed
        </p>
      </div>
    </section>
  );
}
