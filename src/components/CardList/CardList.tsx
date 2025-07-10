import type { CardListProps } from '@/types/interfaces';
import { Component } from 'react';

export class CardList extends Component<CardListProps> {
  render() {
    // const { results } = this.props;

    return (
      <div className="h-full bg-neutral-700 rounded-lg p-4 overflow-auto">
        CardList
      </div>
    );
  }
}
