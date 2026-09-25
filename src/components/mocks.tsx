import type { Copy } from "@/content/copy";

/* ---------------------------------------------------------------------------
   Mali UI paneli koji ilustruju proizvod. Nisu slike — pravi su HTML/CSS, pa
   se skaliraju, prevode i ostaju ostri na svakom ekranu.
   Svaki je jedan role="img" sa opisom, da citac ekrana ne cita gomilu brojeva.
--------------------------------------------------------------------------- */

function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5 6.2 11.8 13 4.8" />
    </svg>
  );
}

function PhoneGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.2 2.8h3l1.2 3-1.7 1.3a9.4 9.4 0 0 0 4.2 4.2l1.3-1.7 3 1.2v3c0 .9-.7 1.6-1.6 1.5C8.4 14.8 4.2 10.6 3.7 4.4c-.1-.9.6-1.6 1.5-1.6z" />
    </svg>
  );
}

/* --- Panel: poziv u toku -------------------------------------------------- */

const WAVE = [
  0.3, 0.5, 0.8, 1, 0.7, 0.4, 0.6, 0.9, 1, 0.6, 0.35, 0.55, 0.85, 1, 0.65, 0.4,
  0.3, 0.55, 0.75, 0.95, 0.7, 0.45, 0.3,
];

export function CallMock({ ui }: { ui: Copy["how"]["ui"] }) {
  return (
    <div
      role="img"
      aria-label={ui.alt}
      className="w-full rounded-[20px] border border-line bg-white p-5 shadow-[0_24px_60px_-40px_rgba(19,19,19,0.35)] md:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
          <span
            className="h-[7px] w-[7px] rounded-full bg-ok"
            style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
          />
          {ui.live}
        </span>
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-pill text-ink-soft">
          <PhoneGlyph className="h-[15px] w-[15px]" />
        </span>
      </div>

      <div className="mt-4 flex h-[46px] items-center gap-[3px] overflow-hidden">
        {WAVE.map((v, i) => (
          <span
            key={i}
            className="h-full flex-1 origin-center rounded-full bg-sea/25"
            style={{
              transform: `scaleY(${v})`,
              animation: `wave ${1.1 + (i % 5) * 0.16}s ease-in-out ${i * 0.06}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="mt-5 space-y-3 border-t border-line pt-5">
        <div>
          <p className="text-[11.5px] font-medium uppercase leading-none tracking-[0.14em] text-faint">
            {ui.caller}
          </p>
          <p className="mt-2 max-w-[430px] rounded-2xl rounded-tl-sm bg-surface px-4 py-3 text-[14px] leading-[1.5] text-ink-soft">
            {ui.turns[0]}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[11.5px] font-medium uppercase leading-none tracking-[0.14em] text-faint">
            {ui.agent}
          </p>
          <p className="mt-2 max-w-[430px] rounded-2xl rounded-tr-sm bg-ink px-4 py-3 text-[14px] leading-[1.5] text-white">
            {ui.turns[1]}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-ok/8 px-4 py-3">
        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-ok text-white">
          <Check className="h-[12px] w-[12px]" />
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] font-medium leading-tight text-ink">
            {ui.bookedLabel}
          </span>
          <span className="block text-[13px] leading-tight text-muted">
            {ui.bookedValue}
          </span>
        </span>
      </div>
    </div>
  );
}

/* --- Panel: kontakt u CRM-u ---------------------------------------------- */

export function ContactMock({ ui }: { ui: Copy["features"]["ui"] }) {
  return (
    <div
      role="img"
      aria-label={ui.alt}
      className="w-full rounded-[20px] border border-line bg-white p-5 shadow-[0_24px_60px_-40px_rgba(19,19,19,0.35)] md:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-sand/40 text-[13px] font-medium text-ink-soft">
          AH
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] font-medium leading-tight text-ink">
            Amina Halilović
          </span>
          <span className="block text-[13px] leading-tight text-muted">
            Kestrel · Head of Sales
          </span>
        </span>
      </div>

      <dl className="mt-5 divide-y divide-line border-t border-line">
        {ui.fields.map((f) => (
          <div key={f.label} className="flex items-baseline justify-between gap-6 py-3">
            <dt className="text-[13px] text-muted">{f.label}</dt>
            <dd className="text-[14px] font-medium text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-5">
        <span className="flex items-center gap-2 text-[13px] font-medium text-ok">
          <Check className="h-[13px] w-[13px]" />
          {ui.status}
        </span>
        <span className="flex h-[34px] items-center rounded-full bg-ink px-4 text-[13px] font-medium leading-none text-white">
          {ui.action}
        </span>
      </div>
    </div>
  );
}

/* --- Panel: rezultati ---------------------------------------------------- */

const BARS = [7, 11, 9, 15, 13, 5, 3];

export function ResultsMock({ ui }: { ui: Copy["results"]["ui"] }) {
  const max = Math.max(...BARS);
  return (
    <div
      role="img"
      aria-label={ui.alt}
      className="w-full rounded-[20px] border border-line bg-white p-5 shadow-[0_24px_60px_-40px_rgba(19,19,19,0.35)] md:p-7"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[15px] font-medium text-ink">{ui.title}</p>
        <p className="rounded-full border border-line px-3 py-1 text-[12px] leading-none text-muted">
          {ui.range}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4 border-y border-line py-4">
        {ui.kpis.map((k) => (
          <div key={k.label}>
            <p className="font-display text-[26px] leading-none text-ink md:text-[30px]">
              {k.value}
            </p>
            <p className="mt-2 text-[12.5px] leading-tight text-muted">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-[12.5px] text-muted">{ui.chartTitle}</p>
        <div className="mt-3 flex h-[110px] items-end gap-2">
          {BARS.map((v, i) => (
            <div key={ui.days[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span
                className="w-full rounded-t-[4px] bg-sea"
                style={{ height: `${(v / max) * 100}%`, opacity: 0.55 + (v / max) * 0.45 }}
              />
              <span className="text-[10.5px] leading-none text-faint">{ui.days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <p className="text-[12.5px] text-muted">{ui.listTitle}</p>
        <ul className="mt-3 space-y-[10px]">
          {ui.rows.map((r) => (
            <li key={r.time} className="flex items-center justify-between gap-4">
              <span className="text-[13.5px] text-muted">{r.time}</span>
              <span className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
                <span
                  className={[
                    "h-[6px] w-[6px] rounded-full",
                    r.kind === "ok" ? "bg-ok" : "bg-sand",
                  ].join(" ")}
                />
                {r.outcome}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
