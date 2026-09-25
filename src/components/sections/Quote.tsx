import type { Copy } from "@/content/copy";
import { Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function Quote({ t }: { t: Copy }) {
  const q = t.quote;
  return (
    <section className="border-t border-line bg-surface py-[70px] md:py-[110px]">
      <Container>
        <Reveal>
          <figure className="mx-auto max-w-[880px] text-center">
            <span
              aria-hidden="true"
              className="font-display block text-[44px] leading-none text-faint"
            >
              &ldquo;
            </span>
            <blockquote className="font-display mt-2 text-[24px] leading-[1.24] tracking-[-0.005em] text-ink sm:text-[30px] md:text-[36px]">
              {q.text}
            </blockquote>
            <figcaption className="mt-8 text-[14px] leading-[1.5] text-muted">
              <span className="font-medium text-ink">{q.author}</span>
              <span className="mx-2 text-faint">·</span>
              {q.role}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
