"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-3xl mx-auto">
        <FadeIn>
          <h1 className="heading-jp text-heading-xl sm:text-[4rem] lg:text-[5rem] text-washi-white tracking-[0.15em] mb-4">
            {t("name")}
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="heading-en text-heading-md sm:text-heading-lg text-washi-white/60 tracking-[0.2em] mb-8">
            {t("nameEn")}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="gold-line max-w-[80px] mx-auto mb-8" />
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="text-body-sm text-washi-white/50 tracking-widest mb-4">
            {t("title")}
          </p>
        </FadeIn>

        <FadeIn delay={0.55}>
          <p className="heading-jp text-heading-md text-kin-gold/80 tracking-[0.3em]">
            {t("catchphrase")}
          </p>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[0.625rem] text-washi-white/30 tracking-[0.3em] uppercase">
          {t("scroll")}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-kin-gold/40 to-transparent" />
      </div>
    </section>
  );
}
