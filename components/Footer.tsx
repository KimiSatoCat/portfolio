import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-kin-gold/10 py-12 mt-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="gold-line max-w-[60px] mx-auto mb-6" />
        <p className="text-body-sm text-washi-white/40">
          {t("copyright", { year: year.toString() })}
        </p>
      </div>
    </footer>
  );
}
