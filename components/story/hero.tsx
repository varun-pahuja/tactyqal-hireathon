"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./smooth-scroll";
import CountUp from "@/components/count-up";
import { heroBullets } from "@/lib/content";

export default function StoryHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".hero-line", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".hero-fade", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.55,
      });
      gsap.to(".hero-scroll-hint", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: "sine.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* layered light — CSS only, zero JS cost */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(155,202,166,0.28),transparent_65%)]" />
        <div className="absolute top-1/4 -left-24 h-[28rem] w-[28rem] rounded-full bg-sage-600/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-sage-300/12 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(163,171,167,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(163,171,167,0.055)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_70%_65%_at_50%_35%,black,transparent)]" />
        {/* Navy Coral ribbon art */}
        <svg
          className="ribbon-float absolute -top-20 right-0 h-[75vh] w-[75vw] max-w-[860px] sm:-top-28"
          viewBox="0 0 800 620"
          fill="none"
        >
          <defs>
            <linearGradient id="ribA" x1="120" y1="0" x2="760" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#141515" />
              <stop offset="0.55" stopColor="#567F64" />
              <stop offset="1" stopColor="#9BCAA6" />
            </linearGradient>
            <linearGradient id="ribB" x1="300" y1="60" x2="800" y2="560" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9BCAA6" />
              <stop offset="1" stopColor="#C9E6D0" />
            </linearGradient>
          </defs>
          <path
            d="M800 0C640 40 700 170 540 230C380 290 430 400 610 450C720 482 760 540 800 620V0Z"
            fill="url(#ribA)"
            opacity="0.92"
          />
          <path
            d="M800 150C690 185 730 300 590 355C455 408 505 500 660 545C740 568 775 590 800 620V150Z"
            fill="url(#ribB)"
            opacity="0.75"
          />
        </svg>
      </div>

      <div className="container-x flex flex-col items-center text-center">
        <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-sage-400/30 bg-sage-500/10 px-4 py-1.5 text-sm font-medium text-sage-300">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-400" />
          </span>
          Admissions open — 15 spots this month
        </p>

        <h1 className="mt-7 max-w-5xl font-heading text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight">
          <span className="hero-line block">Your kid has an idea.</span>
          <span className="hero-line block text-gradient">
            In 8 weeks, it makes money.
          </span>
        </h1>

        <p className="hero-fade mt-6 max-w-2xl text-base text-cream/85 sm:text-lg">
          {heroBullets.join(" • ")}
        </p>

        <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-cream backdrop-blur">
            <strong className="font-heading text-lg text-sage-400">
              <CountUp value={100} suffix="+" />
            </strong>
            students mentored
          </span>
          <span className="flex items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-cream backdrop-blur">
            <strong className="font-heading text-lg text-sage-400">
              <CountUp value={50} suffix="+" />
            </strong>
            top university admits
          </span>
          <span className="flex items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-cream backdrop-blur">
            <strong className="font-heading text-lg text-sage-400">₹</strong>
            real student revenue
          </span>
        </div>

        <div className="hero-fade mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#contact"
            className="group relative inline-flex h-13 items-center overflow-hidden rounded-full bg-sage-500 px-9 py-4 font-semibold text-noir shadow-[0_0_40px_rgba(155,202,166,0.35)] transition hover:bg-sage-400"
          >
            Book Free Consultation
          </a>
          <a
            href="#quiz"
            className="inline-flex h-13 items-center rounded-full border border-sage-400/50 px-9 py-4 font-semibold text-sage-300 transition hover:bg-sage-500/10"
          >
            Find their app idea →
          </a>
        </div>

        <div className="hero-fade mt-8 flex flex-col items-center gap-2">
          <p className="text-sm text-muted-grey">
            <span className="line-through decoration-red-400/70">₹25,000</span>{" "}
            <span className="font-heading text-2xl font-bold text-sage-400">
              ₹16,000
            </span>
          </p>
          <div className="flex gap-2">
            <span className="rounded-full bg-sage-500 px-4 py-1.5 text-xs font-semibold text-noir">
              Limited time offer
            </span>
            <span className="rounded-full border border-sage-400/50 px-4 py-1.5 text-xs font-semibold text-sage-300">
              Results guaranteed
            </span>
          </div>
        </div>

        <p className="hero-scroll-hint mt-12 text-xs font-medium uppercase tracking-[0.25em] text-muted-grey/80">
          Scroll to begin ↓
        </p>
      </div>
    </section>
  );
}
