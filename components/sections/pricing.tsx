import Reveal from "@/components/reveal";
import { Box } from "@/components/ui/pricing-card-with-features";
import { pricing } from "@/lib/content";

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
          <div className="mt-12 flex flex-col items-center gap-5">
            <Box />
            <p className="text-center text-sm font-medium text-brand-400">
              {pricing.guarantee}
            </p>
            <p className="-mt-3 text-center text-sm font-semibold text-brand-300">
              {pricing.urgency}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
