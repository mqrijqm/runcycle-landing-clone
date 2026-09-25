import { COPY, type Locale } from "@/content/copy";
import { SiteHeader } from "./SiteHeader";
import { Hero } from "./Hero";
import { BrandLogos } from "./BrandLogos";

export function RuncyclePage({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <SiteHeader t={t} locale={locale} />
      <main>
        <Hero t={t} />
      </main>
      <BrandLogos label={t.brandsLabel} />
    </div>
  );
}
