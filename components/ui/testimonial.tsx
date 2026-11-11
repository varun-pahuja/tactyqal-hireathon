"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { testimonials } from "@/lib/content";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const GRID_OVERLAY =
  "absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]";

function Quote({
  num,
  quote,
  name,
  role,
  avatar,
  variants,
  grid = false,
  className = "",
}: {
  num: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  variants: Variants;
  grid?: boolean;
  className?: string;
}) {
  return (
    <TimelineContent
      animationNum={num}
      customVariants={variants}
      className={`relative flex flex-col justify-between overflow-hidden rounded-lg border border-white/10 p-5 ${className}`}
    >
      {grid ? <div className={GRID_OVERLAY} aria-hidden /> : null}
      <article className="mt-auto">
        <p className="text-[15px] leading-relaxed">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-end justify-between gap-3 pt-5">
          <div>
            <h3 className="font-semibold lg:text-xl text-sm">{name}</h3>
            <p className="text-xs text-white/70 lg:text-sm">{role}</p>
          </div>
          <Image
            src={avatar}
            alt={name}
            width={64}
            height={64}
            className="h-12 w-12 rounded-xl object-cover lg:h-16 lg:w-16"
            loading="lazy"
          />
        </div>
      </article>
    </TimelineContent>
  );
}

function ClientFeedback() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const t = testimonials;
  const role = "Tactyqal student";

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0a0a0a] py-14"
      ref={testimonialRef}
    >
      <article className="mx-auto max-w-screen-md space-y-2 px-4 text-center">
        <TimelineContent
          as="h2"
          className="text-3xl font-medium text-ink xl:text-4xl"
          animationNum={0}
          customVariants={revealVariants}
          timelineRef={testimonialRef}
        >
          What Our Students <span className="text-gradient">Say</span>
        </TimelineContent>
        <TimelineContent
          as="p"
          className="mx-auto text-dim"
          animationNum={1}
          customVariants={revealVariants}
          timelineRef={testimonialRef}
        >
          Real feedback from teens who went from idea to launched app.
        </TimelineContent>
      </article>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 pb-4 pt-10 lg:grid lg:grid-cols-3 lg:px-10 lg:py-10">
        {/* Column 1 — highlight + small */}
        <div className="flex h-full flex-col gap-2 md:flex lg:space-y-2">
          <Quote
            num={0}
            quote={t[4].quote}
            name={t[4].name}
            role={role}
            avatar={t[4].avatar}
            variants={revealVariants}
            grid
            className="flex-[6] border-transparent bg-gradient-to-br from-[#008f70] to-[#00291f] text-white lg:flex-[7]"
          />
          <Quote
            num={1}
            quote={t[0].quote}
            name={t[0].name}
            role={role}
            avatar={t[0].avatar}
            variants={revealVariants}
            className="flex-[4] border-transparent bg-[#008f70] text-white lg:flex-[3] lg:h-fit lg:shrink-0"
          />
        </div>

        {/* Column 2 — two dark cards */}
        <div className="flex h-fit flex-col gap-2 md:flex lg:h-full lg:space-y-2">
          <Quote
            num={2}
            quote={t[1].quote}
            name={t[1].name}
            role={role}
            avatar={t[1].avatar}
            variants={revealVariants}
            className="bg-[#111111] text-white lg:flex-1"
          />
          <Quote
            num={3}
            quote={t[5].quote}
            name={t[5].name}
            role={role}
            avatar={t[5].avatar}
            variants={revealVariants}
            className="bg-[#111111] text-white lg:flex-1"
          />
        </div>

        {/* Column 3 — small + highlight */}
        <div className="flex h-full flex-col gap-2 md:flex lg:space-y-2">
          <Quote
            num={4}
            quote={t[2].quote}
            name={t[2].name}
            role={role}
            avatar={t[2].avatar}
            variants={revealVariants}
            className="flex-[4] border-transparent bg-[#008f70] text-white lg:h-fit lg:flex-[3] lg:shrink-0"
          />
          <Quote
            num={5}
            quote={t[3].quote}
            name={t[3].name}
            role={role}
            avatar={t[3].avatar}
            variants={revealVariants}
            grid
            className="flex-[6] border-transparent bg-gradient-to-br from-[#008f70] to-[#00291f] text-white lg:flex-[7]"
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-[5%] z-[2] h-16 w-[90%] border-b-2 border-white/10 md:left-0 md:w-full">
        <div className="container relative mx-auto h-full w-full before:absolute before:-bottom-2 before:-left-2 before:h-4 before:w-4 before:border before:border-white/10 before:bg-[#0a0a0a] after:absolute after:-bottom-2 after:-right-2 after:h-4 after:w-4 after:border after:border-white/10 after:bg-[#0a0a0a]" />
      </div>
    </section>
  );
}

export default ClientFeedback;
