import { mockSimplePokemonList } from '@/__ tests __/utils/mock-constants';
import {
  CardListMock,
  ErrorMessageMock,
  LoaderMock,
} from '@/__ tests __/utils/mock-data';
import { Results } from '@/components';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/components/Loader/Loader', () => ({ Loader: LoaderMock }));

vi.mock('@/components/ErrorMessage/ErrorMessage', () => ({
  ErrorMessage: ErrorMessageMock,
}));

vi.mock('@/components/CardList/CardList', () => ({ CardList: CardListMock }));

describe('Results component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    test('shows loading state while fetching data', () => {
      render(
        <Results
          isLoading={true}
          results={mockSimplePokemonList}
          error={null}
        />
      );

      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
      expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    });

    test('renders ErrorMessage if error', () => {
      const errorMessage = 'Error message';

      render(
        <Results
          isLoading={false}
          results={mockSimplePokemonList}
          error={errorMessage}
        />
      );

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        errorMessage
      );
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    });

    test('renders CardList when data is available and not loading', () => {
      render(
        <Results
          isLoading={false}
          results={mockSimplePokemonList}
          error={null}
        />
      );

      expect(screen.getByTestId('card-list')).toBeInTheDocument();
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });
});
