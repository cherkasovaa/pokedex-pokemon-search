import {
  CREATOR_NAME,
  PORTFOLIO_WEBSITE_LINK,
} from '@/components/Footer/constants';
import { Footer } from '@/components/Footer/Footer';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Footer', () => {
  test('render year, author name and link to portfolio', () => {
    render(<Footer />);

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', PORTFOLIO_WEBSITE_LINK);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    expect(screen.getByText(CREATOR_NAME)).toBeInTheDocument();

    expect(screen.getByText(/© 2025/i)).toBeInTheDocument();
  });
});
