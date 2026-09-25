import { COPY, type Locale } from "@/content/copy";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Hero } from "./Hero";
import { BrandLogos } from "./BrandLogos";
import { Value } from "./sections/Value";
import { HowItWorks } from "./sections/HowItWorks";
import { FloatingCards } from "./sections/FloatingCards";
import { Features } from "./sections/Features";
import { Results } from "./sections/Results";
import { Quote } from "./sections/Quote";
import { Pricing } from "./sections/Pricing";
import { Faq } from "./sections/Faq";
import { FinalCta } from "./sections/FinalCta";

/**
 * Cijela stranica je jedna kolona sirine 1200px sa bijelim marginama — isti
 * okvir kao na referenci. Zato su i tamna CTA sekcija i siva sekcija sa
 * citatom ogranicene na tu sirinu, umjesto preko cijelog ekrana.
 */
export function RuncyclePage({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <SiteHeader t={t} locale={locale} />
      <main>
        <Hero t={t} />
        <BrandLogos label={t.brandsLabel} />
        <Value t={t} />
        <HowItWorks t={t} />
        <FloatingCards t={t} />
        <Features t={t} />
        <Results t={t} />
        <Quote t={t} />
        <Pricing t={t} />
        <Faq t={t} />
        <FinalCta t={t} />
      </main>
      <SiteFooter t={t} />
    </div>
  );
}
