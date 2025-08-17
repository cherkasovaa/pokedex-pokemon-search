'use client';

import { LinkComponent } from '@/components';
import { URLS } from '@/view/AboutPage/constants';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

export const AboutPage = () => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const t = useTranslations('AboutPage');

  return (
    <section className="py-8">
      <h1 className="text-3xl sm:text-4xl font-medium mb-10">{t('title')}</h1>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="relative overflow-hidden rounded-lg shadow-2xl lg:w-1/3 aspect-square">
          {imageIsLoading && (
            <div
              role="status"
              className="object-fill absolute bg-foreground/10 animate-pulse"
            />
          )}

          <Image
            src="/my-photo.jpg"
            alt="Alina's photo"
            priority
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className={`object-cover transition-opacity ease-in-out ${imageIsLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setImageIsLoading(false)}
            onError={() => setImageIsLoading(false)}
          />
        </div>

        <div className="lg:w-2/3">
          {t.rich('text', {
            p: (chunks) => <p className="mb-3">{chunks}</p>,
            highlight: (chunks) => (
              <span className="italic font-medium">{chunks}</span>
            ),
            rsslink: (chunks) => (
              <LinkComponent href={URLS.rsslink}>{chunks}</LinkComponent>
            ),
            github: (chunks) => (
              <LinkComponent href={URLS.github}>{chunks}</LinkComponent>
            ),
            portfolio: (chunks) => (
              <LinkComponent href={URLS.portfolio}>{chunks}</LinkComponent>
            ),
          })}
        </div>
      </div>
    </section>
  );
};
