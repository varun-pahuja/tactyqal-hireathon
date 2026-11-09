import Link from "next/link";
import { navLinks, contact } from "@/lib/content";
import { Mail, Phone } from "lucide-react";

const socials = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080d18]">
      <div className="container-x py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="#home" className="font-heading text-xl font-bold">
              Tactyqal <span className="text-gradient">Labs</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Mentoring aspiring entrepreneurs and young builders to turn ideas
              into real-world applications — from ideation to launch in 8 weeks.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-emerald-400/50 hover:text-emerald-400"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-300">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-300">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2 transition-colors hover:text-emerald-400"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  {contact.phone}
                </a>
              </li>
              <li className="text-slate-500">{contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 Tactyqal Labs. All rights reserved.</p>
          <p>
            Built for the Tactyqal Labs hire-a-thon ·{" "}
            <Link href="/admin" className="hover:text-emerald-400">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
