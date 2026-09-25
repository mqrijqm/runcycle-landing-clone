import type { Copy } from "@/content/copy";
import { Container, Eyebrow, Lead, SectionTitle } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CallMock } from "@/components/mocks";

export function HowItWorks({ t }: { t: Copy }) {
  const h = t.how;
  return (
    <section id="how" className="border-t border-line py-[70px] md:py-[110px]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{h.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <SectionTitle className="mt-6 max-w-[520px]">{h.title}</SectionTitle>
            </Reveal>
            <Reveal delay={120}>
              <Lead className="mt-6 max-w-[430px]">{h.body}</Lead>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <CallMock ui={h.ui} />
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-10">
          {h.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 90}>
                <span className="font-display text-[15px] leading-none text-faint">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-[17px] font-medium leading-snug text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[340px] text-[14.5px] leading-[1.6] text-muted">
                  {s.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
