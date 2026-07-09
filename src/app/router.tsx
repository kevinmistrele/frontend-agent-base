import { createBrowserRouter } from 'react-router-dom';

import { RootErrorRoute } from '@/app/routes/root-error';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <RootErrorRoute />,
    lazy: async () => {
      const { HomeRoute } = await import('@/app/routes/home');
      return { Component: HomeRoute };
    },
  },
]);
