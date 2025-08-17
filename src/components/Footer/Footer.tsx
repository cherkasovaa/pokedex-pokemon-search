import {
  CREATION_YEAR,
  PORTFOLIO_WEBSITE_LINK,
} from '@/components/Footer/constants';
import { LinkComponent } from '@/components/LinkComponent/LinkComponent';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer
      role="contentinfo"
      className="text-center py-4 border-t-1 border-t-foreground-muted/30"
    >
      © {CREATION_YEAR}{' '}
      <LinkComponent href={PORTFOLIO_WEBSITE_LINK}>
        {t('creatorName')}
      </LinkComponent>
    </footer>
  );
};
