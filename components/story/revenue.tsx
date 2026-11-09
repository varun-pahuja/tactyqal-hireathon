"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./smooth-scroll";
import CountUp from "@/components/count-up";

const stats = [
  { value: 100, suffix: "+", label: "students mentored" },
  { value: 50, suffix: "+", label: "top university admits" },
  { value: 1000000, format: "currency", label: "₹ student revenue" },
  { value: 32, suffix: "", label: "grant + press features" },
];

export default function RevenueTicker() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".rev-item", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-y border-white/5 bg-[#0d2247]"
      aria-label="Results"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(255,107,107,0.18),transparent_70%)]"
        aria-hidden
      />
      <div className="container-x relative py-16 sm:py-20">
        <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
          Chapter 04 — the receipts
        </p>
        <div className="mt-10 grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rev-item">
              <strong className="block font-heading text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold text-coral-400">
                {s.format === "currency" ? (
                  <>
                    ₹<CountUp value={s.value} />
                  </>
                ) : (
                  <CountUp value={s.value} suffix={s.suffix} />
                )}
              </strong>
              <span className="mt-2 block text-sm uppercase tracking-wider text-slate-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
