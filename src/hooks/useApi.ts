import { apiReducer } from '@/reducers/apiReducer';
import type { ApiState } from '@/types/api.types';
import { useEffect, useReducer } from 'react';

export const useApi = <T>(apiCall: () => Promise<T>): ApiState<T> => {
  const initialState: ApiState<T> = {
    isLoading: false,
    error: null,
    data: null,
  };

  const [state, dispatch] = useReducer(apiReducer<T>, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });

    apiCall()
      .then((responseData) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: responseData });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_ERROR',
          payload:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred',
        });
      });
  }, [apiCall]);

  return state;
};
