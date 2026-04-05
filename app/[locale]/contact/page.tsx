import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-30">
      <FadeIn>
        <h1 className="heading-jp text-heading-xl text-washi-white mb-4">
          {t("heading")}
        </h1>
        <div className="gold-line max-w-[60px] mb-8" />
        <p className="text-body text-washi-white/60 mb-12">
          {t("description")}
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mb-16">
          <ContactForm />
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="card-washi p-6 sm:p-8 space-y-4">
          <div>
            <span className="text-body-sm text-washi-white/40 block mb-1">Email</span>
            <a
              href="mailto:kiminobu.sato@fuji.waseda.jp"
              className="text-body text-kin-gold hover:text-kin-gold/70 transition-colors"
            >
              kiminobu.sato@fuji.waseda.jp
            </a>
          </div>
          <div>
            <span className="text-body-sm text-washi-white/40 block mb-1">Instagram</span>
            <a
              href="https://www.instagram.com/kiminobusato33/?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body text-kin-gold hover:text-kin-gold/70 transition-colors"
            >
              @kiminobusato33
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
