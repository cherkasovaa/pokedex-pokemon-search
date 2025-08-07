import { mockSimplePokemonList } from '@/__ tests __/utils/mock-constants';
import {
  CardListMock,
  ErrorMessageMock,
  LoaderMock,
} from '@/__ tests __/utils/mock-data';
import { Results } from '@/components/Results/Results';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/components/Loader/Loader', () => ({ Loader: LoaderMock }));
vi.mock('@/components/ErrorMessage/ErrorMessage', () => ({
  ErrorMessage: ErrorMessageMock,
}));
vi.mock('@/components/CardList/CardList', () => ({ CardList: CardListMock }));
vi.mock('@/components/Flyout/Flyout', () => ({
  Flyout: () => <div data-testid="flyout"></div>,
}));

describe('Results component', () => {
  const mockProps = {
    results: [],
    isLoading: false,
    error: null,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    test('shows loading state while fetching data', () => {
      render(<Results {...{ ...mockProps, isLoading: true }} />);

      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
      expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    });

    test('renders ErrorMessage if error', () => {
      const errorMessage = 'Something went wrong';

      render(<Results {...{ ...mockProps, error: new Error(errorMessage) }} />);

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        errorMessage
      );
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    });

    test('renders CardList when data is available and not loading', () => {
      render(<Results {...{ ...mockProps, results: mockSimplePokemonList }} />);

      expect(screen.getByTestId('card-list')).toBeInTheDocument();
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });

    test('renders "not found" message if data is empty', () => {
      render(<Results {...mockProps} />);

      expect(screen.getByRole('paragraph')).toHaveTextContent(
        'There is no data to display. Try again'
      );
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    });
  });
});
