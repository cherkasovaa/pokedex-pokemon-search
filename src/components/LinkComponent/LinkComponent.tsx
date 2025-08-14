import type { ReactNode } from 'react';

export const LinkComponent = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="duration-300 text-accent italic hover:text-accent/90"
    >
      {children}
    </a>
  );
};
