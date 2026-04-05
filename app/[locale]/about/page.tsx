import Image from "next/image";
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

      {/* Profile photo */}
      <FadeIn>
        <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-16 relative rounded-sm overflow-hidden border border-kin-gold/20">
          <Image
            src="/photos/profile.jpg"
            alt="佐藤公宜"
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 192px, 224px"
            priority
          />
          {/* Washi texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sumi-black/30 mix-blend-multiply" />
        </div>
      </FadeIn>

      {/* Waseda photo */}
      <FadeIn>
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-sm overflow-hidden mb-16 border border-kin-gold/10">
          <Image
            src="/photos/waseda.jpg"
            alt="Waseda University"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-sumi-black/40" />
        </div>
      </FadeIn>

      {/* Timeline */}
      <section>
        <Timeline />
      </section>
    </div>
  );
}
