import { CardList } from '@/components/CardList';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Loader } from '@/components/Loader';
import type { ResultsProps } from '@/types/interfaces';
import { Component } from 'react';

export class Results extends Component<ResultsProps> {
  render() {
    const { isLoading, error, results } = this.props;

    return (
      <div className="h-full p-4 flex flex-col overflow-y-auto">
        <div className="flex-grow">
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <CardList results={results} />}
        </div>
      </div>
    );
  }
}
