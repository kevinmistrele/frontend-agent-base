import { Button } from '@/components/ui/button';
import { useTranslate } from '@/hooks/use-translate';

export function RootErrorRoute() {
  const { t } = useTranslate();

  return (
    <main role="alert">
      <h1>{t('app.error.title')}</h1>
      <p>{t('app.error.description')}</p>
      <Button onClick={() => window.location.reload()}>{t('common.retry')}</Button>
    </main>
  );
}
