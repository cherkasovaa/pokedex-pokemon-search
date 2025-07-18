import { capitalize } from '@utils/capitalize';
import { cn } from '@utils/cn';
import { formatString } from '@utils/formatString';
import { describe, expect, test } from 'vitest';

describe('Utils test', () => {
  describe('capitalize', () => {
    const strings = [
      { value: 'pickachu', existingValue: 'Pickachu' },
      { value: 'ditto', existingValue: 'Ditto' },
      { value: 'bulbazaur', existingValue: 'Bulbazaur' },
    ];

    test.each(strings)(
      'returns $existingValue when given $value',
      ({ value, existingValue }) => {
        const capitalizeValue = capitalize(value);

        expect(capitalizeValue).toEqual(existingValue);
      }
    );

    test('returns a capital letter when given an one lowercase letter', () => {
      expect(capitalize('a')).toBe('A');
    });

    test('returns an empty string when given an empty string', () => {
      const emptyString = capitalize('');

      expect(emptyString).toEqual('');
    });
  });

  describe('cn', () => {
    const classes = ['border', 'inline-block', 'text-gray-100', ''];

    test.each(classes)(
      'merges a default class with $className',
      (className) => {
        const defaultClass = 'bg-white';
        const mergeClass = cn(defaultClass, className);
        const existingClassName = `${defaultClass} ${className}`.trim();

        expect(mergeClass).toEqual(existingClassName);
      }
    );

    test('returns empty string if all classes are empty', () => {
      expect(cn('', '', '')).toBe('');
    });
  });

  describe('formatString', () => {
    const values = [
      { value: 'test-string', existingValue: 'Test String' },
      { value: 'inline-block', existingValue: 'Inline Block' },
      { value: 'text-gray-100', existingValue: 'Text Gray 100' },
      { value: 'hp', existingValue: 'Hp' },
      { value: '', existingValue: '' },
    ];

    test.each(values)(
      'returns format string without dashboard and capitalization',
      ({ value, existingValue }) => {
        const formatedValue = formatString(value);

        expect(formatedValue).toEqual(existingValue);
      }
    );
  });
});
