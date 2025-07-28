import { HomePage } from '@/pages/HomePage/HomePage';
import { APP_PATHS } from '@/types/router/constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useOutletContext } from 'react-router';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@/components/PokemonList/PokemonList', () => ({
  PokemonList: () => <div data-testid="pokemon-list">Pokemon List</div>,
}));

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const OutletContextSpy = () => {
  const { pokemonId, handleClose } = useOutletContext<{
    pokemonId: string;
    handleClose: () => void;
  }>();
  return (
    <div>
      <div data-testid="id">{pokemonId}</div>
      <button data-testid="close-button" onClick={handleClose}>
        Close From Context
      </button>
    </div>
  );
};

describe('HomePage', () => {
  const renderWithRoute = (
    route: string,
    Outlet = <div data-testid="details-panel" />
  ) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={APP_PATHS.HOME} element={<HomePage />}>
            <Route path={APP_PATHS.DETAIL} element={Outlet} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders PokemonList', () => {
    renderWithRoute(APP_PATHS.HOME);

    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument();
  });

  test('does not show details panel if no id param', () => {
    renderWithRoute(APP_PATHS.HOME);

    expect(screen.queryByTestId('details-panel')).not.toBeInTheDocument();
  });

  test('shows details panel if id param is present', () => {
    renderWithRoute('/details/1');

    expect(screen.queryByTestId('details-panel')).toBeInTheDocument();
  });

  test('calls navigate with the correct path when handleClose is triggered', async () => {
    const user = userEvent.setup();
    renderWithRoute('/details/123?page=2', <OutletContextSpy />);

    await user.click(screen.getByTestId('close-button'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: 'page=2',
    });
  });
});
