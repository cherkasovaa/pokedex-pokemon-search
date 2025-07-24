import { Loader } from '@/components';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Loader component', () => {
  test('renders spinner', () => {
    render(<Loader />);

    const spinner = screen.getByText('', { selector: 'div.animate-spin' });

    expect(spinner).toBeInTheDocument();
  });
});
