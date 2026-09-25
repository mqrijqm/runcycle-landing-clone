import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `sharp` nije instaliran, pa iskljucujemo optimizaciju slika da /public
  // radi i u dev-u i u produkciji bez dodatne zavisnosti.
  images: {
    unoptimized: true,
  },
  // Bez "N" indikatora u dnu ekrana — smeta pri snimanju ekrana.
  devIndicators: false,
  // Dozvoli pristup preko 127.0.0.1 u dev-u (Chrome headless i slicno),
  // da Next ne prijavljuje "Blocked cross-origin request".
  allowedDevOrigins: ["127.0.0.1"],
  // Ovaj folder je samostalan projekat; bez ovoga Turbopack vidi
  // pnpm-workspace.yaml u parent folderu i upozorava pri svakom startu.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
