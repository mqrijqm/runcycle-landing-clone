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
    Hero.tsx             naslov, opis, dugmadi + poziva parallax scenu
    HeroParallax.tsx     parallax scena od 4 sloja (klijentska komponenta)
    BrandLogos.tsx       traka sa logotipima
    LangToggle.tsx       BS / ENG prekidac
    icons.tsx            runcycle zvjezdica
  content/
    copy.ts              sav tekst (bs + en) na jednom mjestu
```

## Hero — parallax scena

Hero nije obična slika nego scena od 4 sloja koja se pomjeraju različitom
brzinom pri pomicanju miša i podižu se pojedinačno na hover:

| sloj | fajl | dubina | na hover |
|---|---|---|---|
| nebo | `sky` | 0.15 | blago uvećanje |
| more + planina + ostrvo | `sea` | 0.35 | blago uvećanje |
| kamen + bršljan | `stone` | 0.70 | uvećanje + sjena |
| statua | `statue` | 1.00 | uvećanje + sjena |

Sve je u `src/components/HeroParallax.tsx`. Slojevi se dodaju i štimaju u nizu
`LAYERS` — svaki ima okvir slike (`img`), površinu koja hvata hover (`hit`) i
`depth`. Sve vrijednosti su u procentima scene (2146×701). Scena je uvijek iste
proporcije i centrirana, pa na mobilnom vidimo zumirani srednji dio, a slojevi
ostaju poravnati.

**Nedostaju dva sloja sa originalne slike:** palmine grane (gore desno) i
čempres (desno). Kad se izvezu kao providni PNG-ovi, dodaju se kao još dva
elementa u `LAYERS` — ništa drugo ne treba mijenjati.

### Kako se asseti prave

Izvorni slojevi (5 PNG-ova iz ChatGPT-a) idu u `assets-source/`, pa se pokrene:

```powershell
cd assets-source
powershell -ExecutionPolicy Bypass -File build-assets.ps1
```

Skripta radi tri stvari koje nisu očigledne:

- **Nebo se izrezuje iz `layer-e` sam.** Alpha kanal iz generatora je
  neupotrebljiv (nijedan piksel nije providan). Horizont se nalazi kao najveći
  skok svjetline naniže, a planina po tome što je od svog vrha do horizonta
  neprekidno tamna — oblak nije, jer je ispod oblaka opet svijetlo nebo.
- **Kamen se vadi flood fill-om** iz sva četiri ugla, pa se pokupe i sitne
  bijele tačke unutar lišća.
- **Sve slike imaju tamni artefakt na ivicama** (prvih ~8px), pa se 12px sa
  svake strane odsijeca.

Izlaz su AVIF + WebP u `public/hero/` (ukupno ~440 KB u AVIF-u). AVIF ide prvi,
WebP je fallback kroz `<picture>`.

## Ostalo

- **Font**: `Instrument Serif` (Google Fonts) za naslov — najbliži besplatni
  par editorial serifu sa reference; `Inter` za UI tekst. Oba se self-hostuju
  preko `next/font`, pa nema zahtjeva ka Google-u iz browsera.
- **Logotipi** u donjoj traci su rekonstruisani kao SVG + tekst u jednoj boji.
  Ako zatrebaju pravi fajlovi, zamijeniti komponente u `BrandLogos.tsx`.
- Prekidač jezika su pravi linkovi (`/` i `/en`), bez JS stanja — svaka ruta
  ima tačan `lang` atribut i može se dijeliti.
- Parallax se ne uključuje ako je uključen `prefers-reduced-motion` ili ako
  uređaj nema pravi hover (telefoni).
