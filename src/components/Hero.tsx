import type { CSSProperties } from "react";
import type { Copy } from "@/content/copy";
import { Asterisk } from "./icons";

export function Hero({ t }: { t: Copy }) {
  return (
    <section>
      {/*
        Hero slika. Zasad prazan sivi container — kad slika bude gotova,
        zamijeni ovaj div sa <Image src="..." alt={t.hero.mediaAlt} fill />.
        Proporcija prati referencu: 1200x448 na desktopu, 3:2 na mobilnom.
      */}
      <div
        role="img"
        aria-label={t.hero.mediaAlt}
        className="rise aspect-[3/2] w-full bg-media md:aspect-[1200/448]"
        style={{ "--rise-delay": "60ms" } as CSSProperties}
      />

      <div className="flex flex-col gap-9 px-6 pb-11 pt-10 md:flex-row md:items-start md:justify-between md:gap-16 md:pb-[46px] md:pl-[60px] md:pr-[120px] md:pt-[20px]">
        <h1 className="rise font-display text-[34px] leading-[1.06] tracking-[-0.005em] text-ink sm:text-[40px] md:text-[44px]">
          {t.hero.title[0]}
          <br />
          {t.hero.title[1]}
        </h1>

        {/*
          Bosanski tekst je duzi od engleskog, pa je kolona sira od one na
          referenci (~215px) da bi dva dugmeta ostala u istom redu.
        */}
        <div
          className="rise w-full md:max-w-[350px] md:shrink-0"
          style={{ "--rise-delay": "120ms" } as CSSProperties}
        >
          <p className="max-w-[300px] text-[15px] leading-[1.5] text-muted">
            {t.hero.body}
          </p>

          <div className="mt-[20px] flex flex-wrap items-center gap-[8px] md:flex-nowrap">
            <a
              href="#"
              className="flex h-[40px] items-center gap-[8px] whitespace-nowrap rounded-full bg-ink px-[20px] text-[14.5px] font-medium leading-none text-white transition-transform hover:-translate-y-px"
            >
              <Asterisk className="h-[13px] w-[13px]" />
              {t.hero.primaryCta}
            </a>
            <a
              href="#"
              className="flex h-[40px] items-center whitespace-nowrap rounded-full bg-pill px-[18px] text-[14.5px] font-medium leading-none text-ink transition-colors hover:bg-line"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
