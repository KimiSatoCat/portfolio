import { useTranslations } from "next-intl";
import Timeline from "@/components/Timeline";
import FadeIn from "@/components/FadeIn";
import PhotoSlot from "@/components/PhotoSlot";

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

      {/* Profile photo slot */}
      <FadeIn>
        <PhotoSlot
          slotId="about-profile"
          className="w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-16 rounded-sm"
          alt="佐藤公宜"
        />
      </FadeIn>

      {/* Banner photo slot */}
      <FadeIn>
        <PhotoSlot
          slotId="about-banner"
          className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-sm mb-16"
          alt="Banner"
          overlay
        />
      </FadeIn>

      {/* Timeline */}
      <section>
        <Timeline />
      </section>
    </div>
  );
}
