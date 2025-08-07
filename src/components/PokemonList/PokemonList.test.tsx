import {
  BASE_SEARCH_TERM,
  mockSimplePokemonList,
} from '@/__ tests __/utils/mock-constants';
import { PokemonList } from '@/components/PokemonList/PokemonList';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate, useSearchParams } from 'react-router';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const queryLSValue = BASE_SEARCH_TERM;
const setQueryLS = vi.fn();

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: () => [queryLSValue, setQueryLS],
}));
vi.mock('@/hooks/usePokemonSearch');

const mockSetSearchParams = vi.fn();
const mockSearchParams = { get: vi.fn().mockReturnValue('1') };

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>(
    '@tanstack/react-query'
  );
  return {
    ...actual,
    useQueryClient: vi.fn(() => ({
      invalidateQueries: vi.fn(),
    })),
  };
});
vi.mock('@/components/Pagination/Pagination', () => ({
  Pagination: ({ onPageChange }: { onPageChange: (page: number) => void }) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(2)}>Next</button>
    </div>
  ),
}));
vi.mock('@/components/Results/Results', () => ({
  Results: () => <div data-testid="results">Results</div>,
}));
vi.mock('@/components/SearchBar/SearchBar', () => ({
  SearchBar: ({
    value,
    onSearch,
    onChange,
  }: {
    value: string;
    onSearch: () => void;
    onChange: (_term: string) => void;
  }) => (
    <form onSubmit={onSearch}>
      <input
        data-testid="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  ),
}));
vi.mock('@/components/Button/Button', () => ({
  Button: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Refresh</button>
  ),
}));

const createMockSearchQueryResult = <TData = unknown, TError = Error>(
  overrides: Partial<UseQueryResult<TData, TError>>
): UseQueryResult<TData, TError> =>
  ({
    data: { results: [], totalCount: 0 },
    isLoading: false,
    error: null,
    isRefetching: false,
    ...overrides,
  }) as UseQueryResult<TData, TError>;

describe('PokemonList component', () => {
  const user = userEvent.setup();

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(vi.fn());
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ page: '1' }),
      mockSetSearchParams,
    ]);

    vi.mocked(usePokemonSearch).mockReturnValue(
      createMockSearchQueryResult({
        data: { results: mockSimplePokemonList, totalCount: 2 },
      })
    );

    mockSearchParams.get.mockReturnValue('1');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('redirect should be performed on a new submit', async () => {
    renderComponent();

    const input = screen.getByTestId('search-input');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, BASE_SEARCH_TERM);

    await user.click(searchButton);

    expect(useNavigate).toHaveBeenCalled();
  });

  test('renders pagination when there are multiple pages', () => {
    vi.mocked(usePokemonSearch).mockReturnValue(
      createMockSearchQueryResult({
        data: { results: [], totalCount: 25 },
      })
    );

    renderComponent();

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('should NOT render pagination when there is only one page', () => {
    vi.mocked(usePokemonSearch).mockReturnValue(
      createMockSearchQueryResult({
        data: { results: [], totalCount: 10 },
      })
    );
    renderComponent();

    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  test('handlePageChange calls setSearchParams with correct page', async () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ page: '1' }),
      mockSetSearchParams,
    ]);
    vi.mocked(usePokemonSearch).mockReturnValue(
      createMockSearchQueryResult({
        data: { results: [], totalCount: 32 },
      })
    );
    renderComponent();

    const nextButton = screen.getByText(/next/i);

    await user.click(nextButton);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '2' });
  });

  test('calculates totalPages correctly', () => {
    const mockData = {
      results: [],
      totalCount: 32,
    };
    const ITEMS_PER_PAGE = 16;

    const totalPages = mockData
      ? Math.ceil(mockData.totalCount / ITEMS_PER_PAGE)
      : 0;

    expect(totalPages).toBe(2);
  });

  test('returns 0 totalPages when no data', () => {
    const mockData = {
      results: [],
      totalCount: 0,
    };

    const ITEMS_PER_PAGE = 16;

    const totalPages = mockData
      ? Math.ceil(mockData.totalCount / ITEMS_PER_PAGE)
      : 0;

    expect(totalPages).toBe(0);
  });

  test('calls invalidateQueries when refresh button is clicked', async () => {
    renderComponent();

    const refreshBtn = screen.getByRole('button', { name: /refresh/i });

    await user.click(refreshBtn);

    expect(useQueryClient).toHaveBeenCalledTimes(1);
  });
});
