export const parseLink = (text: string): JSX.Element | undefined => {
  const LINK_EXTRACT_REGEX = /\[([^\\[]+)\]\((.*)\)/;
  const linkMatch = text.match(LINK_EXTRACT_REGEX);

  if (linkMatch) {
    const linkText = linkMatch[1];
    const linkUrl = linkMatch[2];

    return (
      <a
        key={linkText}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="duration-300 text-red-700 italic hover:text-red-800"
      >
        {linkText}
      </a>
    );
  }
};
