import {
  BASE_SEARCH_TERM,
  EMPTY_VALUE,
  SEARCH_KEY,
} from '@/__ tests __/utils/mock-constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('should return the initial value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage());

    expect(result.current[0]).toBe(EMPTY_VALUE);
  });

  test('should return initial value from localStorage', () => {
    localStorage.setItem(SEARCH_KEY, BASE_SEARCH_TERM);

    const { result } = renderHook(() => useLocalStorage());

    expect(result.current[0]).toBe(BASE_SEARCH_TERM);
  });

  test('should update value in localStorage and state', () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current[1](BASE_SEARCH_TERM);
    });

    expect(localStorage.getItem(SEARCH_KEY)).toBe(BASE_SEARCH_TERM);
    expect(result.current[0]).toBe(BASE_SEARCH_TERM);
  });
});
