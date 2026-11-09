import Reveal from "@/components/reveal";
import { features } from "@/lib/content";
import {
  GraduationCap,
  Code2,
  Trophy,
  Landmark,
  TrendingUp,
  Heart,
  Mic,
  Star,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  code: Code2,
  trophy: Trophy,
  bank: Landmark,
  chart: TrendingUp,
  heart: Heart,
  mic: Mic,
  star: Star,
};

export default function Why() {
  return (
    <section id="why" className="section-pad border-t border-white/5 bg-[#0a0a0a]">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-medium sm:text-4xl md:text-5xl">
            Why Parents Choose <span className="text-gradient">Tactyqal Labs</span>
          </h2>
        </Reveal>

        {/* Bento-ish grid: first card spans 2 on large screens */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = icons[f.icon] ?? Star;
            const featured = i === 0;
            return (
              <Reveal
                key={f.title}
                delay={i * 50}
                className={featured ? "lg:col-span-2 lg:row-span-1" : ""}
              >
                <div
                  className={`group h-full rounded-2xl border border-white/10 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/40 hover:shadow-xl hover:shadow-brand-500/5 ${
                    featured
                      ? "bg-gradient-to-br from-brand-500/10 to-transparent"
                      : ""
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 transition-colors group-hover:bg-brand-500/25">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-medium text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-dim">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
