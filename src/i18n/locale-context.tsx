import { createContext } from 'react';

import { SupportedLocale } from '@/i18n';

interface LocaleContextValue {
  currentLocale: SupportedLocale;
  changeLocale: (locale: SupportedLocale) => void;
}

export const LocaleContext = createContext<LocaleContextValue>({
  currentLocale: 'en',
  changeLocale: () => {},
});
