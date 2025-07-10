const SEARCH_KEY = 'searchTerm';

export default class Storage {
  private static instance: Storage;

  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }

  getSearchTerm(): string | null {
    const data = localStorage.getItem(SEARCH_KEY);

    return data || null;
  }

  setSearchTerm(value: string): void {
    localStorage.setItem(SEARCH_KEY, value);
  }
}

export const storage = Storage.getInstance();
