import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { COPY, type Locale } from "@/content/copy";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Display serif iz hero naslova. Najblizi besplatni par originalnom
 * editorial serifu sa reference: visok kontrast, tanke hairline linije,
 * ostrvasti serifi, velika x-visina. Ima samo jedan weight (400).
 */
const instrument = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const fontClassName = `${inter.variable} ${instrument.variable} antialiased`;

/**
 * Zajednicki <html>/<body> omot.
 *
 * Postoje dva root layout-a (za "/" i za "/en") da bi `lang` atribut bio
 * tacan na obe rute. Obe koriste ovu komponentu da fontovi ostanu na
 * jednom mjestu.
 */
export function Document({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} className={fontClassName}>
      <body>{children}</body>
    </html>
  );
}

export function buildMetadata(locale: Locale): Metadata {
  const t = COPY[locale];
  return {
    metadataBase: new URL("https://runcycle-landing-clone.vercel.app"),
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      locale: locale === "bs" ? "bs_BA" : "en_US",
    },
    alternates: {
      canonical: locale === "bs" ? "/" : "/en",
      languages: { bs: "/", en: "/en" },
    },
  };
}
