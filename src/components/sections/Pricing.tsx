"use client";

import { useState } from "react";
import type { Copy } from "@/content/copy";
import { Container, Eyebrow, Lead, SectionTitle } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

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

export function Pricing({ t }: { t: Copy }) {
  const p = t.pricing;
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="border-t border-line py-[70px] md:py-[110px]">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{p.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <SectionTitle className="mt-6 max-w-[560px] text-balance">{p.title}</SectionTitle>
            </Reveal>
            <Reveal delay={120}>
              <Lead className="mt-6 max-w-[520px]">{p.body}</Lead>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="flex flex-wrap items-center gap-3">
              <div
                role="group"
                aria-label={p.eyebrow}
                className="flex items-center rounded-full border border-line p-[3px]"
              >
                {[
                  { label: p.monthlyLabel, value: false },
                  { label: p.yearlyLabel, value: true },
                ].map((opt) => {
                  const active = opt.value === yearly;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setYearly(opt.value)}
                      className={[
                        "rounded-full px-[14px] py-[7px] text-[13px] font-medium leading-none transition-colors",
                        active ? "bg-ink text-white" : "text-muted hover:text-ink",
                      ].join(" ")}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <span className="rounded-full bg-ok/10 px-[12px] py-[7px] text-[12.5px] font-medium leading-none text-ok">
                {p.saving}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {p.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80} className="flex h-full">
              <article
                className={[
                  "flex h-full w-full flex-col rounded-[20px] p-6 md:p-7",
                  plan.featured
                    ? "bg-ink text-white"
                    : "border border-line bg-white text-ink",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[15px] font-medium">{plan.name}</h3>
                  {plan.badge ? (
                    <span
                      className={[
                        "rounded-full px-[10px] py-[5px] text-[11px] font-medium leading-none",
                        plan.featured
                          ? "bg-white/12 text-white/80"
                          : "bg-pill text-muted",
                      ].join(" ")}
                    >
                      {plan.badge}
                    </span>
                  ) : null}
                </div>

                <p
                  aria-live="polite"
                  className="font-display mt-6 flex items-baseline gap-2 leading-none"
                >
                  <span className="text-[40px] tracking-[-0.01em] md:text-[46px]">
                    {yearly ? plan.yearly : plan.monthly}
                  </span>
                  {plan.period ? (
                    <span
                      className={[
                        "text-[13px] font-normal tracking-normal",
                        plan.featured ? "text-white/55" : "text-muted",
                      ].join(" ")}
                    >
                      {plan.period}
                    </span>
                  ) : null}
                </p>

                <p
                  className={[
                    "mt-3 text-[14px] leading-[1.5]",
                    plan.featured ? "text-white/65" : "text-muted",
                  ].join(" ")}
                >
                  {plan.note}
                </p>

                <a
                  href="#"
                  className={[
                    "mt-6 flex h-[44px] items-center justify-center rounded-full text-[14.5px] font-medium leading-none transition-colors",
                    plan.featured
                      ? "bg-white text-ink hover:bg-white/90"
                      : "bg-ink text-white hover:bg-ink/90",
                  ].join(" ")}
                >
                  {plan.cta}
                </a>

                <ul
                  className={[
                    "mt-7 space-y-[14px] border-t pt-6",
                    plan.featured ? "border-white/15" : "border-line",
                  ].join(" ")}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-[10px]">
                      <Check
                        className={[
                          "mt-[3px] h-[13px] w-[13px] shrink-0",
                          plan.featured ? "text-white/70" : "text-ok",
                        ].join(" ")}
                      />
                      <span
                        className={[
                          "text-[14px] leading-[1.45]",
                          plan.featured ? "text-white/85" : "text-ink-soft",
                        ].join(" ")}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-[13px] text-muted">{p.footnote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
