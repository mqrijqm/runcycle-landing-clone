import type { Copy } from "@/content/copy";
import { Container, Eyebrow, Lead, SectionTitle } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ContactMock } from "@/components/mocks";

export function Features({ t }: { t: Copy }) {
  const f = t.features;
  return (
    <section id="features" className="border-t border-line py-[70px] md:py-[110px]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
          <Reveal>
            <Eyebrow>{f.eyebrow}</Eyebrow>
            <SectionTitle className="mt-6 max-w-[620px] text-balance">{f.title}</SectionTitle>
          </Reveal>
          <Reveal delay={100}>
            <Lead className="lg:pt-1">{f.body}</Lead>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-16">
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {f.items.map((item, i) => (
              <li key={item.title} className="border-t border-line">
                <Reveal delay={(i % 2) * 70}>
                  <h3 className="pt-6 text-[16.5px] font-medium leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 pb-8 text-[14.5px] leading-[1.6] text-muted">
                    {item.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={120} className="lg:sticky lg:top-10 lg:self-start">
            <ContactMock ui={f.ui} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
