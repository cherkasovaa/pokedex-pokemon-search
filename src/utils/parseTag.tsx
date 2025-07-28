export const parseTag = (text: string): JSX.Element | undefined => {
  const SPAN_EXTRACT_REGEX = /<span[^>]*>(.*?)<\/span>/;
  const spanMatch = text.match(SPAN_EXTRACT_REGEX);

  if (spanMatch) {
    return (
      <span key={spanMatch[1]} className="italic font-medium">
        {spanMatch[1]}
      </span>
    );
  }
};
