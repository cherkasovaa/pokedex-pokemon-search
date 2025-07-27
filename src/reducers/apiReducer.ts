import type { ApiAction, ApiState } from '@/types/api.types';

export const apiReducer = <T>(
  state: ApiState<T>,
  action: ApiAction<T>
): ApiState<T> => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    default:
      return state;
  }
};
