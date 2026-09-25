import type { ReactNode } from "react";

/** Sadrzajna sirina i bocni ritam, isti kao u hero sekciji. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["mx-auto w-full max-w-[1200px] px-6 md:px-[60px]", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

/** Mala natpisna oznaka iznad naslova sekcije. */
export function Eyebrow({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "on-dark" }) {
  return (
    <p
      className={[
        "text-[11.5px] font-medium uppercase leading-none tracking-[0.16em]",
        tone === "muted" ? "text-faint" : "text-white/55",
      ].join(" ")}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={[
        "font-display text-[30px] leading-[1.07] tracking-[-0.005em] sm:text-[36px] md:text-[42px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={["text-[15.5px] leading-[1.6] text-muted", className].filter(Boolean).join(" ")}>
      {children}
    </p>
  );
}
