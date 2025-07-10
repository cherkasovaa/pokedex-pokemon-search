import { Container } from '@/components/Container';
import { Component } from 'react';

export class App extends Component {
  render() {
    return (
      <main className="min-h-screen bg-neutral-800 text-gray-100">
        <Container>App component</Container>
      </main>
    );
  }
}

export default App;
