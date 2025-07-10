import type { ButtonProps } from '@/types/interfaces';
import { Component } from 'react';

export class Button extends Component<ButtonProps> {
  render() {
    const { content, type = 'button', onClick } = this.props;

    return (
      <button
        type={type}
        onClick={onClick}
        className="inline-block max-w-max px-6 py-2 border border-gray-300 hover:bg-gray-200 text-gray-300 hover:text-gray-800 rounded-full cursor-pointer uppercase text-sm font-semibold transition-colors"
      >
        {content}
      </button>
    );
  }
}
