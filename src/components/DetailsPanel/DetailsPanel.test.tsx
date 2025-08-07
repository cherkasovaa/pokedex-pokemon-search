import { baseDetailedPokemon } from '@/__ tests __/utils/mock-constants';
import {
  ButtonMock,
  ErrorMessageMock,
  LoaderMock,
} from '@/__ tests __/utils/mock-data';
import { DetailsPanel } from '@/components/DetailsPanel/DetailsPanel';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { isDetailedPokemon } from '@/types/typeGuards';
import type { UseQueryResult } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOutletContext } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/hooks/usePokemonSearch');
vi.mock('@/types/typeGuards', () => ({
  isDetailedPokemon: vi.fn(),
}));

vi.mock('react-router');

vi.mock('@/components/Loader/Loader', () => ({
  Loader: LoaderMock,
}));
vi.mock('@/components/ErrorMessage/ErrorMessage', () => ({
  ErrorMessage: ErrorMessageMock,
}));
vi.mock('@/components/DetailedCard/DetailedCard', () => ({
  DetailedCard: () => <div data-testid="detailed-card"></div>,
}));
vi.mock('@/components/Button/Button', () => ({
  Button: ButtonMock,
}));

const createMockQueryResult = <TData = unknown, TError = Error>(
  overrides: Partial<UseQueryResult<TData, TError>>
): UseQueryResult<TData, TError> =>
  ({
    data: undefined,
    error: null,
    isLoading: false,
    ...overrides,
  }) as UseQueryResult<TData, TError>;

describe('DetailsPanel', () => {
  const mockHandleClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useOutletContext).mockReturnValue({
      pokemonId: '1',
      handleClose: mockHandleClose,
    });
  });

  test('shows loading state while fetching data', () => {
    vi.mocked(usePokemonSearch).mockReturnValue(
      createMockQueryResult({
        isLoading: true,
      })
    );

    render(<DetailsPanel />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
  });

  test('renders ErrorMessage if error', () => {
    const errorMessage = 'Something went wrong';

    vi.mocked(usePokemonSearch).mockReturnValue(
      createMockQueryResult({
        error: new Error(errorMessage),
      })
    );

    render(<DetailsPanel />);

    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
  });

  test('renders DetailedCard when data is available and not loading', () => {
    vi.mocked(usePokemonSearch).mockReturnValue(
      createMockQueryResult({
        data: {
          results: [baseDetailedPokemon],
          totalCount: 1,
        },
      })
    );

    vi.mocked(isDetailedPokemon).mockReturnValue(true);

    render(<DetailsPanel />);

    expect(screen.queryByTestId('detailed-card')).toBeInTheDocument();
  });

  test('displays "not found" message when data is empty', () => {
    vi.mocked(usePokemonSearch).mockReturnValue(
      createMockQueryResult({
        data: {
          results: [],
          totalCount: 0,
        },
      })
    );

    vi.mocked(isDetailedPokemon).mockReturnValue(false);

    render(<DetailsPanel />);

    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Pokemon with ID "1" not found.'
    );
  });

  test('calls handleClose when the close button is clicked', async () => {
    const user = userEvent.setup();

    vi.mocked(usePokemonSearch).mockReturnValue(
      createMockQueryResult({
        data: {
          results: [baseDetailedPokemon],
          totalCount: 1,
        },
      })
    );

    vi.mocked(isDetailedPokemon).mockReturnValue(true);

    render(<DetailsPanel />);

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
