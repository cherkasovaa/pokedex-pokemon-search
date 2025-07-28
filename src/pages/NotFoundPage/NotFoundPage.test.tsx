import {
  BUTTON_HOME_BACK,
  PAGE_TITLE,
} from '@/pages/NotFoundPage/constants/constants';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@lottiefiles/dotlottie-react', () => ({
  DotLottieReact: () => <div data-testid="lottie-animation" />,
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
  });

  test('renders a header tag', () => {
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent(PAGE_TITLE);
  });

  test('should render a link to the home page', () => {
    const link = screen.getByRole('link', { name: BUTTON_HOME_BACK });

    expect(link).toBeInTheDocument();
  });

  test('renders lottie animation', () => {
    expect(screen.getByTestId('lottie-animation')).toBeInTheDocument();
  });
});
