"use client";

import { useState } from "react";
import { Check, Compass, RotateCcw, Sparkles } from "lucide-react";

type Answer = { label: string; kind: string };

const QUESTIONS: { q: string; hint: string; answers: Answer[] }[] = [
  {
    q: "What pulls your kid in?",
    hint: "Question 1 of 4",
    answers: [
      { label: "AI & automation", kind: "ai" },
      { label: "Shopping & money", kind: "commerce" },
      { label: "Helping people", kind: "impact" },
      { label: "Games & fun", kind: "fun" },
    ],
  },
  {
    q: "Who do they want to help?",
    hint: "Question 2 of 4",
    answers: [
      { label: "Farmers & locals", kind: "local" },
      { label: "Students & teens", kind: "youth" },
      { label: "Shoppers & sellers", kind: "market" },
      { label: "Friends & community", kind: "social" },
    ],
  },
  {
    q: "What does a win look like?",
    hint: "Question 3 of 4",
    answers: [
      { label: "First real revenue", kind: "revenue" },
      { label: "A top university admit", kind: "admit" },
      { label: "Grant & press coverage", kind: "press" },
      { label: "Just shipping something real", kind: "ship" },
    ],
  },
  {
    q: "How much time can they give?",
    hint: "Question 4 of 4",
    answers: [
      { label: "2–3 hrs/week, just curious", kind: "light" },
      { label: "5–8 hrs/week, serious", kind: "steady" },
      { label: "All in — nights & weekends", kind: "allin" },
    ],
  },
];

type Result = { title: string; blurb: string; emoji: string };

function buildResult(kinds: string[]): Result {
  const has = (k: string) => kinds.includes(k);
  if (has("ai") && has("local"))
    return {
      emoji: "🌾",
      title: "KrishiDrishti-style AI advisor",
      blurb:
        "An AI assistant for farmers — crop health, weather and mandi prices in one app. Proven model: ₹1,00,000 monthly revenue.",
    };
  if (has("commerce") && has("market"))
    return {
      emoji: "🛍️",
      title: "A niche marketplace",
      blurb:
        "Buy/sell platform for one community you know deeply — thrift, collectibles, local goods. Aether hit ₹9,000 in week one.",
    };
  if (has("impact") && has("youth"))
    return {
      emoji: "💚",
      title: "A teen wellbeing tool",
      blurb:
        "Mental-health or peer-support app for students. Mindspace crossed 1,000 users in its first week.",
    };
  if (has("fun") || has("social"))
    return {
      emoji: "🎮",
      title: "A social game or community app",
      blurb:
        "Play + people = retention. Ship a tiny multiplayer loop first, monetize with cosmetics or premium rooms.",
    };
  if (has("admit"))
    return {
      emoji: "🎓",
      title: "A portfolio-defining product",
      blurb:
        "Universities fund admit stories, not certificates. One launched app beats ten online courses on any application.",
    };
  if (has("press") || has("grant"))
    return {
      emoji: "🚀",
      title: "A press-magnet MVP",
      blurb:
        "Solve a visible local problem, launch loud. ReWear raised ₹2.5L on grants before graduating.",
    };
  return {
    emoji: "⚡",
    title: "A lean 8-week MVP",
    blurb:
      "Pick one painful problem, one user, one feature. Ship in 8 weeks, charge on day one — momentum beats perfection.",
  };
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [kinds, setKinds] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  const answer = (kind: string) => {
    const next = [...kinds, kind];
    setKinds(next);
    if (step + 1 >= QUESTIONS.length) {
      setResult(buildResult(next));
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setStep(0);
    setKinds([]);
    setResult(null);
  };

  const progress = result ? 1 : step / QUESTIONS.length;

  return (
    <section
      id="quiz"
      className="relative overflow-hidden border-y border-white/5 bg-[#171b19] py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(155,202,166,0.16),transparent_65%)]"
        aria-hidden
      />
      <div className="container-x relative max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-sage-400/30 bg-sage-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sage-300">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Interactive · 30 seconds
        </span>
        <h2 className="mt-5 font-heading text-[clamp(1.9rem,4.5vw,3.2rem)] font-extrabold tracking-tight">
          What app should your kid <span className="text-gradient">build</span>?
        </h2>
        <p className="mt-3 text-muted-grey">
          Four questions. One idea worth an 8-week sprint.
        </p>

        <div
          className="mt-8 rounded-3xl border border-white/10 bg-card p-6 text-left shadow-2xl shadow-black/40 sm:p-9"
          aria-live="polite"
        >
          {/* progress */}
          <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-grey/80">
            <span>{result ? "Your idea" : QUESTIONS[step].hint}</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sage-400 to-sage-200 transition-[width] duration-500"
              style={{ width: `${Math.max(progress * 100, 8)}%` }}
            />
          </div>

          {!result && (
            <>
              <h3 className="mt-6 font-heading text-xl font-bold text-cream sm:text-2xl">
                {QUESTIONS[step].q}
              </h3>
              <div className="mt-5 grid gap-3">
                {QUESTIONS[step].answers.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => answer(a.kind)}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left font-medium text-cream transition hover:border-sage-400/50 hover:bg-sage-500/10 hover:text-sage-200 focus-visible:outline-2 focus-visible:outline-sage-400"
                  >
                    {a.label}
                    <Check
                      className="h-4 w-4 shrink-0 opacity-0 transition group-hover:opacity-100"
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-4 text-xs font-medium text-muted-grey/80 underline-offset-4 hover:text-cream/85 hover:underline"
                >
                  ← Previous question
                </button>
              )}
            </>
          )}

          {result && (
            <div className="mt-6 text-center">
              <span className="text-5xl" aria-hidden>
                {result.emoji}
              </span>
              <h3 className="mt-4 font-heading text-2xl font-extrabold text-sage-300 sm:text-3xl">
                {result.title}
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cream/85 sm:text-base">
                {result.blurb}
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center rounded-full bg-sage-500 px-8 font-semibold text-noir transition hover:bg-sage-400"
                >
                  <Compass className="mr-2 h-4 w-4" aria-hidden />
                  Book a free 15-min call
                </a>
                <button
                  onClick={restart}
                  className="inline-flex h-12 items-center rounded-full border border-white/15 px-7 font-medium text-cream/85 transition hover:bg-white/5"
                >
                  <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
                  Try again
                </button>
              </div>
              <p className="mt-5 text-xs text-muted-grey/80">
                15 spots this month · ₹16,000 (was ₹25,000) · results guaranteed
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
