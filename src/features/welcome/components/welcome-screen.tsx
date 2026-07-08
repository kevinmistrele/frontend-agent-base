import { Button } from '@/components/ui/button';
import { useWelcomeScreen } from '@/features/welcome/hooks/use-welcome-screen.hooks';
import { useTranslate } from '@/hooks/use-translate';

export function WelcomeScreen() {
  const { isError, isLoading, message } = useWelcomeScreen();
  const { t } = useTranslate();

  if (isLoading) {
    return <main aria-busy="true">{t('welcome.loading')}</main>;
  }

  if (isError || !message) {
    return <main role="alert">{t('welcome.error')}</main>;
  }

  return (
    <main>
      <section>
        <h1>{message.title}</h1>
        <p>{message.description}</p>
        <Button onClick={() => window.location.reload()}>{t('welcome.reload')}</Button>
      </section>
    </main>
  );
}
