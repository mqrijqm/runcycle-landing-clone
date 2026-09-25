"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Blagi ulazak sadrzaja kad udje u vidno polje.
 *
 * Namjerno NEMA sakrivanja preko CSS-a unaprijed i nema inline skripte:
 * element se sakrije tek poslije hidratacije, i to samo ako je van ekrana.
 * Zato:
 *  - nema "flash"-a vidljivog sadrzaja,
 *  - bez JS-a nista ne ostaje nevidljivo,
 *  - nema hydration upozorenja (klasa se ne dodaje na <html>).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** kasnjenje u ms, za stepenasto pojavljivanje */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Ako je element ispod prevojne linije, tek tada ga sakrijemo — promjena je
    // van ekrana, pa je korisnik ne vidi.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setHidden(true);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHidden(false);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={["reveal", hidden ? "reveal-hidden" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
