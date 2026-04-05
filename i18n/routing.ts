import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = [
  'ja', 'en',
  'zh-CN', 'zh-TW', 'zh-HK',
  'nan',
  'de', 'es', 'fr', 'it', 'pt'
] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'zh-HK': '廣東話',
  nan: '台灣話',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'ja',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
