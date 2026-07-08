import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { messages, SupportedLocale } from '@/i18n';
import { LocaleContext } from '@/i18n/locale-context';

const LOCALE_STORAGE_KEY = 'locale';
const DEFAULT_LOCALE: SupportedLocale = 'en';

function isSupportedLocale(value: string | null): value is SupportedLocale {
  return value !== null && value in messages;
}

function detectInitialLocale(): SupportedLocale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const queryLocale = new URLSearchParams(window.location.search).get('locale');
  if (isSupportedLocale(queryLocale)) {
    return queryLocale;
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (isSupportedLocale(storedLocale)) {
    return storedLocale;
  }

  const browserLocale = window.navigator.language?.split('-')[0] ?? null;
  if (isSupportedLocale(browserLocale)) {
    return browserLocale;
  }

  return DEFAULT_LOCALE;
}

export function LocaleProvider(props: PropsWithChildren) {
  const [locale, setLocale] = useState<SupportedLocale>(detectInitialLocale);

  const changeLocale = useCallback((nextLocale: SupportedLocale) => {
    setLocale(nextLocale);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const contextValue = useMemo(
    () => ({ currentLocale: locale, changeLocale }),
    [locale, changeLocale],
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      <IntlProvider locale={locale} defaultLocale={DEFAULT_LOCALE} messages={messages[locale]}>
        {props.children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
