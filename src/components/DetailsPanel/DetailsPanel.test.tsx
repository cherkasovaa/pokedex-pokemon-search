import { baseDetailedPokemon } from '@/__ tests __/utils/mock-constants';
import {
  ButtonMock,
  ErrorMessageMock,
  LoaderMock,
} from '@/__ tests __/utils/mock-data';
import { DetailsPanel } from '@/components/DetailsPanel/DetailsPanel';
import { useApi } from '@/hooks/useApi';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOutletContext } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/hooks/useApi');

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

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

describe('DetailsPanel', () => {
  const mockHandleClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows loading state while fetching data', () => {
    vi.mocked(useApi).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    vi.mocked(useOutletContext).mockReturnValue({
      pokemonId: '1',
      handleClose: mockHandleClose,
    });

    render(<DetailsPanel />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
  });

  test('renders ErrorMessage if error', () => {
    const errorMessage = 'Something went wrong';

    vi.mocked(useApi).mockReturnValue({
      isLoading: false,
      error: errorMessage,
      data: null,
    });

    vi.mocked(useOutletContext).mockReturnValue({
      pokemonId: '1',
      handleClose: mockHandleClose,
    });

    render(<DetailsPanel />);

    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
  });

  test('renders DetailedCard when data is available and not loading', () => {
    vi.mocked(useApi).mockReturnValue({
      isLoading: false,
      error: null,
      data: [baseDetailedPokemon],
    });

    vi.mocked(useOutletContext).mockReturnValue({
      pokemonId: '1',
      handleClose: mockHandleClose,
    });

    render(<DetailsPanel />);

    expect(screen.queryByTestId('detailed-card')).toBeInTheDocument();
  });

  test('displays "not found" message when data is empty', () => {
    vi.mocked(useApi).mockReturnValue({
      isLoading: false,
      error: null,
      data: [],
    });

    vi.mocked(useOutletContext).mockReturnValue({
      pokemonId: '1',
      handleClose: mockHandleClose,
    });

    render(<DetailsPanel />);

    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Pokemon with ID "1" not found.'
    );
  });

  test('calls handleClose when the close button is clicked', async () => {
    const user = userEvent.setup();

    vi.mocked(useApi).mockReturnValue({
      isLoading: false,
      error: null,
      data: [baseDetailedPokemon],
    });

    vi.mocked(useOutletContext).mockReturnValue({
      pokemonId: '1',
      handleClose: mockHandleClose,
    });

    render(<DetailsPanel />);

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
