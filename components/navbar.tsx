"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { navLinks } from "@/lib/content";

function StarMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-300" fill="currentColor" aria-hidden>
      <path d="M12 1C12.6 7 15 9.4 21 10 15 10.6 12.6 13 12 19 11.4 13 9 10.6 3 10 9 9.4 11.4 7 12 1Z" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-1/2 top-[30px] z-50 w-max max-w-[calc(100vw-24px)] -translate-x-1/2">
      <nav
        className="flex h-[52px] items-center gap-0.5 rounded-full border border-white/[0.06] bg-[#171717]/95 px-2.5 py-2 backdrop-blur-md"
        aria-label="Primary"
      >
        <Link
          href="#home"
          className="flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-ink transition-colors hover:text-white"
        >
          <StarMark />
          Tactyqal
        </Link>

        <span className="mx-1 hidden h-4 w-px bg-white/10 md:block" aria-hidden />

        <div className="hidden items-center md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[13px] font-normal text-[#858585] transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-400"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="ml-1 hidden rounded-full bg-charcoal px-4 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-[#333333] md:inline-flex"
        >
          Contact Us
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#858585] transition-colors hover:text-ink md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" aria-hidden />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-white/10 bg-[#0a0a0a]">
            <SheetTitle className="flex items-center gap-2 font-heading text-base font-medium text-ink">
              <StarMark />
              Tactyqal
            </SheetTitle>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-[#858585] transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-charcoal px-4 py-3 text-center text-sm font-medium text-ink"
              >
                Contact Us
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
