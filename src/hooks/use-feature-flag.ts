import { featureFlags, FeatureFlag } from '@/config/feature-flags';

export function useFeatureFlag(flag: FeatureFlag): boolean {
  return featureFlags[flag];
}
