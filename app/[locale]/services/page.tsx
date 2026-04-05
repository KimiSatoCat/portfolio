import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-30">
      <FadeIn>
        <h1 className="heading-jp text-heading-xl text-washi-white mb-4">
          {t("heading")}
        </h1>
        <div className="gold-line max-w-[60px] mb-16" />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <ServiceCard
          title={t("research.title")}
          description={t("research.description")}
          detail={t("research.format")}
          cta={t("research.cta")}
          ctaHref="/contact"
          delay={0}
        />
        <ServiceCard
          title={t("development.title")}
          description={t("development.description")}
          detail={t("development.pricing")}
          cta={t("development.cta")}
          ctaHref="/contact"
          delay={0.1}
        />
        <ServiceCard
          title={t("note.title")}
          description={t("note.description")}
          detail={t("note.sponsor")}
          cta={t("note.cta")}
          externalHref="https://note.com/fancy_quince8671"
          delay={0.2}
        />
      </div>
    </div>
  );
}
