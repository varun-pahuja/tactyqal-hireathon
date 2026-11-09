import Image from "next/image";
import Reveal from "@/components/reveal";
import { stories } from "@/lib/content";

export default function Stories() {
  return (
    <section id="success" className="section-pad border-t border-white/5">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Real Students. Real Apps. <span className="text-gradient">Real Success.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.name} delay={i * 70}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-500/10">
                {/* Spotlight on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(400px_circle_at_var(--x,50%)_var(--y,50%),rgba(16,185,129,0.12),transparent_60%)]"
                  aria-hidden
                />
                <div className="relative flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-bold text-emerald-400">
                    {s.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
                    {s.description}
                  </p>
                  <div className="relative mt-5 overflow-hidden rounded-lg border border-white/10 bg-slate-900">
                    <Image
                      src={s.image}
                      alt={`${s.name} app screenshot`}
                      width={640}
                      height={400}
                      className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
