import type { AppPath, PageNames } from '@/types/router/types';

export interface AppRoute {
  path: AppPath;
  name: PageNames;
  meta: {
    isShowInNavigation: boolean;
  };
}
