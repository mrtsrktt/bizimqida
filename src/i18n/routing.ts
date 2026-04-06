import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'az', 'en', 'ru'],
  defaultLocale: 'tr',
  localeCookie: true   // Kullanıcının manuel seçimi cookie'ye kaydedilir
});
