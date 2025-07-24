import {
  BASE_SEARCH_TERM,
  EMPTY_VALUE,
  SAVED_TERM,
} from '@/__ tests __/utils/mock-constants';
import { SearchBar } from '@/components';
import { storage } from '@/services/Storage';
import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/services/Storage');

describe('SearchBar component', () => {
  let mockOnSearch: ReturnType<typeof vi.fn>;
  let user: UserEvent;

  beforeEach(() => {
    mockOnSearch = vi.fn();
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    describe('Renders search input and search button', () => {
      test('renders search input', () => {
        render(<SearchBar onSearch={mockOnSearch} />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      test('renders search button', () => {
        render(<SearchBar onSearch={mockOnSearch} />);

        expect(screen.getByRole('button')).toBeInTheDocument();
      });

      test('does not throw if onSearch is not provided', async () => {
        render(<SearchBar />);

        const input = screen.getByRole('textbox');

        await user.type(input, BASE_SEARCH_TERM);
        await user.click(screen.getByRole('button'));

        expect(input).toHaveValue(BASE_SEARCH_TERM);
      });
    });

    test('shows empty input when no saved term exists', () => {
      vi.mocked(storage.getSearchTerm).mockReturnValue(null);

      render(<SearchBar onSearch={mockOnSearch} />);

      expect(screen.getByRole('textbox')).toHaveValue(EMPTY_VALUE);
      expect(mockOnSearch).not.toHaveBeenCalled();
    });
  });

  describe('User Interaction Tests', () => {
    test('updates input value when user types', async () => {
      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');

      await user.type(input, BASE_SEARCH_TERM);

      expect(input).toHaveValue(BASE_SEARCH_TERM);
    });

    test('trims whitespace from search input before saving', async () => {
      const initialValue = '   Ditto ';

      render(<SearchBar onSearch={mockOnSearch} />);

      await user.type(screen.getByRole('textbox'), initialValue);
      await user.click(screen.getByRole('button'));

      expect(mockOnSearch).toHaveBeenCalledTimes(1);
      expect(mockOnSearch).toHaveBeenCalledWith(BASE_SEARCH_TERM);
    });

    test('triggers search callback with correct parameters', async () => {
      render(<SearchBar onSearch={mockOnSearch} />);

      await user.type(screen.getByRole('textbox'), BASE_SEARCH_TERM);
      await user.click(screen.getByRole('button'));

      expect(mockOnSearch).toHaveBeenCalledWith(BASE_SEARCH_TERM);
    });
  });

  describe('LocalStorage Integration', () => {
    test('retrieves saved search term on component mount', () => {
      vi.mocked(storage.getSearchTerm).mockReturnValue(SAVED_TERM);

      render(<SearchBar onSearch={mockOnSearch} />);

      expect(screen.getByRole('textbox')).toHaveValue(SAVED_TERM);
      expect(mockOnSearch).toHaveBeenCalledWith(SAVED_TERM);
    });
  });
});
