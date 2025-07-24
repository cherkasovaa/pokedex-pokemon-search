import {
  BASE_SEARCH_TERM,
  EMPTY_VALUE,
} from '@/__ tests __/utils/mock-constants';
import { SearchInputField } from '@/components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('SearchInputField component', () => {
  let mockOnChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnChange = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    test('renders search input', () => {
      render(<SearchInputField onChange={mockOnChange} value={EMPTY_VALUE} />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('renders input value', () => {
      const initialValue = 'Initial value';

      render(<SearchInputField onChange={mockOnChange} value={initialValue} />);

      expect(screen.getByRole('textbox')).toHaveValue(initialValue);
    });

    test('renders placeholder', () => {
      const placeholder = 'Input something to search...';

      render(<SearchInputField onChange={mockOnChange} value={EMPTY_VALUE} />);

      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });
  });

  describe('User Interaction Tests', () => {
    test('calls onChange handler when user types', async () => {
      const user = userEvent.setup();

      render(<SearchInputField onChange={mockOnChange} value={EMPTY_VALUE} />);

      await user.type(screen.getByRole('textbox'), BASE_SEARCH_TERM);

      expect(mockOnChange).toHaveBeenCalledTimes(BASE_SEARCH_TERM.length);
    });
  });
});
