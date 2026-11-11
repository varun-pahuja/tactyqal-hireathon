import { BackgroundPaths } from "@/components/ui/background-paths";
import { ArrowRight } from "lucide-react";

export default function StoryHero() {
  return (
    <BackgroundPaths title="Your kid has an idea. In 8 weeks, it makes money.">
      <p className="mx-auto mt-2 max-w-[500px] text-[15px] leading-[1.6] text-dim sm:text-base">
        We turn curious teenagers into founders — idea to full-stack app to
        real revenue, with 1:1 mentoring every single week.
      </p>

      <p className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-brand-400/40 bg-brand-500/10 px-5 py-2.5 text-sm font-medium tracking-wide text-brand-300 shadow-[0_0_32px_rgba(0,169,130,0.18)]">
        <span className="text-lg font-semibold text-white">₹16,000</span>
        <span className="text-brand-400/70" aria-hidden>
          ·
        </span>
        15 spots this month
        <span className="text-brand-400/70" aria-hidden>
          ·
        </span>
        results guaranteed
      </p>

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#pricing"
          className="group inline-flex h-11 items-center gap-2 rounded-lg bg-[#009b78] px-6 text-sm font-medium text-white transition-colors hover:bg-[#00a982] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          See Plans
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </a>
        <a
          href="#program"
          className="inline-flex h-11 items-center rounded-lg bg-charcoal px-6 text-sm font-medium text-white transition-colors hover:bg-[#333333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
        >
          Explore Features
        </a>
      </div>
    </BackgroundPaths>
  );
}
