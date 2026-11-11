"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode, RefObject } from "react";

const MOTION_TAGS = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
};

export function TimelineContent({
  as = "div",
  className,
  animationNum = 0,
  customVariants,
  children,
}: {
  as?: keyof typeof MOTION_TAGS;
  className?: string;
  animationNum?: number;
  customVariants?: Variants;
  // accepted for API compat; viewport triggering is element-based
  timelineRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      custom={animationNum}
      variants={customVariants}
    >
      {children}
    </MotionTag>
  );
}
