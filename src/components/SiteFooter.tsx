import type { Copy } from "@/content/copy";
import { Container } from "@/components/Section";
import { Asterisk } from "./icons";

export function SiteFooter({ t }: { t: Copy }) {
  const f = t.footer;
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-16">
          <div>
            <a
              href="#"
              className="flex w-fit items-center gap-[7px] text-ink transition-opacity hover:opacity-80"
            >
              <Asterisk className="h-[16px] w-[16px]" />
              <span className="text-[20px] font-medium leading-none tracking-[-0.02em]">
                {t.brand}
              </span>
            </a>
            <p className="mt-5 max-w-[280px] text-[14px] leading-[1.55] text-muted">
              {f.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {f.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="text-[11.5px] font-medium uppercase leading-none tracking-[0.14em] text-faint">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-[10px]">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[14px] leading-none text-ink-soft transition-colors hover:text-ink"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-muted">{f.rights}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {f.legal.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[13px] text-muted transition-colors hover:text-ink"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
