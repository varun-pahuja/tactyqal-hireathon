import Reveal from "@/components/reveal";
import { pricing } from "@/lib/content";
import { Check, Zap } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad border-t border-white/5">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-medium sm:text-4xl md:text-5xl">
            Start Your Teen&apos;s{" "}
            <span className="text-gradient">Entrepreneurial Journey</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mx-auto mt-12 max-w-md rounded-3xl border border-brand-400/30 bg-card p-8 shadow-2xl shadow-brand-500/10">
            <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-brand-500 px-4 py-1 text-xs font-medium text-white">
              <Zap className="h-3 w-3 fill-current" aria-hidden />
              BEST VALUE
            </span>

            <div className="text-center">
              <p className="text-sm text-dim line-through decoration-red-400/70">
                {pricing.original}
              </p>
              <p className="font-heading text-5xl font-semibold text-brand-400">
                {pricing.current}
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {pricing.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15">
                    <Check className="h-3 w-3 text-brand-400" aria-hidden />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-center text-sm font-medium text-brand-400">
              {pricing.guarantee}
            </p>
            <p className="mt-2 text-center text-sm font-semibold text-brand-300">
              {pricing.urgency}
            </p>

            <a
              href="#contact"
              className="mt-7 flex h-12 items-center justify-center rounded-full bg-brand-500 font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-400"
            >
              Enroll Now
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
