# runcycle — landing page clone

Rekonstrukcija landing stranice sa referentnog screenshot-a: Next.js (App Router)
+ TypeScript + Tailwind CSS v4. Tekst je na bosanskom (`/`) i engleskom (`/en`),
sa prekidacem jezika u headeru.

## Pokretanje

```bash
pnpm install
pnpm dev
```

Sajt je na http://localhost:3000 (`/en` za englesku verziju).

Produkcijski build:

```bash
pnpm build
pnpm start
```

## Struktura

```
src/
  app/
    (bs)/layout.tsx      root layout za "/" (lang="bs")
    (bs)/page.tsx
    (en)/layout.tsx      root layout za "/en" (lang="en")
    (en)/en/page.tsx
    globals.css          design tokeni + base stilovi
  components/
    Document.tsx         <html>/<body> omot + fontovi + metadata
    RuncyclePage.tsx     sklapa stranicu
    SiteHeader.tsx       logo, navigacija, toggle, CTA
    Hero.tsx             sivi placeholder + naslov + opis + dugmadi
    BrandLogos.tsx       traka sa logotipima
    LangToggle.tsx       BS / ENG prekidac
    icons.tsx            runcycle zvjezdica
  content/
    copy.ts              sav tekst (bs + en) na jednom mjestu
```

## Napomene

- **Hero slika** je zasad prazan sivi container (`.bg-media`) u
  `src/components/Hero.tsx`. Kad slika bude gotova, zamijeniti `div` sa
  `next/image` i `alt` tekstom iz `copy.ts`.
- **Font**: `Instrument Serif` (Google Fonts) za naslov — najbliži besplatni
  par editorial serifu sa reference; `Inter` za UI tekst. Oba se self-hostuju
  preko `next/font`, pa nema zahtjeva ka Google-u iz browsera.
- **Logotipi** u donjoj traci su rekonstruisani kao SVG + tekst u jednoj boji.
  Ako zatrebaju pravi fajlovi, zamijeniti komponente u `BrandLogos.tsx`.
- Prekidac jezika su pravi linkovi (`/` i `/en`), bez JS stanja — svaka ruta
  ima tačan `lang` atribut i može se dijeliti.
