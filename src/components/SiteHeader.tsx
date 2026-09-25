import type { Copy, Locale } from "@/content/copy";
import { Asterisk } from "./icons";
import { LangToggle } from "./LangToggle";

export function SiteHeader({ t, locale }: { t: Copy; locale: Locale }) {
  return (
    <header className="relative flex h-[74px] shrink-0 items-center justify-between gap-4 px-6 md:px-[60px]">
      <a
        href="#"
        aria-label={`${t.brand} — ${locale === "bs" ? "početna" : "home"}`}
        className="flex shrink-0 items-center gap-[7px] text-ink transition-opacity hover:opacity-80"
      >
        <Asterisk className="h-[15px] w-[15px] md:h-[17px] md:w-[17px]" />
        <span className="text-[19px] font-medium leading-none tracking-[-0.02em] md:text-[21px]">
          {t.brand}
        </span>
      </a>

      {/* Navigacija je centrirana po sirini containera (kao na referenci). */}
      <nav
        aria-label={locale === "bs" ? "Glavna navigacija" : "Main"}
        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-[34px] lg:flex"
      >
        {t.nav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[14.5px] leading-none text-ink-soft transition-colors hover:text-ink"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-[8px] md:gap-[10px]">
        <LangToggle locale={locale} />

        <a
          href="#"
          className="flex h-[36px] items-center whitespace-nowrap rounded-full border border-line bg-white px-[14px] text-[13.5px] font-medium leading-none text-ink transition-colors hover:bg-pill md:h-[40px] md:px-[20px] md:text-[14.5px]"
        >
          {t.headerCta}
        </a>
      </div>
    </header>
  );
}
