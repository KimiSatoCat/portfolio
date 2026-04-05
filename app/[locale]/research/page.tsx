import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { Link } from "@/i18n/routing";

export default function ResearchPage() {
  const t = useTranslations("research");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-30">
      <FadeIn>
        <h1 className="heading-jp text-heading-xl text-washi-white mb-4">
          {t("heading")}
        </h1>
        <div className="gold-line max-w-[60px] mb-16" />
      </FadeIn>

      {/* Section 1: Driving */}
      <FadeIn>
        <section className="mb-20 sm:mb-30">
          <h2 className="heading-jp text-heading-lg text-kin-gold mb-6">
            {t("driving.title")}
          </h2>
          <p className="text-body-lg text-washi-white/70 leading-[2] mb-8">
            {t("driving.description")}
          </p>
          <div className="flex flex-wrap gap-3">
            {(["HCI", "Human-like Driving", "Autonomous Vehicles", "Cognitive Science"] as const).map(
              (keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 text-body-sm text-kin-gold/70 border border-kin-gold/20 rounded-sm"
                >
                  {keyword}
                </span>
              )
            )}
          </div>
        </section>
      </FadeIn>

      <div className="gold-line mb-20 sm:mb-30" />

      {/* Section 2: Humanities */}
      <FadeIn>
        <section className="mb-20 sm:mb-30">
          <h2 className="heading-jp text-heading-lg text-kin-gold mb-6">
            {t("humanities.title")}
          </h2>
          <p className="text-body-lg text-washi-white/70 leading-[2]">
            {t("humanities.description")}
          </p>
        </section>
      </FadeIn>

      <div className="gold-line mb-20 sm:mb-30" />

      {/* Section 3: Health */}
      <FadeIn>
        <section>
          <h2 className="heading-jp text-heading-lg text-kin-gold mb-6">
            {t("health.title")}
          </h2>
          <p className="text-body-lg text-washi-white/70 leading-[2] mb-8">
            {t("health.description")}
          </p>
          <Link href="/contact" className="btn-beni inline-block">
            {t("health.cta")}
          </Link>
        </section>
      </FadeIn>
    </div>
  );
}
