import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { HomeRoute } = await import('@/app/routes/home');
      return { Component: HomeRoute };
    },
  },
]);
