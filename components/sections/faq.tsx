import Reveal from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

export default function Faq() {
  return (
    <section id="faq" className="section-pad border-t border-white/5 bg-[#171b19]">
      <div className="container-x max-w-3xl">
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="rounded-xl border border-white/10 bg-card px-5 data-[state=open]:border-sage-400/40"
              >
                <AccordionTrigger className="py-4 text-left text-sm font-semibold hover:text-sage-300 hover:no-underline sm:text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-grey">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
