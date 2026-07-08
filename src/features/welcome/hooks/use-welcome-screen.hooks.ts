import { useWelcomeMessage } from '@/features/welcome/api/get-welcome-message';

export function useWelcomeScreen() {
  const welcomeMessageQuery = useWelcomeMessage();

  return {
    isError: welcomeMessageQuery.isError,
    isLoading: welcomeMessageQuery.isLoading,
    message: welcomeMessageQuery.data,
  };
}
