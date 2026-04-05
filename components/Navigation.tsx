"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { useParams } from "next/navigation";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/research", key: "research" },
  { href: "/works", key: "works" },
  { href: "/services", key: "services" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params.locale as Locale) || "ja";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleLocaleChange = (locale: Locale) => {
    router.replace(pathname, { locale });
    setLangOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sumi-black/80 backdrop-blur-md border-b border-kin-gold/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif-jp text-lg text-washi-white tracking-widest">
            佐藤公宜
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`text-body-sm transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-kin-gold"
                    : "text-washi-white/70 hover:text-washi-white"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}

            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-body-sm text-washi-white/70 hover:text-washi-white transition-colors"
              >
                {localeNames[currentLocale]}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-mist-gray border border-kin-gold/20 rounded-sm py-1 min-w-[140px]">
                  {locales.map((locale) => (
                    <button
                      key={locale}
                      onClick={() => handleLocaleChange(locale)}
                      className={`block w-full text-left px-4 py-2 text-body-sm transition-colors ${
                        locale === currentLocale
                          ? "text-kin-gold"
                          : "text-washi-white/70 hover:text-washi-white hover:bg-sumi-black/30"
                      }`}
                    >
                      {localeNames[locale]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-washi-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-sumi-black/95 border-t border-kin-gold/10">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-body py-2 ${
                  pathname === item.href
                    ? "text-kin-gold"
                    : "text-washi-white/70"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-3 border-t border-kin-gold/10">
              <div className="flex flex-wrap gap-2">
                {locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => {
                      handleLocaleChange(locale);
                      setMobileOpen(false);
                    }}
                    className={`text-body-sm px-3 py-1 rounded-sm ${
                      locale === currentLocale
                        ? "bg-kin-gold/20 text-kin-gold"
                        : "text-washi-white/50"
                    }`}
                  >
                    {localeNames[locale]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
