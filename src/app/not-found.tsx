import { LottieAnimation } from '@/components';
import { APP_PATHS } from '@/types/router/constants';
import {
  BUTTON_HOME_BACK,
  PAGE_TITLE,
} from '@/view/NotFoundPage/constants/constants';
import Link from 'next/link';

export default function Page() {
  return (
    <section className="flex h-full items-center justify-center py-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex justify-center lg:justify-end">
          <LottieAnimation />
        </div>
        <div className="text-center self-center lg:text-left">
          <h1 className="text-4xl sm:text-6xl font-medium">{PAGE_TITLE}</h1>

          <div className="mt-8">
            <Link
              href={APP_PATHS.HOME}
              className="text-lg rounded-full border border-foreground-muted hover:bg-foreground-muted font-medium hover:text-background duration-300 px-4 py-2"
            >
              {BUTTON_HOME_BACK}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
