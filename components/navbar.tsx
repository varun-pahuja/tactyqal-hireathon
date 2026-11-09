"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navLinks } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5 shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-coral-500 via-coral-400 to-cyan-400"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="#home" className="font-heading text-xl font-bold tracking-tight md:text-2xl">
          Tactyqal <span className="text-gradient">Labs</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-coral-300 focus-visible:outline-2 focus-visible:outline-coral-400"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden rounded-full bg-coral-500 font-semibold text-navy hover:bg-coral-400 md:inline-flex"
          >
            <a href="#contact">Contact</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden">
              <span className="sr-only">Open menu</span>
              <Menu className="h-5 w-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-white/10 bg-[#0a1c3d]">
              <SheetTitle className="font-heading text-lg font-bold">
                Tactyqal <span className="text-gradient">Labs</span>
              </SheetTitle>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-coral-300"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-3 rounded-full bg-coral-500 px-4 py-3 text-center font-semibold text-navy"
                >
                  Contact
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
