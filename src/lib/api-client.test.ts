import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { env } from '@/config/env';
import { apiClient, ApiError } from '@/lib/api-client';
import { server } from '@/testing/mocks/server';

describe('apiClient', () => {
  it('returns parsed JSON on success', async () => {
    server.use(http.get(`${env.VITE_API_URL}/entities/1`, () => HttpResponse.json({ id: '1' })));

    await expect(apiClient.get('/entities/1')).resolves.toEqual({ id: '1' });
  });

  it('sends the request body as JSON on post', async () => {
    server.use(
      http.post(`${env.VITE_API_URL}/entities`, async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json(body, { status: 201 });
      }),
    );

    await expect(apiClient.post('/entities', { name: 'new' })).resolves.toEqual({ name: 'new' });
  });

  it('throws an ApiError carrying status and response body on failure', async () => {
    server.use(
      http.get(`${env.VITE_API_URL}/entities/missing`, () =>
        HttpResponse.json({ message: 'not found' }, { status: 404 }),
      ),
    );

    const failure = apiClient.get('/entities/missing');

    await expect(failure).rejects.toBeInstanceOf(ApiError);
    await expect(failure).rejects.toMatchObject({
      status: 404,
      body: { message: 'not found' },
    });
  });
});
