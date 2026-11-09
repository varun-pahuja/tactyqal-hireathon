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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(16,185,129,0.28),transparent_65%)]" />
        <div className="absolute top-1/4 -left-24 h-[28rem] w-[28rem] rounded-full bg-emerald-600/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-teal-400/12 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_70%_65%_at_50%_35%,black,transparent)]" />
      </div>

      <div className="container-x flex flex-col items-center text-center">
        <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Admissions open — 15 spots this month
        </p>

        <h1 className="mt-7 max-w-5xl font-heading text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight">
          <span className="hero-line block">Your kid has an idea.</span>
          <span className="hero-line block text-gradient">
            In 8 weeks, it makes money.
          </span>
        </h1>

        <p className="hero-fade mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
          {heroBullets.join(" • ")}
        </p>

        <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-slate-200 backdrop-blur">
            <strong className="font-heading text-lg text-emerald-400">
              <CountUp value={100} suffix="+" />
            </strong>
            students mentored
          </span>
          <span className="flex items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-slate-200 backdrop-blur">
            <strong className="font-heading text-lg text-emerald-400">
              <CountUp value={50} suffix="+" />
            </strong>
            top university admits
          </span>
          <span className="flex items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-slate-200 backdrop-blur">
            <strong className="font-heading text-lg text-emerald-400">₹</strong>
            real student revenue
          </span>
        </div>

        <div className="hero-fade mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#contact"
            className="group relative inline-flex h-13 items-center overflow-hidden rounded-full bg-emerald-500 px-9 py-4 font-semibold text-emerald-950 shadow-[0_0_40px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400"
          >
            Book Free Consultation
          </a>
          <a
            href="#quiz"
            className="inline-flex h-13 items-center rounded-full border border-emerald-400/50 px-9 py-4 font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
          >
            Find their app idea →
          </a>
        </div>

        <div className="hero-fade mt-8 flex flex-col items-center gap-2">
          <p className="text-sm text-slate-400">
            <span className="line-through decoration-red-400/70">₹25,000</span>{" "}
            <span className="font-heading text-2xl font-bold text-emerald-400">
              ₹16,000
            </span>
          </p>
          <div className="flex gap-2">
            <span className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-emerald-950">
              Limited time offer
            </span>
            <span className="rounded-full border border-emerald-400/50 px-4 py-1.5 text-xs font-semibold text-emerald-300">
              Results guaranteed
            </span>
          </div>
        </div>

        <p className="hero-scroll-hint mt-12 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
          Scroll to begin ↓
        </p>
      </div>
    </section>
  );
}
