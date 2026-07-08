import { env } from '@/config/env';

interface ApiRequestOptions extends RequestInit {
  path: string;
}

async function request<TResponse>(options: ApiRequestOptions): Promise<TResponse> {
  const { path, headers, ...requestInit } = options;
  const response = await fetch(`${env.VITE_API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...requestInit,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}

export const apiClient = {
  get<TResponse>(path: string): Promise<TResponse> {
    return request<TResponse>({ method: 'GET', path });
  },
};
