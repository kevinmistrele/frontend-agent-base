import { welcomeFeatureMessages } from '@/features/welcome/i18n';

interface FeatureMessages {
  name: string;
  messages: Record<'en' | 'pt', Record<string, string>>;
}

// Add one entry per feature that ships its own translations.
const features: FeatureMessages[] = [{ name: 'welcome', messages: welcomeFeatureMessages }];

export function mergeFeatureMessages(locale: 'en' | 'pt'): Record<string, string> {
  return features.reduce<Record<string, string>>((acc, feature) => {
    return { ...acc, ...(feature.messages[locale] ?? {}) };
  }, {});
}
