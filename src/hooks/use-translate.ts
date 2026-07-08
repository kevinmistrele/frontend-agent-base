import { useIntl } from 'react-intl';

export function useTranslate() {
  const { formatMessage } = useIntl();

  function t(id: string, values?: Record<string, string | number>) {
    const message = formatMessage({ id }, values);
    return message?.length ? message : id;
  }

  return { t };
}
