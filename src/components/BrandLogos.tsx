/**
 * Logotipi u donjoj traci.
 *
 * Original koristi zvanicne logotipe (ebay, Cal.com, Ramp, Stripe, GoDaddy,
 * Meta, Inflection, AWS). Ovde su rekonstruisani kao SVG + tekst u jednoj
 * sivoj boji, u istim proporcijama. Ako zatrebaju pravi fajlovi, dovoljno je
 * zamijeniti <svg>/tekst unutar svake komponente.
 */

function EbayMark() {
  return (
    <span className="text-[19px] font-bold leading-none tracking-[-0.045em]">
      ebay
    </span>
  );
}

function CalComMark() {
  return (
    <span className="text-[19px] font-semibold leading-none tracking-[-0.02em]">
      Cal.com
    </span>
  );
}

/** Ramp znak — dva spojena vrha. */
function RampMark() {
  return (
    <svg
      viewBox="0 0 24 20"
      aria-hidden="true"
      focusable="false"
      className="h-[17px] w-[21px]"
      fill="currentColor"
    >
      <path d="M0.6 19.4 8.1 0.6l3.9 9.6L15.9 0.6l7.5 18.8h-5.6l-3.9-9.9-3.9 9.9z" />
    </svg>
  );
}

function StripeMark() {
  return (
    <span className="text-[20px] font-bold leading-none tracking-[-0.045em]">
      stripe
    </span>
  );
}

function GoDaddyMark() {
  return (
    <span className="flex items-center gap-[7px]">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="9.2" />
        <path d="M7.4 13.2c1.4-3.4 4-5 7-3.6" />
      </svg>
      <span className="text-[19px] font-semibold leading-none tracking-[-0.02em]">
        GoDaddy
      </span>
    </span>
  );
}

/** Meta "infinity" znak. */
function MetaMark() {
  return (
    <svg
      viewBox="0 0 32 20"
      aria-hidden="true"
      focusable="false"
      className="h-[19px] w-[30px]"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
    >
      <path d="M16 10c-2.4-4.6-4.5-6.9-7-6.9-3.2 0-5.4 3-5.4 6.9s2.2 6.9 5.4 6.9c3.5 0 5.7-4.3 7-6.9 1.3 2.6 3.5 6.9 7 6.9 3.2 0 5.4-3 5.4-6.9S26.2 3.1 23 3.1c-2.5 0-4.6 2.3-7 6.9z" />
    </svg>
  );
}

function InflectionMark() {
  return (
    <span className="font-display text-[21px] leading-none">Inflection</span>
  );
}

function AwsMark() {
  return (
    <span className="flex flex-col items-center">
      <span className="text-[19px] font-bold leading-[1] tracking-[-0.05em]">
        aws
      </span>
      <svg
        viewBox="0 0 40 10"
        aria-hidden="true"
        focusable="false"
        className="-mt-px h-[7px] w-[30px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.4 3c8.6 4.4 26 4.5 33.4 0.2" />
        <path d="M29.6 1.2 34.6 2.9 30.8 6.4" />
      </svg>
    </span>
  );
}

const BRANDS = [
  { name: "ebay", Mark: EbayMark },
  { name: "Cal.com", Mark: CalComMark },
  { name: "Ramp", Mark: RampMark },
  { name: "stripe", Mark: StripeMark },
  { name: "GoDaddy", Mark: GoDaddyMark },
  { name: "Meta", Mark: MetaMark },
  { name: "Inflection", Mark: InflectionMark },
  { name: "AWS", Mark: AwsMark },
] as const;

export function BrandLogos({ label }: { label: string }) {
  return (
    <section className="border-y border-line px-6 md:px-[60px]">
      <ul
        aria-label={label}
        className="grid grid-cols-4 justify-items-center gap-y-7 py-6 md:flex md:min-h-[68px] md:flex-nowrap md:items-center md:justify-between md:gap-y-0 md:py-0"
      >
        {BRANDS.map(({ name, Mark }) => (
          <li
            key={name}
            className="flex items-center text-brand-grey transition-colors hover:text-ink-soft"
          >
            <Mark />
            <span className="sr-only">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
