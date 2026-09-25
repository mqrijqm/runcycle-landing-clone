"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Copy } from "@/content/copy";
import { Container, Eyebrow, SectionTitle } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/**
 * Kartice nisu poravnate u jedan red: svaka ima svoj vertikalni pomak i blagi
 * nagib, i polako "diše" gore-dolje. Na hover se ispravi i naginje ka kursoru.
 *
 * Redoslijed odgovara fajlovima u /public/cards.
 */
const FILES = ["always", "remember", "quiet"] as const;

/** vertikalni pomak i nagib po kartici (samo na velikim ekranima) */
const OFFSETS = [0, 54, 22];
const TILTS = [-2.2, 1.8, -1.3];
/** razlicito kasnjenje "disanja", da ne idu sve u isto vrijeme */
const DELAYS = [0, 1200, 2400];

export function FloatingCards({ t }: { t: Copy }) {
  const c = t.cards;
  const cards = useRef<Array<HTMLDivElement | null>>([]);
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current =
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const onMove = (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled.current) return;
    const el = cards.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = [
      "perspective(1000px)",
      `rotateY(${(x * 10).toFixed(2)}deg)`,
      `rotateX(${(-y * 10).toFixed(2)}deg)`,
      "translateY(-12px)",
      "scale(1.035)",
    ].join(" ");
  };

  const onLeave = (index: number) => () => {
    const el = cards.current[index];
    if (el) el.style.transform = "";
  };

  return (
    <section className="border-t border-line py-[70px] md:py-[110px]">
      <Container>
        <div className="mx-auto max-w-[620px] text-center">
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <SectionTitle className="mt-6 text-balance">{c.title}</SectionTitle>
          </Reveal>
        </div>

        {/*
          Grid je 1 / 2 / 3 kolone. Pomaci i nagibi se ukljucuju tek na lg
          (vidi .float-card u globals.css), pa na manjim ekranima ostaje uredna
          mreza bez "lebdenja".
        */}
        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {c.items.map((item, i) => (
            <li
              key={item.title}
              className="float-card"
              style={
                {
                  "--offset": `${OFFSETS[i]}px`,
                  "--tilt": `${TILTS[i]}deg`,
                  "--delay": `${DELAYS[i]}ms`,
                } as CSSProperties
              }
            >
              <Reveal delay={i * 90}>
                <div
                  ref={(el) => {
                    cards.current[i] = el;
                  }}
                  onPointerMove={onMove(i)}
                  onPointerLeave={onLeave(i)}
                  className="float-tilt rounded-[24px] border border-line bg-white p-[18px] shadow-[0_30px_60px_-45px_rgba(19,19,19,0.40)] hover:shadow-[0_50px_85px_-45px_rgba(19,19,19,0.45)]"
                >
                  <picture>
                    <source srcSet={`/cards/${FILES[i]}.avif`} type="image/avif" />
                    <img
                      src={`/cards/${FILES[i]}.webp`}
                      alt={item.alt}
                      width={700}
                      height={639}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="block w-full select-none rounded-[14px]"
                    />
                  </picture>
                  <h3 className="font-display mt-6 px-1 text-[24px] leading-[1.1] tracking-[-0.005em] md:text-[26px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 min-h-[44px] px-1 pb-1 text-[14.5px] leading-[1.5] text-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
