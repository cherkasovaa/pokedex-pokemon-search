import { HomePage } from '@/view';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomePage>{children}</HomePage>;
}
