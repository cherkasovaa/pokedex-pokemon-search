import { Layout } from '@/components/Layout/Layout';
import { APP_PATHS } from '@/types/router/constants';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Layout', () => {
  const childContentText = 'Child content for Outlet';

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={[APP_PATHS.HOME]}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>{childContentText}</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  });

  test('renders header section', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('renders main section', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('renders footer section', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('renders children in Outlet', () => {
    expect(screen.getByText('Child content for Outlet')).toBeInTheDocument();
  });
});
