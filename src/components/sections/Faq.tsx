import type { Copy } from "@/content/copy";
import { Container, Eyebrow, Lead, SectionTitle } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

function Plus({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    >
      <path d="M8 3.4v9.2M3.4 8h9.2" />
    </svg>
  );
}

export function Faq({ t }: { t: Copy }) {
  const f = t.faq;
  return (
    <section id="faq" className="border-t border-line py-[70px] md:py-[110px]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <Reveal>
              <Eyebrow>{f.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <SectionTitle className="mt-6">{f.title}</SectionTitle>
            </Reveal>
            <Reveal delay={120}>
              <Lead className="mt-6 max-w-[340px]">{f.body}</Lead>
            </Reveal>
          </div>

          <div className="border-t border-line">
            {f.items.map((item, i) => (
              <Reveal key={item.q} delay={Math.min(i * 50, 150)}>
                <details className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-medium leading-snug text-ink">
                    {item.q}
                    <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors group-hover:bg-pill">
                      <Plus className="faq-plus h-[13px] w-[13px]" />
                    </span>
                  </summary>
                  <p className="max-w-[640px] pb-6 pr-10 text-[14.5px] leading-[1.65] text-muted">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
