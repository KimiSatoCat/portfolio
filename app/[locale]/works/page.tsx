import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import WorkCard from "@/components/WorkCard";

const worksData = [
  {
    key: "hitoiro",
    url: "https://hitoiro.vercel.app",
  },
  {
    key: "bwm",
    github: "https://github.com/KimiSatoCat/Better-Waseda-Moodle-Kai",
  },
  {
    key: "soxai",
  },
  {
    key: "workguard",
  },
  {
    key: "idoki",
  },
] as const;

export default function WorksPage() {
  const t = useTranslations("works");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-30">
      <FadeIn>
        <h1 className="heading-jp text-heading-xl text-washi-white mb-4">
          {t("heading")}
        </h1>
        <div className="gold-line max-w-[60px] mb-16" />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {worksData.map((work, i) => (
          <WorkCard
            key={work.key}
            title={t(`items.${work.key}.title`)}
            description={t(`items.${work.key}.description`)}
            stack={t(`items.${work.key}.stack`)}
            url={"url" in work ? work.url : undefined}
            github={"github" in work ? work.github : undefined}
            delay={i * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
