import Image from "next/image";
import Reveal from "@/components/reveal";
import { testimonials } from "@/lib/content";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="section-pad border-t border-white/5 bg-[#0c1220]">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            What Our Students <span className="text-gradient">Say</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <figure className="flex h-full flex-col items-center rounded-2xl border border-emerald-400/25 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/10">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-full border-2 border-emerald-400/70 object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-4 font-heading font-bold text-emerald-400">
                  {t.name}
                </figcaption>
                <div className="mt-1 flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                  “{t.quote}”
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
