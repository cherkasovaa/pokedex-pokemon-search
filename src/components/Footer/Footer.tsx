import {
  CREATION_YEAR,
  CREATOR_NAME,
  PORTFOLIO_WEBSITE_LINK,
} from '@/components/Footer/constants';

export const Footer = () => {
  return (
    <footer className="text-center py-4 border-t-1 border-t-gray-500/30">
      © {CREATION_YEAR}{' '}
      <a
        href={PORTFOLIO_WEBSITE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-800 hover:text-red-800/80 duration-300"
        aria-label={"Link to the owner's portfolio website"}
      >
        {CREATOR_NAME}
      </a>
    </footer>
  );
};
