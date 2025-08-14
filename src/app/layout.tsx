import { Providers } from '@/app/providers';
import { Container, Footer, Header } from '@/components';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Pokédex | Pokémon Search',
  description: 'Pokédex | Pokémon Search',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />

            <main role="main" className="flex w-full">
              <Container className="py-4 size-full">{children}</Container>
            </main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
