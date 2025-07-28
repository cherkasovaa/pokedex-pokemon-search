import type { ApiState } from '@/types/api.types';
import { createContext, useContext, type ReactNode } from 'react';

export function createApiContext<T>() {
  const ApiContext = createContext<ApiState<T> | undefined>(undefined);

  const ApiProvider = ({
    children,
    value,
  }: {
    children: ReactNode;
    value: ApiState<T>;
  }) => {
    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
  };

  const useApiContext = () => {
    const context = useContext(ApiContext);
    if (context === undefined) {
      throw new Error(
        'useApiContext must be used within its matching ApiProvider'
      );
    }
    return context;
  };

  return [ApiProvider, useApiContext] as const;
}
