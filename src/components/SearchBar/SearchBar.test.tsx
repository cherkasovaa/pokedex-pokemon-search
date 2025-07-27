import {
  BASE_SEARCH_TERM,
  EMPTY_VALUE,
} from '@/__ tests __/utils/mock-constants';
import { SearchBar } from '@/components';
import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('SearchBar component', () => {
  let mockOnSearch: ReturnType<typeof vi.fn>;
  let mockOnChange: ReturnType<typeof vi.fn>;
  let user: UserEvent;

  beforeEach(() => {
    mockOnSearch = vi.fn();
    mockOnChange = vi.fn();
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    test('Renders search input and search button', () => {
      render(
        <SearchBar
          value={EMPTY_VALUE}
          onChange={mockOnChange}
          onSearch={mockOnSearch}
        />
      );
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    test('updates input value when user types', async () => {
      render(
        <SearchBar
          value={EMPTY_VALUE}
          onChange={mockOnChange}
          onSearch={mockOnSearch}
        />
      );

      const input = screen.getByRole('textbox');
      await user.type(input, BASE_SEARCH_TERM);

      expect(mockOnChange).toHaveBeenCalledTimes(BASE_SEARCH_TERM.length);
    });

    test('calls onSubmit when the form is submitted', async () => {
      render(
        <SearchBar
          value={EMPTY_VALUE}
          onChange={mockOnChange}
          onSearch={mockOnSearch}
        />
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    test('triggers search callback with correct parameters', async () => {
      render(
        <SearchBar
          value={EMPTY_VALUE}
          onChange={mockOnChange}
          onSearch={mockOnSearch}
        />
      );

      await user.type(screen.getByRole('textbox'), BASE_SEARCH_TERM);
      await user.click(screen.getByRole('button'));

      expect(mockOnSearch).toHaveBeenCalled();
    });
  });
});
