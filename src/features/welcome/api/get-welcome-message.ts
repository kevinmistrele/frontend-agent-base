import { useQuery } from '@tanstack/react-query';

import { WelcomeMessage } from '@/features/welcome/types/welcome.types';

function getWelcomeMessage(): Promise<WelcomeMessage> {
  return Promise.resolve({
    title: 'Frontend Agent Base',
    description: 'A scalable React starter with architecture and agent rules built in.',
  });
}

export function useWelcomeMessage() {
  return useQuery({
    queryKey: ['welcome-message'],
    queryFn: getWelcomeMessage,
  });
}
