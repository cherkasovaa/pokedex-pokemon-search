import {
  AboutPageMock,
  DetailsPanelMock,
  HomePageMock,
  NotFoundPageMock,
} from '@/__ tests __/utils/mock-data';
import { AppRouter } from '@/router/AppRouter';
import { APP_PATHS } from '@/types/router/constants';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@/pages/HomePage/HomePage', () => ({
  HomePage: HomePageMock,
}));

vi.mock('@/pages/AboutPage/AboutPage', () => ({
  AboutPage: AboutPageMock,
}));

vi.mock('@/components/DetailsPanel/DetailsPanel', () => ({
  DetailsPanel: DetailsPanelMock,
}));

vi.mock('@/pages/NotFoundPage/NotFoundPage', () => ({
  NotFoundPage: NotFoundPageMock,
}));

describe('AppRouter', () => {
  const renderWithRouter = (initialRoute: string) => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRouter />
      </MemoryRouter>
    );
  };

  test('renders HomePage on root path', () => {
    renderWithRouter(APP_PATHS.HOME);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('renders AboutPage on /about', () => {
    renderWithRouter(APP_PATHS.ABOUT);

    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  test('renders NotFoundPage on unknown path', () => {
    renderWithRouter('/unknown');

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  test('renders DetailsPanel on /details/:id', () => {
    renderWithRouter('/details/1');

    expect(screen.getByTestId('details-panel')).toBeInTheDocument();
  });
});
