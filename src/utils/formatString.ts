import { capitalize } from '@/utils/capitalize';

export const formatString = (str: string) =>
  str
    .split('-')
    .map((word) => capitalize(word))
    .join(' ');
