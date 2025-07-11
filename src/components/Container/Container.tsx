import type { ContainerProps } from '@/types/interfaces';
import { cn } from '@/utils/cn';
import React from 'react';

export class Container extends React.Component<ContainerProps> {
  render() {
    const { children, className = '' } = this.props;
    const defaultClasses = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

    return <div className={cn(defaultClasses, className)}>{children}</div>;
  }
}
