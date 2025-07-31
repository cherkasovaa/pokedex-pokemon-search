import { APP_PATHS, PAGE_NAMES } from '@/types/router/constants';
import type { AppRoute } from '@/types/router/interfaces';

export const APP_ROUTES: AppRoute[] = [
  {
    path: APP_PATHS.HOME,
    name: PAGE_NAMES.HOME,
    meta: {
      isShowInNavigation: true,
    },
  },
  {
    path: APP_PATHS.ABOUT,
    name: PAGE_NAMES.ABOUT,
    meta: {
      isShowInNavigation: true,
    },
  },
  {
    path: APP_PATHS.NOT_FOUND,
    name: PAGE_NAMES.NOT_FOUND,
    meta: {
      isShowInNavigation: false,
    },
  },
];
