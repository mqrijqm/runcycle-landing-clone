import Link from "next/link";
import {
  LOCALE_LABELS,
  LOCALE_ROUTES,
  type Locale,
} from "@/content/copy";

const ORDER: readonly Locale[] = ["bs", "en"];

/**
 * Prekidac jezika. Radi kao pravi link (server komponenta, bez JS stanja):
 * "/" je bosanski, "/en" je engleski, pa je i URL za dijeljenje tacan
 * i svaka strana ima svoj `lang` atribut.
 */
export function LangToggle({ locale }: { locale: Locale }) {
  return (
    <div
      role="group"
      aria-label={locale === "bs" ? "Jezik" : "Language"}
      className="flex shrink-0 items-center rounded-full border border-line p-[3px]"
    >
      {ORDER.map((id) => {
        const active = id === locale;
        return (
          <Link
            key={id}
            href={LOCALE_ROUTES[id]}
            hrefLang={id}
            aria-current={active ? "true" : undefined}
            className={[
              "rounded-full px-[7px] py-[4px] text-[11px] font-medium leading-none transition-colors md:px-[9px] md:py-[5px] md:text-[12px]",
              active
                ? "bg-ink text-white"
                : "text-muted hover:text-ink",
            ].join(" ")}
          >
            {LOCALE_LABELS[id]}
          </Link>
        );
      })}
    </div>
  );
}
