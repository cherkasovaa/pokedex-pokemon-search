import type { Pokemon, PokemonDetails } from '@/types/interfaces';
import { Outlet } from 'react-router';

export const SearchBarMock = ({
  onSearch,
}: {
  onSearch: (_term: string) => void;
}) => (
  <input
    data-testid="search-input"
    onChange={(e) => onSearch(e.target.value)}
  />
);

export const ResultsMock = ({
  isLoading,
  results,
  error,
}: {
  isLoading: boolean;
  results: [];
  error: null;
}) => (
  <div data-testid="results">
    {isLoading && 'Loading'}
    {error && `Error: ${error}`}
    {results && results.length > 0 && 'Results'}
  </div>
);

export const ButtonMock = ({
  content,
  onClick,
}: {
  content: string;
  onClick: () => void;
}) => <button onClick={onClick}>{content}</button>;

export const DetailedCardMock = ({ pokemon }: { pokemon: PokemonDetails }) => (
  <div data-testid="detailed-card">{pokemon.name}</div>
);

export const SimpleCardMock = ({ pokemon }: { pokemon: Pokemon }) => (
  <div data-testid="simple-card">{pokemon.name}</div>
);

export const ErrorMessageMock = ({
  message,
}: {
  message: string | undefined;
}) => <div data-testid="error-message">{message || 'Fallback UI'}</div>;

export const LoaderMock = () => <div data-testid="loader">Loading...</div>;

export const CardListMock = ({ results }: { results: [] }) => (
  <div data-testid="card-list">{results.length}</div>
);

export const HomePageMock = () => (
  <div data-testid="home-page">
    Home Page <Outlet />
  </div>
);

export const AboutPageMock = () => (
  <div data-testid="about-page">About Page</div>
);

export const DetailsPanelMock = () => (
  <div data-testid="details-panel">Details Panel</div>
);

export const NotFoundPageMock = () => (
  <div data-testid="not-found-page">Not Found Page</div>
);
