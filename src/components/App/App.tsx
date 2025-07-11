import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Results } from '@/components/Results';
import { SearchBar } from '@/components/SearchBar';
import { pokemonAPI } from '@/services/PokemonAPI';
import { storage } from '@/services/Storage';
import type { AppState } from '@/types/interfaces';
import { Component, type PropsWithChildren } from 'react';
export class App extends Component<PropsWithChildren, AppState> {
  private controller = new AbortController();

  constructor(props: PropsWithChildren) {
    super(props);

    this.state = {
      searchTerm: '',
      isLoading: true,
      error: null,
      results: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    const savedTerm = storage.getSearchTerm() || '';
    this.handleSearch(savedTerm);
  }

  componentDidUpdate(_prevProps: PropsWithChildren, prevState: AppState) {
    if (
      prevState.searchTerm !== this.state.searchTerm &&
      this.state.searchTerm &&
      !this.state.error
    ) {
      storage.setSearchTerm(this.state.searchTerm);
    }
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  async handleSearch(searchTerm: string): Promise<void> {
    if (this.controller) {
      this.controller.abort();
    }

    this.controller = new AbortController();
    const signal = this.controller.signal;

    this.setState({
      searchTerm,
      isLoading: true,
      error: null,
    });

    try {
      const results = await pokemonAPI.searchPokemons(searchTerm, signal);
      if (!signal.aborted) {
        this.setState({ results, isLoading: false });

        if (!results.length && searchTerm) {
          this.handleError();
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      if (!signal.aborted) {
        this.setState({
          error:
            error instanceof Error ? error.message : 'Failed to fetch data',
          isLoading: false,
          results: [],
        });
      }
      storage.removeSearchTerm();
    }
  }

  handleError(): void {
    this.setState({
      error: 'This is a simulated error from the button',
      isLoading: false,
      results: [],
    });
  }

  render() {
    const { isLoading, error, results } = this.state;

    return (
      <main className="min-h-screen bg-neutral-800 text-gray-100 py-6 flex w-full">
        <Container className="flex-1 grid grid-rows-[auto_1fr_auto] gap-4">
          <SearchBar onSearch={this.handleSearch} />
          <Results isLoading={isLoading} results={results} error={error} />
          <Button
            content="Error"
            onClick={this.handleError}
            className="border-red-800 place-self-end bg-red-800/40 hover:bg-red-800/80 text-gray-300"
          />
        </Container>
      </main>
    );
  }
}

export default App;
