export interface ApiState<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
}

export type ApiAction<T> =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_ERROR'; payload: string };
