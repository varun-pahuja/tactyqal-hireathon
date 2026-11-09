import { Button } from "@/components/ui/button";
import CountUp from "@/components/count-up";
import Reveal from "@/components/reveal";
import { heroBullets, heroStats } from "@/lib/content";
import { Play, Sparkles } from "lucide-react";

const words = [
  "Empower",
  "Your",
  "Kid",
  "To",
  "Build",
  "The",
  "Next",
  "App",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Aurora background — CSS only, reduced-motion safe */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.22),transparent_60%)]" />
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute top-20 right-1/5 h-80 w-80 rounded-full bg-teal-400/12 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]" />
      </div>

      <div className="container-x flex flex-col items-center text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Admissions Open — 15 Spots This Month
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {words.map((w, i) => (
              <span
                key={w + i}
                className="inline-block opacity-0 animate-[fadeUp_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {w === "Next" || w === "App" ? (
                  <span className="text-gradient">{w}</span>
                ) : (
                  w
                )}{" "}
              </span>
            ))}
            <span
              className="inline-block opacity-0 animate-[fadeUp_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards]"
              style={{ animationDelay: `${words.length * 60}ms` }}
            >
              <span className="text-gradient">That Impacts Millions,</span>
            </span>
            <br />
            <span
              className="inline-block opacity-0 animate-[fadeUp_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards]"
              style={{ animationDelay: `${(words.length + 1) * 60}ms` }}
            >
              in <span className="text-gradient">8 Weeks</span>
            </span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
            {heroBullets.join(" • ")}
          </p>
        </Reveal>

        <Reveal delay={280}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {heroStats.map((s) => (
              <li
                key={s.label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-slate-200 backdrop-blur"
              >
                <span className="font-heading text-lg font-bold text-emerald-400">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
                {s.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-emerald-500 px-8 text-base font-semibold text-emerald-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400"
            >
              <a href="#contact">Book Free Consultation</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-emerald-400/50 bg-transparent px-8 text-base font-semibold text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200"
            >
              <a href="#success">
                <Play className="mr-2 h-4 w-4 fill-current" aria-hidden />
                Success Stories
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={440}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="text-sm text-slate-400">
              <span className="line-through decoration-red-400/70">₹25,000</span>{" "}
              <span className="font-heading text-2xl font-bold text-emerald-400">
                ₹16,000
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-emerald-950">
                Limited Time Offer
              </span>
              <span className="rounded-full border border-emerald-400/50 px-4 py-1.5 text-xs font-semibold text-emerald-300">
                Results Guaranteed
              </span>
            </div>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
