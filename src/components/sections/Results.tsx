import type { Copy } from "@/content/copy";
import { Container, Eyebrow, Lead, SectionTitle } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ResultsMock } from "@/components/mocks";

export function Results({ t }: { t: Copy }) {
  const r = t.results;
  return (
    <section className="border-t border-line py-[70px] md:py-[110px]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{r.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <SectionTitle className="mt-6">{r.title}</SectionTitle>
            </Reveal>
            <Reveal delay={120}>
              <Lead className="mt-6">{r.body}</Lead>
            </Reveal>

            <dl className="mt-10 border-t border-line">
              {r.stats.map((s, i) => (
                <Reveal key={s.label} delay={140 + i * 70}>
                  <div className="flex items-baseline gap-6 border-b border-line py-4">
                    <dt className="font-display w-[92px] shrink-0 text-[26px] leading-none text-ink">
                      {s.value}
                    </dt>
                    <dd className="text-[14px] leading-[1.5] text-muted">{s.label}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={100}>
            <ResultsMock ui={r.ui} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
