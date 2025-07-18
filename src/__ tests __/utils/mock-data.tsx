import type { Pokemon, PokemonDetails } from '@/types/interfaces';

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

export const ButtonMock = ({ onClick }: { onClick: () => void }) => (
  <button data-testid="error-button" onClick={onClick}>
    Error
  </button>
);

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
