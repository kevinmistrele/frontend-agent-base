import { env } from '@/config/env';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown,
  ) {
    super(`Request failed with status ${status}`);
    this.name = 'ApiError';
  }
}

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
    throw new ApiError(response.status, await response.json().catch(() => null));
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.json() as Promise<TResponse>;
}

export const apiClient = {
  get<TResponse>(path: string): Promise<TResponse> {
    return request<TResponse>({ method: 'GET', path });
  },
  post<TResponse>(path: string, body?: unknown): Promise<TResponse> {
    return request<TResponse>({ method: 'POST', path, body: JSON.stringify(body) });
  },
  put<TResponse>(path: string, body?: unknown): Promise<TResponse> {
    return request<TResponse>({ method: 'PUT', path, body: JSON.stringify(body) });
  },
  patch<TResponse>(path: string, body?: unknown): Promise<TResponse> {
    return request<TResponse>({ method: 'PATCH', path, body: JSON.stringify(body) });
  },
  delete<TResponse = void>(path: string): Promise<TResponse> {
    return request<TResponse>({ method: 'DELETE', path });
  },
};
