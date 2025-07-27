import { mockSimplePokemonList } from '@/__ tests __/utils/mock-constants';
import {
  CardListMock,
  ErrorMessageMock,
  LoaderMock,
} from '@/__ tests __/utils/mock-data';
import { Results } from '@/components';
import { ApiProvider, type ApiResponse } from '@/context/apiContext';
import type { ApiState } from '@/types/api.types';
import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/components/Loader/Loader', () => ({ Loader: LoaderMock }));
vi.mock('@/components/ErrorMessage/ErrorMessage', () => ({
  ErrorMessage: ErrorMessageMock,
}));
vi.mock('@/components/CardList/CardList', () => ({ CardList: CardListMock }));

const renderWithApiProvider = (
  ui: ReactElement,
  mockState: ApiState<ApiResponse>
) => {
  return render(<ApiProvider value={mockState}>{ui}</ApiProvider>);
};

describe('Results component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    test('shows loading state while fetching data', () => {
      const loadingState: ApiState<ApiResponse> = {
        isLoading: true,
        error: null,
        data: null,
      };
      renderWithApiProvider(<Results />, loadingState);

      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
      expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    });

    test('renders ErrorMessage if error', () => {
      const errorMessage = 'Something went wrong';
      const errorState: ApiState<ApiResponse> = {
        isLoading: false,
        error: errorMessage,
        data: null,
      };

      renderWithApiProvider(<Results />, errorState);

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        errorMessage
      );
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    });

    test('renders CardList when data is available and not loading', () => {
      const dataState: ApiState<ApiResponse> = {
        isLoading: false,
        error: null,
        data: { results: mockSimplePokemonList, totalCount: 2 },
      };
      renderWithApiProvider(<Results />, dataState);

      expect(screen.getByTestId('card-list')).toBeInTheDocument();
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });

    test('renders "not found" message if data is empty', () => {
      const dataState: ApiState<ApiResponse> = {
        isLoading: false,
        error: null,
        data: { results: [], totalCount: 0 },
      };
      renderWithApiProvider(<Results />, dataState);

      expect(screen.getByRole('paragraph')).toHaveTextContent(
        'There is no data to display. Try again'
      );
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    });
  });
});
