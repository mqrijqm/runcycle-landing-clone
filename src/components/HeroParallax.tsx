"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Box = {
  left: string;
  top: string;
  width: string;
  height: string;
};

type Layer = {
  id: string;
  /** ime fajla u /public/hero (bez ekstenzije) */
  file: string;
  /** slika popunjava cijeli okvir scene (object-cover) */
  cover?: boolean;
  /** okvir slike, u procentima scene */
  img: Box;
  /** povrsina koja hvata hover, u procentima scene */
  hit: Box;
  /** 0 = najdalje od kamere, 1 = najblize */
  depth: number;
  z: number;
  /** da li sloj dobija sjenu kad se podigne (samo slojevi sa providnoscu) */
  lift?: boolean;
};

/** Scena je ista proporcija kao originalna slika: 2146x701. */
const SCENE_ASPECT = "2146 / 701";

/** Maksimalni pomak najblizeg sloja pri pomicanju misa, u px. */
const MAX_SHIFT = 34;

const LAYERS: readonly Layer[] = [
  {
    id: "sky",
    file: "sky",
    cover: true,
    img: { left: "0%", top: "0%", width: "100%", height: "100%" },
    // nebo hvata hover samo iznad horizonta, da bi i ono bilo "opipljivo"
    hit: { left: "0%", top: "0%", width: "100%", height: "56%" },
    depth: 0.15,
    z: 1,
  },
  {
    id: "sea",
    file: "sea",
    cover: true,
    img: { left: "0%", top: "0%", width: "100%", height: "100%" },
    hit: { left: "0%", top: "50%", width: "100%", height: "50%" },
    depth: 0.35,
    z: 2,
  },
  {
    id: "stone",
    file: "stone",
    img: { left: "0%", top: "0%", width: "26.04%", height: "100%" },
    hit: { left: "0%", top: "0%", width: "26.04%", height: "100%" },
    depth: 0.7,
    z: 3,
    lift: true,
  },
  {
    id: "statue",
    file: "statue",
    img: { left: "27%", top: "4%", width: "19.21%", height: "95%" },
    hit: { left: "25%", top: "2%", width: "23%", height: "98%" },
    depth: 1,
    z: 4,
    lift: true,
  },
];

export function HeroParallax({ alt }: { alt: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hoverRef = useRef<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const rect = scene.getBoundingClientRect();
      target.x = (event.clientX - rect.left) / rect.width - 0.5;
      target.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.075;
      pos.y += (target.y - pos.y) * 0.075;

      for (const layer of LAYERS) {
        const el = imgRefs.current[layer.id];
        if (!el) continue;
        const boost = hoverRef.current === layer.id ? 1.9 : 1;
        const shift = layer.depth * boost * MAX_SHIFT;
        el.style.transform = `translate3d(${(-pos.x * shift).toFixed(2)}px, ${(-pos.y * shift * 0.55).toFixed(2)}px, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const setHover = (id: string | null) => {
    hoverRef.current = id;
    setHovered(id);
  };

  return (
    <div
      ref={sceneRef}
      role="img"
      aria-label={alt}
      className="relative aspect-[4/3] w-full overflow-hidden bg-[#9fbcd6] md:aspect-[2146/701]"
    >
      {/*
        Scena je uvijek u istoj proporciji i centrirana. Na mobilnom je okvir
        scene znatno siri od ekrana, pa se vidi samo srednji dio (zum na
        statuu), a svi slojevi ostaju poravnati jedan sa drugim.
      */}
      <div
        className="absolute left-[78%] top-1/2 aspect-[2146/701] h-full w-auto -translate-x-1/2 -translate-y-1/2 scale-[1.06] md:left-1/2"
        style={{ aspectRatio: SCENE_ASPECT }}
      >
        {LAYERS.map((layer) => {
          const active = hovered === layer.id;
          return (
            <div
              key={layer.id}
              className="absolute inset-0"
              style={{ zIndex: layer.z }}
            >
              <div
                ref={(el) => {
                  imgRefs.current[layer.id] = el;
                }}
                className="absolute will-change-transform"
                style={layer.img as CSSProperties}
              >
                <picture>
                  <source srcSet={`/hero/${layer.file}.avif`} type="image/avif" />
                  <img
                    src={`/hero/${layer.file}.webp`}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className={[
                      "h-full w-full select-none transition-[transform,filter] duration-500 ease-out",
                      layer.cover ? "object-cover" : "object-contain",
                      active ? "scale-[1.035]" : "",
                      active && layer.lift
                        ? "drop-shadow-[0_18px_30px_rgba(18,30,42,0.30)]"
                        : "",
                    ].join(" ")}
                  />
                </picture>
              </div>

              {/* Fiksna povrsina za hover — ne pomjera se sa paralaksom,
                  pa nema treperenja kad se sloj priblizi kursoru. */}
              <div
                className="absolute"
                style={layer.hit as CSSProperties}
                onPointerEnter={() => setHover(layer.id)}
                onPointerLeave={() => setHover(null)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
