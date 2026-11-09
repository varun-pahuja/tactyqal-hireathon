"use client";

import { useState } from "react";
import Reveal from "@/components/reveal";
import { Play } from "lucide-react";

export default function VideoSection() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="section-pad">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Startup Ideas <span className="text-gradient">101</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
            Learn how to identify and validate profitable startup ideas from our
            founder.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto mt-10 aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
            {loaded ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/UyUH06CfLbk"
                title="How to Come Up with Startup Ideas — Tactyqal Labs"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[linear-gradient(135deg,#0f172a,#134e4a)] focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-600/40 transition-transform group-hover:scale-110">
                  <Play className="ml-1 h-7 w-7 fill-white text-white" aria-hidden />
                </span>
                <span className="text-sm font-medium text-slate-300">
                  Watch: How to Come Up with Startup Ideas
                </span>
                <span className="text-xs text-slate-500">Click to load video</span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
