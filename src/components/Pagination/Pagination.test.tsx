import { Pagination } from '@/components/Pagination/Pagination';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    pageLimit: 3,
    onPageChange: vi.fn(),
  };

  test('renders the correct page numbers and navigation buttons', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Page №1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page №3' })).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Previous page' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next page' })
    ).toBeInTheDocument();
  });

  test('disable state of the prev button on the first page', () => {
    render(<Pagination {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: 'Previous page' })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Next page' })
    ).not.toBeDisabled();
  });

  test('disable state of the next button on the last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Previous page' })
    ).not.toBeDisabled();
  });

  test('disable state of the current page button', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Page №1' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Page №3' })).not.toBeDisabled();
  });

  test('calls onPageChange with the correct page number on click', async () => {
    const user = userEvent.setup();

    render(<Pagination {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: 'Page №2' }));

    expect(defaultProps.onPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });
});
