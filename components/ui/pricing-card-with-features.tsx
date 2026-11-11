"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Phone } from "lucide-react";

const features = [
  {
    label: "8 weeks of 1:1 mentoring",
    info: "One live session every week with your own mentor.",
  },
  {
    label: "Full-stack app development",
    info: "Ship a real, working product — no coding experience needed.",
  },
  {
    label: "Product Hunt launch",
    info: "We launch your app publicly to land real first users.",
  },
  {
    label: "Pitch deck creation",
    info: "An investor-ready deck that tells your story.",
  },
  {
    label: "Marketing strategy",
    info: "A go-to-market plan to find and keep users.",
  },
  {
    label: "Ongoing support",
    info: "Alumni community and guidance after launch.",
  },
  {
    label: "College application boost",
    info: "Standout projects for top university applications.",
  },
  {
    label: "Grants & media coverage",
    info: "Win grants and get featured in the press.",
  },
];

export const Box = () => {
  return (
    <TooltipProvider>
      <div className="flex w-full max-w-[464px] flex-col gap-6 rounded-[38px] border border-border bg-card p-[23px] shadow-2xl shadow-brand-500/10">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold leading-[24px]">
            8-Week Founder Program
          </h2>
          <p className="text-base leading-[19px] text-muted-foreground">
            Idea to launched app, with 1:1 mentoring
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-[25px] rounded-[33px] border border-border bg-background px-[27px] py-[30px]">
          {features.map((f, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div className="flex cursor-pointer select-none items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                  <Check className="h-5 w-5 flex-shrink-0 text-brand-400" />
                  <span className="text-base leading-[19px]">{f.label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[260px]">
                {f.info}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 px-[6px] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">One-time</span>
            <span className="text-[34px] leading-[41px] font-medium">
              ₹16,000
            </span>
          </div>

          <a
            href="tel:+919804772106"
            className={cn(
              buttonVariants({}),
              "h-[64px] w-full gap-3 rounded-[39px] border-[3px] border-[#004d3b] bg-gradient-to-r from-[#00a982] via-[#00a982] to-[#008f70] text-[20px] font-medium text-white shadow-lg shadow-brand-500/25 hover:opacity-90 sm:w-[220px]",
            )}
          >
            <Phone className="h-5 w-5" />
            <span>Book a call</span>
          </a>
        </div>
      </div>
    </TooltipProvider>
  );
};
