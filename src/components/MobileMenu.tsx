"use client";

import { useEffect, useState } from "react";
import type { Copy } from "@/content/copy";

/**
 * Navigacija na telefonu. Bez ovoga na malom ekranu nema nikakvog nacina da se
 * predje na drugu sekciju.
 *
 * Zakljucava skrol dok je otvoren, zatvara se na Escape i na klik na link.
 */
export function MobileMenu({ t }: { t: Copy }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t.menu.close : t.menu.open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-pill md:h-[40px] md:w-[40px]"
      >
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          className="h-[15px] w-[15px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
        >
          {open ? (
            <path d="M5 5 15 15M15 5 5 15" />
          ) : (
            <path d="M3 6.5h14M3 13.5h14" />
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="menu-in absolute left-0 right-0 top-full z-50 flex h-[calc(100dvh-74px)] flex-col border-t border-line bg-white px-6 pb-8 pt-5 shadow-[0_30px_60px_-30px_rgba(19,19,19,0.25)]"
        >
          <nav aria-label={t.menu.label}>
            <ul>
              {t.nav.map((item) => (
                <li key={item.label} className="border-b border-line">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-[17px] text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-10">
            <a
              href="#"
              className="flex h-[50px] w-full items-center justify-center rounded-full bg-ink text-[15px] font-medium leading-none text-white"
            >
              {t.headerCta}
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
