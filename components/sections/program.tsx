import Reveal from "@/components/reveal";
import { timeline } from "@/lib/content";
import { Quote } from "lucide-react";

export default function Program() {
  return (
    <section id="program" className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(45,212,191,0.08),transparent_70%)]"
        aria-hidden
      />
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            From Idea to Full App in <span className="text-gradient">8 Weeks</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((step, i) => (
              <li
                key={step.week}
                className="relative rounded-2xl border border-white/10 bg-card p-6 text-center transition-colors hover:border-emerald-400/40"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#0a0f1c] px-3 py-0.5 text-xs font-bold text-slate-400">
                  {i + 1}
                </span>
                <p className={`font-heading text-base font-bold ${step.accent}`}>
                  {step.week}
                </p>
                <p className="mt-2 text-sm text-slate-300">{step.title}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={160}>
          <figure className="mx-auto mt-14 max-w-2xl rounded-2xl border-l-4 border-emerald-500 bg-card/80 p-6 text-center sm:p-8">
            <Quote className="mx-auto mb-3 h-6 w-6 text-emerald-400" aria-hidden />
            <blockquote className="font-heading text-lg italic leading-relaxed text-slate-200 sm:text-xl">
              “Learn to sell. Learn to build. If you can do both, you will be
              unstoppable.”
            </blockquote>
            <figcaption className="mt-3 text-sm font-medium text-emerald-400">
              — Naval Ravikant
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <p className="text-slate-300">
              Personal 1:1 Live Sessions • 1 Hour Each • Expert Guidance
            </p>
            <p className="mt-2 text-sm text-emerald-400">
              University admissions, revenue generation, international
              recognition, grants
            </p>
            <a
              href="#pricing"
              className="mt-8 inline-flex h-12 items-center rounded-full bg-emerald-500 px-8 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
            >
              Start Your Journey Today
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
