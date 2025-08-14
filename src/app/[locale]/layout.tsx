import { Providers } from '@/app/[locale]/providers';
import { Container, Footer, Header } from '@/components';
import type { Metadata } from 'next';
import '../../globals.css';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

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

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Providers>
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
