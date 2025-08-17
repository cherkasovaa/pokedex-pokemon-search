'use client';
import type { ErrorMessageProps } from '@/types/interfaces';
import { useTranslations } from 'next-intl';

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const t = useTranslations('ErrorMessage');

  const defaultMessage = message || t('defaultMessage');

  return (
    <div className="flex flex-col items-center justify-center h-full  ">
      <div className="text-center p-8 bg-card rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-2">{t('title')}</h3>
        <p className="text-lg text-foreground-muted">{defaultMessage}</p>
      </div>
    </div>
  );
};
