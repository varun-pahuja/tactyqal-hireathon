import Reveal from "@/components/reveal";
import { tools } from "@/lib/content";
import {
  Lightbulb,
  LineChart,
  Users,
  FileText,
  Search,
  Handshake,
  Scale,
  Globe,
  type LucideIcon,
} from "lucide-react";

const icons: LucideIcon[] = [
  Lightbulb,
  LineChart,
  Users,
  FileText,
  Search,
  Handshake,
  Scale,
  Globe,
];

export default function Tools() {
  return (
    <section id="tools" className="section-pad border-t border-white/5">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Free Tools to <span className="text-gradient">Get Started</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-grey">
            Explore our startup assessment tools used by 1000+ entrepreneurs
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={tool} delay={i * 40}>
                <a
                  href="#contact"
                  className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-sage-400/50 hover:shadow-xl hover:shadow-sage-500/10 focus-visible:outline-2 focus-visible:outline-sage-400"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-500/10 text-sage-400 transition-colors group-hover:bg-sage-500/20">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold leading-snug text-cream">
                    {tool}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full bg-sage-500 px-8 font-semibold text-noir shadow-lg shadow-sage-500/25 transition hover:bg-sage-400"
            >
              Access All Tools Free
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
