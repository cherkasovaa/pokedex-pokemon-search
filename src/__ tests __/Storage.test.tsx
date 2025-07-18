import { SAVED_TERM, SEARCH_KEY } from '@/__ tests __/utils/mock-constants';
import Storage, { storage } from '@/services/Storage';
import { afterEach, describe, expect, test, vi } from 'vitest';

describe('Storage', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('the Storage is a singleton', () => {
    const storage1 = Storage.getInstance();

    expect(storage1).toBe(storage);
  });

  test('getSearchTerm returns value from localStorage', () => {
    localStorage.setItem(SEARCH_KEY, SAVED_TERM);
    expect(storage.getSearchTerm()).toBe(SAVED_TERM);
  });

  test('getSearchTerm returns null from localStorage', () => {
    expect(storage.getSearchTerm()).toBeNull();
  });

  test('setSearchTerm sets value to the localStorage', () => {
    storage.setSearchTerm(SAVED_TERM);
    expect(localStorage.getItem(SEARCH_KEY)).toBe(SAVED_TERM);
  });

  test('removeSearchTerm removes saved term from localStorage', () => {
    localStorage.setItem(SEARCH_KEY, SAVED_TERM);
    storage.removeSearchTerm();
    expect(localStorage.getItem(SEARCH_KEY)).toBeNull();
  });
});
