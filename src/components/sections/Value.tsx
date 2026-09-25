import type { Copy } from "@/content/copy";
import { Container, Eyebrow, Lead, SectionTitle } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function Value({ t }: { t: Copy }) {
  const v = t.value;
  return (
    <section className="border-t border-line py-[70px] md:py-[110px]">
      <Container>
        <Reveal>
          <Eyebrow>{v.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
          <Reveal delay={60}>
            <SectionTitle className="max-w-[660px] text-balance">{v.title}</SectionTitle>
          </Reveal>
          <Reveal delay={120}>
            <Lead className="lg:pt-1">{v.body}</Lead>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-line">
          {v.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="py-7 sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <p className="font-display text-[42px] leading-none tracking-[-0.01em] md:text-[54px]">
                {s.value}
              </p>
              <p className="mt-3 max-w-[230px] text-[14px] leading-[1.5] text-muted">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
