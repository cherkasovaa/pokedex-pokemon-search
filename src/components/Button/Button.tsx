import type { ButtonProps } from '@/types/interfaces';
import { cn } from '@/utils/cn';
import { Component } from 'react';

export class Button extends Component<ButtonProps> {
  render() {
    const { content, type = 'button', onClick, className = '' } = this.props;
    const defaultClasses =
      'inline-block max-w-max px-6 py-2 border  rounded-full cursor-pointer uppercase text-sm font-semibold transition-colors';

    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(defaultClasses, className)}
      >
        {content}
      </button>
    );
  }
}
