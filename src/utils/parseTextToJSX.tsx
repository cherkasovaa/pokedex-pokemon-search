import { parseLink } from '@/utils/parseLink';
import { parseTag } from '@/utils/parseTag';

export const parseTextToJSX = (
  text: string
): (string | JSX.Element)[] | undefined => {
  if (typeof text !== 'string' || !text) return;
  const PARSER_REGEX = /(<span[^>]*>.*?<\/span>)|(\[[^\\[]+\))/g;

  const texts = text.split(PARSER_REGEX).filter((part) => part);

  return texts.map((text) => {
    const spanElement = parseTag(text);

    if (spanElement) return spanElement;

    const linkElement = parseLink(text);

    if (linkElement) return linkElement;

    return text;
  });
};
