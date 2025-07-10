import { Container } from '@/components/Container';
import { SearchBar } from '@/components/SearchBar';
import { Component } from 'react';

export class App extends Component {
  render() {
    return (
      <main className="min-h-screen bg-neutral-800 text-gray-100 py-6">
        <Container>
          <SearchBar />
        </Container>
      </main>
    );
  }
}

export default App;
