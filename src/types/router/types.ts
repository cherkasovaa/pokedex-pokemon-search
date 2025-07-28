import type { APP_PATHS, PAGE_NAMES } from '@/types/router/constants';

export type AppPath = (typeof APP_PATHS)[keyof typeof APP_PATHS];
export type PageNames = (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES];
