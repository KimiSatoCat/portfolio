import { useTranslations } from "next-intl";
import Timeline from "@/components/Timeline";
import FadeIn from "@/components/FadeIn";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-30">
      <FadeIn>
        <h1 className="heading-jp text-heading-xl text-washi-white mb-4">
          {t("heading")}
        </h1>
        <div className="gold-line max-w-[60px] mb-16" />
      </FadeIn>

      {/* Profile photo placeholder */}
      <FadeIn>
        <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-16 rounded-sm bg-mist-gray/30 border border-kin-gold/20 flex items-center justify-center">
          <span className="text-washi-white/20 text-body-sm">Photo</span>
        </div>
      </FadeIn>

      {/* Timeline */}
      <section>
        <Timeline />
      </section>
    </div>
  );
}
