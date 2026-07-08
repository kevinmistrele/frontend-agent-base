import en from './en.json';
import { mergeFeatureMessages } from './feature-registry';
import pt from './pt.json';

export const messages = {
  en: { ...en, ...mergeFeatureMessages('en') },
  pt: { ...pt, ...mergeFeatureMessages('pt') },
};

export type SupportedLocale = keyof typeof messages;
