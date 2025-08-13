import { Providers } from '@/app/providers';
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
