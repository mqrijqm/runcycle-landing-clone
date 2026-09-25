/**
 * Sav tekst na jednom mjestu — bosanski (bs) i engleski (en).
 * Bosanski je default (ruta "/"), engleski je na "/en".
 */

export type Locale = "bs" | "en";

export type NavItem = {
  readonly label: string;
  readonly href: string;
};

export type Stat = {
  readonly value: string;
  readonly label: string;
};

export type Step = {
  readonly title: string;
  readonly body: string;
};

export type Feature = {
  readonly title: string;
  readonly body: string;
};

export type Plan = {
  readonly name: string;
  readonly monthly: string;
  readonly yearly: string;
  readonly period: string;
  readonly note: string;
  readonly features: readonly string[];
  readonly cta: string;
  /** bedz na istaknutom paketu */
  readonly badge?: string;
  readonly featured?: boolean;
};

export type FaqItem = {
  readonly q: string;
  readonly a: string;
};

export type Copy = {
  brand: string;
  /** aria-label za prekidac jezika */
  langLabel: string;
  nav: readonly NavItem[];
  headerCta: string;
  /** aria-label za dugme mobilnog menija */
  menu: {
    readonly open: string;
    readonly close: string;
    readonly label: string;
  };
  hero: {
    /** Naslov je namjerno u dva reda — lom je dio dizajna. */
    readonly title: readonly [string, string];
    readonly body: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    /** Alt tekst za hero sliku (poslije zamjene sivog containera). */
    readonly mediaAlt: string;
  };
  /** aria-label za traku sa logotipima */
  brandsLabel: string;

  /* --- Sekcija: zasto ------------------------------------------------------ */
  value: {
    eyebrow: string;
    title: string;
    body: string;
    stats: readonly Stat[];
  };

  /* --- Sekcija: kako radi -------------------------------------------------- */
  how: {
    eyebrow: string;
    title: string;
    body: string;
    steps: readonly Step[];
    ui: {
      alt: string;
      live: string;
      caller: string;
      agent: string;
      turns: readonly string[];
      bookedLabel: string;
      bookedValue: string;
    };
  };

  /* --- Sekcija: mogucnosti ------------------------------------------------- */
  features: {
    eyebrow: string;
    title: string;
    body: string;
    items: readonly Feature[];
    ui: {
      alt: string;
      status: string;
      fields: readonly Stat[];
      action: string;
    };
  };

  /* --- Sekcija: rezultati -------------------------------------------------- */
  results: {
    eyebrow: string;
    title: string;
    body: string;
    stats: readonly Stat[];
    ui: {
      alt: string;
      title: string;
      range: string;
      kpis: readonly Stat[];
      chartTitle: string;
      days: readonly string[];
      listTitle: string;
      rows: readonly { time: string; outcome: string; kind: "ok" | "warn" }[];
    };
  };

  /* --- Sekcija: izjava ----------------------------------------------------- */
  quote: {
    text: string;
    author: string;
    role: string;
  };

  /* --- Sekcija: cijene ----------------------------------------------------- */
  pricing: {
    eyebrow: string;
    title: string;
    body: string;
    monthlyLabel: string;
    yearlyLabel: string;
    saving: string;
    footnote: string;
    plans: readonly Plan[];
  };

  /* --- Sekcija: pitanja --------------------------------------------------- */
  faq: {
    eyebrow: string;
    title: string;
    body: string;
    items: readonly FaqItem[];
  };

  /* --- Zavrsni CTA -------------------------------------------------------- */
  cta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    note: string;
  };

  footer: {
    tagline: string;
    columns: readonly { title: string; links: readonly string[] }[];
    legal: readonly string[];
    rights: string;
  };

  meta: {
    title: string;
    description: string;
  };
};

/** Sidra za navigaciju — ista na oba jezika, pa se ne dupliraju. */
export const SECTION_IDS = {
  features: "#features",
  how: "#how",
  pricing: "#pricing",
  faq: "#faq",
} as const;

export const COPY: Record<Locale, Copy> = {
  bs: {
    brand: "runcycle",
    langLabel: "Jezik",
    nav: [
      { label: "Funkcije", href: SECTION_IDS.features },
      { label: "Kako radi", href: SECTION_IDS.how },
      { label: "Cijene", href: SECTION_IDS.pricing },
      { label: "Pitanja", href: SECTION_IDS.faq },
    ],
    headerCta: "Instaliraj sada",
    menu: {
      open: "Otvori meni",
      close: "Zatvori meni",
      label: "Meni",
    },
    hero: {
      title: ["AI agent koji obavlja", "sve tvoje prodajne pozive"],
      body: "Najbolji AI agent na svijetu — svaki prodajni poziv obavi bolje od čovjeka.",
      primaryCta: "Instaliraj sada",
      secondaryCta: "Isprobaj besplatno",
      mediaAlt:
        "Statua klasične figure na obali mora, uokvirena kamenim stepenicama i bršljanom",
    },
    brandsLabel: "Kompanije koje koriste runcycle",

    value: {
      eyebrow: "Zašto runcycle",
      title: "Propušten poziv je izgubljen posao. Ništa više.",
      body: "Prosječan prodajni tim ne stigne da se javi na svaki poziv. runcycle se javlja na sve — u prvoj sekundi, i u nedjelju u 23h, i dok si na godišnjem.",
      stats: [
        { value: "62%", label: "poziva dolazi van radnog vremena" },
        { value: "1.2s", label: "prosječno vrijeme do javljanja" },
        { value: "3.2×", label: "više zakazanih sastanaka" },
      ],
    },

    how: {
      eyebrow: "Kako radi",
      title: "Tri koraka do agenta koji prodaje.",
      body: "Bez integracija koje traju mjesecima i bez tima inženjera. Povežeš broj, ubaciš znanje o proizvodu i pustiš ga da radi.",
      steps: [
        {
          title: "Poveži telefonski broj",
          body: "Preusmjeri postojeći poslovni broj ili uzmi novi. Postavljanje traje pet minuta.",
        },
        {
          title: "Nauči agenta tvoj proizvod",
          body: "Ubaci cjenovnik, dokumentaciju i snimke dobrih poziva. Agent zna šta prodaje i kome.",
        },
        {
          title: "Vodi razgovore koji donose novac",
          body: "Agent kvalifikuje, odgovara i zakazuje. Ti u kalendaru dobijaš samo sastanke.",
        },
      ],
      ui: {
        alt: "Panel sa pozivom u toku i transkriptom razgovora",
        live: "Uživo · 00:42",
        caller: "Kupac",
        agent: "runcycle",
        turns: [
          "Trebam ponudu za 12 korisnika, ali nam budžet ide od januara.",
          "Razumijem. Predlažem da krenemo sa 6 korisnika u decembru, a ostatak u januaru. Četvrtak u 14h?",
        ],
        bookedLabel: "Sastanak zakazan",
        bookedValue: "Četvrtak, 14:00 · 30 min",
      },
    },

    features: {
      eyebrow: "Funkcije",
      title: "Sve što dobar prodavač radi — samo bez pauze.",
      body: "Agent ne čita skriptu. Sluša, pita, pamti i zna kada da pozove čovjeka.",
      items: [
        {
          title: "Prepoznaje namjeru",
          body: "Razlikuje kupca koji pita cijenu od onog kome treba podrška — i mijenja razgovor u skladu s tim.",
        },
        {
          title: "Zakazuje u tvoj kalendar",
          body: "Provjerava slobodne termine i upisuje sastanak. Bez ping-ponga mejlovima.",
        },
        {
          title: "Govori tvoj jezik",
          body: "Bosanski, engleski, njemački. Prebacuje se u toku razgovora ako kupac promijeni jezik.",
        },
        {
          title: "Pamti svaki kontakt",
          body: "Bilješke, interes i sljedeći korak idu u CRM prije nego što spustiš slušalicu.",
        },
        {
          title: "Predaje čovjeku kad zatreba",
          body: "Kada kupac traži nekoga „stvarnog“ ili je riječ o velikom poslu, agent to prepozna i prosledi tebi.",
        },
        {
          title: "Uči iz najboljih poziva",
          body: "Transkripti se pretvaraju u odgovore i prigovore koje cijeli tim koristi.",
        },
      ],
      ui: {
        alt: "Kartica kontakta u CRM-u sa interesom i sljedećim korakom",
        status: "Zapisano u CRM",
        fields: [
          { value: "12 korisnika", label: "Interes" },
          { value: "18.000 €", label: "Budžet" },
          { value: "Četvrtak 14:00", label: "Sljedeći korak" },
        ],
        action: "Pošalji ponudu",
      },
    },

    results: {
      eyebrow: "Rezultati",
      title: "Brojevi koje prodajni tim osjeti na kraju mjeseca.",
      body: "runcycle ne prodaje maglu. Mjerimo svaki poziv, svaki sastanak i svaku izgubljenu priliku.",
      stats: [
        { value: "+38%", label: "više zakazanih sastanaka u prvom mjesecu" },
        { value: "−71%", label: "manje vremena na unos podataka" },
        { value: "99.9%", label: "poziva odgovoreno u roku od 24 sata" },
      ],
      ui: {
        alt: "Panel sa brojem poziva, konverzijom i listom nedavnih poziva",
        title: "Pozivi",
        range: "Zadnjih 7 dana",
        kpis: [
          { value: "412", label: "odgovorenih poziva" },
          { value: "68", label: "zakazanih sastanaka" },
          { value: "16.5%", label: "stopa konverzije" },
        ],
        chartTitle: "Zakazani sastanci po danu",
        days: ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"],
        listTitle: "Nedavni pozivi",
        rows: [
          { time: "Prije 12 min", outcome: "Sastanak zakazan", kind: "ok" },
          { time: "Prije 40 min", outcome: "Ponuda poslana", kind: "ok" },
          { time: "Prije 1 h", outcome: "Proslijeđeno tebi", kind: "warn" },
        ],
      },
    },

    quote: {
      text: "Prve nedjelje smo dobili četiri sastanka koje bismo ranije propustili — bio je vikend. Agent se javio u 23:40 i zakazao za ponedjeljak ujutro.",
      author: "Amina Halilović",
      role: "Direktorica prodaje, Kestrel",
    },

    pricing: {
      eyebrow: "Cijene",
      title: "Plaćaš po pozivima koje obaviš, ne po sjedištima.",
      body: "Svaki paket uključuje postavljanje, transkripte i neograničen broj korisnika u timu.",
      monthlyLabel: "Mjesečno",
      yearlyLabel: "Godišnje",
      saving: "2 mjeseca gratis",
      footnote: "Bez kartice. Prvih 100 minuta je besplatno.",
      plans: [
        {
          name: "Starter",
          monthly: "149 €",
          yearly: "119 €",
          period: "mjesečno",
          note: "Za jednog prodavca i prve pozive.",
          features: [
            "1 telefonski broj",
            "100 minuta razgovora",
            "Transkript i snimak svakog poziva",
            "Zakazivanje u Google kalendar",
            "Email podrška",
          ],
          cta: "Počni besplatno",
        },
        {
          name: "Tim",
          monthly: "349 €",
          yearly: "279 €",
          period: "mjesečno",
          note: "Za tim koji ne smije propustiti poziv.",
          featured: true,
          badge: "Najčešći izbor",
          features: [
            "3 telefonska broja",
            "500 minuta razgovora",
            "Zapis u CRM (HubSpot, Pipedrive)",
            "Predaja razgovora čovjeku",
            "Podešavanje agenta na tvoj ton",
            "Prioritetna podrška",
          ],
          cta: "Probaj 14 dana",
        },
        {
          name: "Enterprise",
          monthly: "Po dogovoru",
          yearly: "Po dogovoru",
          period: "",
          note: "Za timove sa vlastitim pravilima.",
          features: [
            "Neograničen broj brojeva",
            "SLA 99.9% i SSO",
            "Agent podešen na glas brenda",
            "Dedicated success manager",
            "Opcija na tvojoj infrastrukturi",
          ],
          cta: "Razgovaraj s nama",
        },
      ],
    },

    faq: {
      eyebrow: "Pitanja",
      title: "Ono što svi pitaju prije prvog poziva.",
      body: "Ako nešto nije ovdje, pitaj nas — odgovaramo isti dan.",
      items: [
        {
          q: "Zvuči li agent kao robot?",
          a: "Ne. Koristi prirodan glas, pauze i govorne oblike koje ljudi koriste u razgovoru. Ako kupac prekine, agent stane i sasluša — kao što bi i čovjek.",
        },
        {
          q: "Šta se desi ako ne zna odgovor?",
          a: "Kaže da će provjeriti, zabilježi pitanje i preda razgovor tebi ili kolegi. Nikad ne izmišlja odgovor na cijenu ili rok.",
        },
        {
          q: "Koliko traje postavljanje?",
          a: "Broj je aktivan za pet minuta. Za ozbiljno podešavanje znanja o proizvodu obično treba jedan radni dan.",
        },
        {
          q: "Mogu li da slušam i čitam pozive?",
          a: "Da. Svaki poziv ima snimak i transkript sa označenim dijelovima gdje je kupac pitao za cijenu, budžet ili termin.",
        },
        {
          q: "Radi li na bosanskom?",
          a: "Da, i na još dvanaest jezika. Ako kupac u toku razgovora pređe na engleski, agent nastavlja na engleskom bez prekida.",
        },
        {
          q: "Šta ako želim da otkažem?",
          a: "Nema ugovora na duže od mjesec dana. Otkazuješ jednim klikom i izvoziš sve snimke i podatke o kontaktima.",
        },
      ],
    },

    cta: {
      title: "Instaliraj agenta prije nego što propustiš još jedan poziv.",
      body: "Postavljanje traje pet minuta. Prvih 100 minuta razgovora je besplatno i ne tražimo karticu.",
      primary: "Instaliraj sada",
      secondary: "Zakaži demo",
      note: "Bez ugovora. Otkazuješ kad hoćeš.",
    },

    footer: {
      tagline: "AI agent koji obavlja sve tvoje prodajne pozive.",
      columns: [
        {
          title: "Proizvod",
          links: ["Funkcije", "Cijene", "Sigurnost", "Integracije"],
        },
        {
          title: "Kompanija",
          links: ["O nama", "Blog", "Karijere", "Kontakt"],
        },
        {
          title: "Resursi",
          links: ["Dokumentacija", "Vodiči", "Status", "API"],
        },
      ],
      legal: ["Privatnost", "Uslovi korištenja", "Kolačići"],
      rights: "© 2026 runcycle. Sva prava zadržana.",
    },

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
      { label: "Features", href: SECTION_IDS.features },
      { label: "How it works", href: SECTION_IDS.how },
      { label: "Pricing", href: SECTION_IDS.pricing },
      { label: "FAQ", href: SECTION_IDS.faq },
    ],
    headerCta: "Install now",
    menu: {
      open: "Open menu",
      close: "Close menu",
      label: "Menu",
    },
    hero: {
      title: ["AI agent that takes", "all your sales calls"],
      body: "The world's best AI agent - handles every sales call better than a human.",
      primaryCta: "Install now",
      secondaryCta: "Try for free",
      mediaAlt: "Classical statue on a sea shore, framed by stone steps and ivy",
    },
    brandsLabel: "Companies using runcycle",

    value: {
      eyebrow: "Why runcycle",
      title: "A missed call is lost business. Nothing more.",
      body: "The average sales team cannot pick up every call. runcycle answers all of them — within a second, on a Sunday at 11pm, and while you are on holiday.",
      stats: [
        { value: "62%", label: "of calls come in outside working hours" },
        { value: "1.2s", label: "average time to answer" },
        { value: "3.2×", label: "more booked meetings" },
      ],
    },

    how: {
      eyebrow: "How it works",
      title: "Three steps to an agent that sells.",
      body: "No integration projects and no engineering team. Connect a number, load your product knowledge, let it work.",
      steps: [
        {
          title: "Connect a phone number",
          body: "Forward your existing business number or get a new one. Setup takes five minutes.",
        },
        {
          title: "Teach the agent your product",
          body: "Upload your price list, docs and recordings of great calls. The agent knows what it sells and to whom.",
        },
        {
          title: "Have the conversations that pay",
          body: "The agent qualifies, answers and books. All you get in your calendar is meetings.",
        },
      ],
      ui: {
        alt: "Panel showing a live call with its transcript",
        live: "Live · 00:42",
        caller: "Customer",
        agent: "runcycle",
        turns: [
          "I need a quote for 12 seats, but our budget starts in January.",
          "Understood. I suggest we start with 6 seats in December and the rest in January. Thursday at 2pm?",
        ],
        bookedLabel: "Meeting booked",
        bookedValue: "Thursday, 2:00 PM · 30 min",
      },
    },

    features: {
      eyebrow: "Features",
      title: "Everything a great salesperson does — without the breaks.",
      body: "The agent does not read a script. It listens, asks, remembers and knows when to bring in a human.",
      items: [
        {
          title: "Understands intent",
          body: "It tells a buyer asking about price from a customer needing support — and changes the conversation accordingly.",
        },
        {
          title: "Books into your calendar",
          body: "It checks availability and writes the meeting in. No email ping-pong.",
        },
        {
          title: "Speaks your language",
          body: "Bosnian, English, German. It switches mid-call when the customer does.",
        },
        {
          title: "Remembers every contact",
          body: "Notes, interest and next step are in your CRM before you hang up.",
        },
        {
          title: "Hands over to a human",
          body: "When a customer asks for someone real, or the deal is big, the agent spots it and passes it to you.",
        },
        {
          title: "Learns from your best calls",
          body: "Transcripts turn into the answers and objections your whole team reuses.",
        },
      ],
      ui: {
        alt: "CRM contact card with interest, budget and next step",
        status: "Saved to CRM",
        fields: [
          { value: "12 seats", label: "Interest" },
          { value: "€18,000", label: "Budget" },
          { value: "Thursday 2pm", label: "Next step" },
        ],
        action: "Send proposal",
      },
    },

    results: {
      eyebrow: "Results",
      title: "Numbers your sales team feels at the end of the month.",
      body: "runcycle does not sell fog. We measure every call, every meeting and every missed opportunity.",
      stats: [
        { value: "+38%", label: "more booked meetings in month one" },
        { value: "−71%", label: "less time spent on data entry" },
        { value: "99.9%", label: "of calls answered within 24 hours" },
      ],
      ui: {
        alt: "Panel with call volume, conversion and a list of recent calls",
        title: "Calls",
        range: "Last 7 days",
        kpis: [
          { value: "412", label: "calls answered" },
          { value: "68", label: "meetings booked" },
          { value: "16.5%", label: "conversion rate" },
        ],
        chartTitle: "Meetings booked per day",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        listTitle: "Recent calls",
        rows: [
          { time: "12 min ago", outcome: "Meeting booked", kind: "ok" },
          { time: "40 min ago", outcome: "Proposal sent", kind: "ok" },
          { time: "1 h ago", outcome: "Passed to you", kind: "warn" },
        ],
      },
    },

    quote: {
      text: "The first Sunday we got four meetings we would have missed — it was the weekend. The agent picked up at 11:40pm and booked them for Monday morning.",
      author: "Amina Halilović",
      role: "Head of Sales, Kestrel",
    },

    pricing: {
      eyebrow: "Pricing",
      title: "You pay for the calls you make, not the seats you have.",
      body: "Every plan includes setup, transcripts and unlimited team members.",
      monthlyLabel: "Monthly",
      yearlyLabel: "Yearly",
      saving: "2 months free",
      footnote: "No credit card. The first 100 minutes are free.",
      plans: [
        {
          name: "Starter",
          monthly: "$169",
          yearly: "$135",
          period: "per month",
          note: "For one rep and the first calls.",
          features: [
            "1 phone number",
            "100 minutes of calls",
            "Transcript and recording of every call",
            "Google Calendar booking",
            "Email support",
          ],
          cta: "Start free",
        },
        {
          name: "Team",
          monthly: "$399",
          yearly: "$319",
          period: "per month",
          note: "For a team that cannot miss a call.",
          featured: true,
          badge: "Most popular",
          features: [
            "3 phone numbers",
            "500 minutes of calls",
            "CRM sync (HubSpot, Pipedrive)",
            "Human handover",
            "Agent tuned to your tone",
            "Priority support",
          ],
          cta: "Try 14 days",
        },
        {
          name: "Enterprise",
          monthly: "Custom",
          yearly: "Custom",
          period: "",
          note: "For teams with their own rules.",
          features: [
            "Unlimited phone numbers",
            "99.9% SLA and SSO",
            "Agent tuned to your brand voice",
            "Dedicated success manager",
            "On your own infrastructure",
          ],
          cta: "Talk to us",
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      title: "What everybody asks before the first call.",
      body: "If it is not here, ask us — we answer the same day.",
      items: [
        {
          q: "Does the agent sound like a robot?",
          a: "No. It uses a natural voice, pauses and the phrasing people actually use. If a customer interrupts, the agent stops and listens — like a person would.",
        },
        {
          q: "What if it does not know the answer?",
          a: "It says it will check, records the question and hands the conversation to you or a colleague. It never invents a price or a deadline.",
        },
        {
          q: "How long does setup take?",
          a: "The number is live in five minutes. Properly tuning your product knowledge usually takes one working day.",
        },
        {
          q: "Can I listen to and read the calls?",
          a: "Yes. Every call has a recording and a transcript, with the moments where the customer asked about price, budget or timing marked.",
        },
        {
          q: "Does it work in Bosnian?",
          a: "Yes, and in twelve more languages. If the customer switches to English mid-call, the agent continues in English without skipping a beat.",
        },
        {
          q: "What if I want to cancel?",
          a: "There is no contract longer than a month. Cancel in one click and export every recording and contact record.",
        },
      ],
    },

    cta: {
      title: "Install the agent before you miss another call.",
      body: "Setup takes five minutes. The first 100 minutes of calls are free and we do not ask for a card.",
      primary: "Install now",
      secondary: "Book a demo",
      note: "No contract. Cancel whenever you want.",
    },

    footer: {
      tagline: "AI agent that takes all your sales calls.",
      columns: [
        {
          title: "Product",
          links: ["Features", "Pricing", "Security", "Integrations"],
        },
        {
          title: "Company",
          links: ["About", "Blog", "Careers", "Contact"],
        },
        {
          title: "Resources",
          links: ["Documentation", "Guides", "Status", "API"],
        },
      ],
      legal: ["Privacy", "Terms", "Cookies"],
      rights: "© 2026 runcycle. All rights reserved.",
    },

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
