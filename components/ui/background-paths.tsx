"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

function FloatingPaths({ position }: { position: number }) {
  const reduced = useReducedMotion();
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-[#00a982]"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={reduced ? false : { pathLength: 0.3, opacity: 0.6 }}
            animate={
              reduced
                ? undefined
                : {
                    pathLength: 1,
                    opacity: [0.3, 0.6, 0.3],
                    pathOffset: [0, 1, 0],
                  }
            }
            transition={
              reduced
                ? undefined
                  : {
                      // deterministic per-path duration (no Math.random in render)
                      duration: 20 + (path.id % 10),
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }
            }
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Background Paths",
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const words = title.split(" ");

  return (
    <div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#030303] py-32">
      <div className="absolute inset-0" aria-hidden>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-bold tracking-tighter text-ink">
            {reduced
              ? title
              : words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="mr-4 inline-block last:mr-0"
                  >
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: wordIndex * 0.1 + letterIndex * 0.03,
                          type: "spring",
                          stiffness: 150,
                          damping: 25,
                        }}
                        className="inline-block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
          </h1>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
