// 'use client';

import { LottieAnimation } from '@/components';
import { Link } from '@/i18n/navigation';
import { APP_PATHS } from '@/types/router/constants';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: '404 | Page Not Found',
  description: '404 | Page Not Found',
};

export default async function NotFoundPage() {
  const t = await getTranslations('NotFoundPage');
  return (
    <section className="flex h-full items-center justify-center py-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex justify-center lg:justify-end">
          <LottieAnimation />
        </div>
        <div className="text-center self-center lg:text-left">
          <h1 className="text-4xl sm:text-6xl font-medium">{t('title')}</h1>

          <div className="mt-8">
            <Link
              href={APP_PATHS.HOME}
              className="text-lg rounded-full border border-foreground-muted hover:bg-foreground-muted font-medium hover:text-background duration-300 px-4 py-2"
            >
              {t('buttonHomeBack')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
