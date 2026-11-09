"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./smooth-scroll";

const WORDS = ["THE", "IDEA", "IS", "EVERYTHING"];

export default function IdeaBeat() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // words fly apart as you scroll through — the "shatter"
      gsap.to(".shatter-word", {
        y: (i) => [-140, -60, 40, 120][i],
        x: (i) => [-160, 90, -70, 150][i],
        rotate: (i) => [-14, 9, -6, 16][i],
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.from(".beat-after", {
        opacity: 0,
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: ".beat-after",
          start: "top 85%",
          end: "top 55%",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[160vh] flex-col items-center justify-start overflow-hidden"
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
          Chapter 01
        </p>
        <div className="mt-6 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2">
          {WORDS.map((w) => (
            <span
              key={w}
              className="shatter-word font-heading text-[clamp(3rem,12vw,9rem)] font-extrabold leading-none tracking-tight text-slate-100 will-change-transform"
            >
              {w}
            </span>
          ))}
        </div>
        <div className="beat-after absolute inset-x-0 bottom-[12vh] px-4">
          <p className="mx-auto max-w-2xl font-heading text-xl text-slate-300 sm:text-2xl">
            …but <span className="text-red-400">9 out of 10</span> die before
            anyone ever sees them.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
            No team. No budget. No clue where to start. That&apos;s where we
            come in.
          </p>
        </div>
      </div>
    </section>
  );
}
