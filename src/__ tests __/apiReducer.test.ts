import { apiReducer } from '@/reducers/apiReducer';
import type { ApiAction, ApiState } from '@/types/api.types';
import { describe, expect, test } from 'vitest';

describe('apiReducer', () => {
  const initialState: ApiState<string> = {
    isLoading: false,
    error: null,
    data: null,
  };

  test('handles FETCH_START action', () => {
    const action: ApiAction<string> = { type: 'FETCH_START' };
    const state = apiReducer(initialState, action);

    expect(state).toEqual({
      isLoading: true,
      error: null,
      data: null,
    });
  });

  test('handles FETCH_ERROR action', () => {
    const action: ApiAction<string> = { type: 'FETCH_ERROR', payload: 'Error' };
    const state = apiReducer(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      error: 'Error',
      data: null,
    });
  });

  test('handles FETCH_SUCCESS action', () => {
    const action: ApiAction<string> = {
      type: 'FETCH_SUCCESS',
      payload: 'data',
    };
    const state = apiReducer(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      error: null,
      data: 'data',
    });
  });
});
