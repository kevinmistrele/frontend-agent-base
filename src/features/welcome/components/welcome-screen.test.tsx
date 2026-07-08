import { describe, expect, it } from 'vitest';

import { WelcomeScreen } from '@/features/welcome/components/welcome-screen';
import { render, screen } from '@/testing/test-utils';

describe('WelcomeScreen', () => {
  it('renders the welcome message', async () => {
    render(<WelcomeScreen />);

    expect(await screen.findByRole('heading', { name: 'Frontend Agent Base' })).toBeInTheDocument();
  });
});
