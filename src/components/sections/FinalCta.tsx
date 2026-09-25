import type { Copy } from "@/content/copy";
import { Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function FinalCta({ t }: { t: Copy }) {
  const c = t.cta;
  return (
    <section className="bg-ink text-white">
      <Container className="py-[80px] md:py-[120px]">
        <Reveal>
          <div className="mx-auto max-w-[780px] text-center">
            <h2 className="font-display text-[32px] leading-[1.07] tracking-[-0.005em] sm:text-[40px] md:text-[52px]">
              {c.title}
            </h2>
            <p className="mx-auto mt-6 max-w-[540px] text-[15.5px] leading-[1.6] text-white/65">
              {c.body}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#"
                className="flex h-[46px] items-center rounded-full bg-white px-[26px] text-[15px] font-medium leading-none text-ink transition-transform hover:-translate-y-px"
              >
                {c.primary}
              </a>
              <a
                href="#"
                className="flex h-[46px] items-center rounded-full border border-white/25 px-[24px] text-[15px] font-medium leading-none text-white transition-colors hover:bg-white/10"
              >
                {c.secondary}
              </a>
            </div>
            <p className="mt-5 text-[13px] text-white/45">{c.note}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
