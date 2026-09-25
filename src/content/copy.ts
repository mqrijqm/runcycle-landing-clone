/**
 * Sav tekst na jednom mjestu — bosanski (bs) i engleski (en).
 * Bosanski je default (ruta "/"), engleski je na "/en".
 */

export type Locale = "bs" | "en";

export type NavItem = {
  readonly label: string;
  readonly href: string;
};

export type Copy = {
  brand: string;
  /** aria-label za prekidac jezika */
  langLabel: string;
  nav: readonly NavItem[];
  headerCta: string;
  hero: {
    /** Naslov je namjerno u dva reda — lom je dio dizajna. */
    readonly title: readonly [string, string];
    readonly body: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    /** Alt tekst za hero sliku (posle zamjene sivog containera). */
    readonly mediaAlt: string;
  };
  /** aria-label za traku sa logotipima */
  brandsLabel: string;
  meta: {
    title: string;
    description: string;
  };
};

export const COPY: Record<Locale, Copy> = {
  bs: {
    brand: "runcycle",
    langLabel: "Jezik",
    nav: [
      { label: "Funkcije", href: "#" },
      { label: "Proizvod", href: "#" },
      { label: "Cijene", href: "#" },
      { label: "O nama", href: "#" },
      { label: "Kontakt", href: "#" },
    ],
    headerCta: "Instaliraj sada",
    hero: {
      title: ["AI agent koji obavlja", "sve tvoje prodajne pozive"],
      body: "Najbolji AI agent na svijetu — svaki prodajni poziv obavi bolje od čovjeka.",
      primaryCta: "Instaliraj sada",
      secondaryCta: "Isprobaj besplatno",
      mediaAlt: "Klasična statua uz more, između palmi",
    },
    brandsLabel: "Kompanije koje koriste runcycle",
    meta: {
      title: "runcycle — AI agent koji obavlja sve prodajne pozive",
      description:
        "Najbolji AI agent na svijetu — svaki prodajni poziv obavi bolje od čovjeka.",
    },
  },

  en: {
    brand: "runcycle",
    langLabel: "Language",
    nav: [
      { label: "Features", href: "#" },
      { label: "Product", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
    ],
    headerCta: "Install now",
    hero: {
      title: ["AI agent that takes", "all your sales calls"],
      body: "The world's best AI agent - handles every sales call better than a human.",
      primaryCta: "Install now",
      secondaryCta: "Try for free",
      mediaAlt: "Classical statue by the sea, framed by palm trees",
    },
    brandsLabel: "Companies using runcycle",
    meta: {
      title: "runcycle — AI agent that takes all your sales calls",
      description:
        "The world's best AI agent - handles every sales call better than a human.",
    },
  },
};

/** Rute za prebacivanje jezika (BS je na "/", EN na "/en"). */
export const LOCALE_ROUTES: Record<Locale, string> = {
  bs: "/",
  en: "/en",
};

export const LOCALE_LABELS: Record<Locale, string> = {
  bs: "BS",
  en: "ENG",
};
