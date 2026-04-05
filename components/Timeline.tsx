"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

const timelineKeys = ["coastGuard", "wasedaUndergrad", "wasedaGrad"] as const;

export default function Timeline() {
  const t = useTranslations("about.timeline");

  return (
    <div className="relative pl-8 sm:pl-12">
      {/* Vertical gold line */}
      <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-kin-gold/20" />

      <div className="space-y-12 sm:space-y-16">
        {timelineKeys.map((key, i) => (
          <FadeIn key={key} delay={i * 0.15}>
            <div className="relative">
              {/* Dot on line */}
              <div className="absolute -left-[1.35rem] sm:-left-[1.85rem] top-1.5 w-2.5 h-2.5 rounded-full bg-kin-gold/60 ring-4 ring-sumi-black" />

              <h3 className="heading-jp text-heading-md text-kin-gold mb-3">
                {t(`${key}.period`)}
              </h3>
              <p className="text-body text-washi-white/70 leading-relaxed">
                {t(`${key}.description`)}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
