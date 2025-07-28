import { Header } from '@/components/Header/Header';
import { APP_ROUTES } from '@/router/routes';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Header', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  test('renders the header and navigation', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders in header only links that must be rendered', () => {
    const expectedLinks = APP_ROUTES.filter(
      (route) => route.meta.isShowInNavigation
    );

    const links = screen.getAllByRole('link');

    expect(links.length).toEqual(expectedLinks.length);
  });

  test('renders in header only links that must be rendered', () => {
    //
  });
});
