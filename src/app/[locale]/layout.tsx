import { Providers } from '@/app/[locale]/providers';
import { Container, Footer, Header } from '@/components';
import { THEME_COOKIES_KEY } from '@/context/theme/constants';
import { routing } from '@/i18n/routing';
import { THEME_MODE, type Theme } from '@/types/theme.types';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'Pokédex | Pokémon Search',
  description: 'Pokédex | Pokémon Search',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const themeCookie = (await cookies()).get(THEME_COOKIES_KEY);
  const initialTheme = (themeCookie?.value as Theme) || THEME_MODE.SYSTEM;

  return (
    <html lang={locale} className={initialTheme}>
      <body>
        <NextIntlClientProvider>
          <Providers initialTheme={initialTheme}>
            <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
              <Header />

              <main role="main" className="flex w-full">
                <Container className="py-4 size-full">{children}</Container>
              </main>

              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
