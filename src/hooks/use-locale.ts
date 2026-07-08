import { useContext } from 'react';

import { LocaleContext } from '@/i18n/locale-context';

export function useLocale() {
  return useContext(LocaleContext);
}
