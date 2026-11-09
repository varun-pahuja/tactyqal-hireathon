import Reveal from "@/components/reveal";
import { contact } from "@/lib/content";
import { Mail, Phone, Clock, Zap } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-pad border-t border-white/5">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to Start Your Teen&apos;s{" "}
            <span className="text-gradient">Success Story?</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-gradient-to-br from-sage-400 via-sage-500 to-sage-700 p-8 text-white sm:p-10">
              <h3 className="font-heading text-2xl font-bold">Contact Us</h3>
              <p className="mt-2 text-sm text-sage-50/90">
                Reach out to our dedicated team for any inquiries, assistance,
                or information you need.
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex items-center justify-between gap-4 border-b border-white/25 pb-4">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm font-medium break-all hover:underline"
                  >
                    {contact.email}
                  </a>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Mail className="h-4 w-4" aria-hidden />
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4 border-b border-white/25 pb-4">
                  <a
                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {contact.phone}
                  </a>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Phone className="h-4 w-4" aria-hidden />
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4 border-b border-white/25 pb-4">
                  <span className="text-sm font-medium">{contact.hours}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Clock className="h-4 w-4" aria-hidden />
                  </span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium">{contact.response}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Zap className="h-4 w-4" aria-hidden />
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-card p-8 sm:p-10">
              <h3 className="font-heading text-center text-xl font-bold text-sage-400">
                Book a Free Appointment
              </h3>
              <p className="mt-2 text-center text-sm text-muted-grey">
                Get on a 15-minute call to understand how we&apos;ll help you
                over the next 8 weeks.
              </p>
              <div className="mt-6 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white">
                <iframe
                  title="Book a 15-Minute Call with Tactyqal Labs"
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3JlaCrNitoPs8Bdr-FUP0cRfFI-MopSIH2azaPNDpRk56h6drYLbXSh-mDc9sfEZAQUKGdsUXs?gv=true"
                  className="h-full min-h-[420px] w-full"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-center text-xs text-muted-grey/80">
                Prefer email?{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sage-400 hover:underline"
                >
                  {contact.email}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
