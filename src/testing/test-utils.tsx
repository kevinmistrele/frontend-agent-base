import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { AppProvider } from '@/app/provider';

function AllProviders(props: PropsWithChildren) {
  return (
    <AppProvider>
      <MemoryRouter>{props.children}</MemoryRouter>
    </AppProvider>
  );
}

function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react';
export { render };
