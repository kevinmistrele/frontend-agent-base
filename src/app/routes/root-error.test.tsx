import { render as rtlRender, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { AppProvider } from '@/app/provider';
import { RootErrorRoute } from '@/app/routes/root-error';

describe('RootErrorRoute', () => {
  it('renders the fallback when a route throws while rendering', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const router = createMemoryRouter([
      {
        path: '/',
        errorElement: <RootErrorRoute />,
        Component: () => {
          throw new Error('render crash');
        },
      },
    ]);

    rtlRender(
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>,
    );

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });
});
