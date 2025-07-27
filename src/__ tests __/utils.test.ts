import { parseLink } from '@/utils/parseLink';
import { parseTag } from '@/utils/parseTag';
import { parseTextToJSX } from '@/utils/parseTextToJSX';
import { render, screen } from '@testing-library/react';
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

  describe('parseLink', () => {
    const TEST_TEXTS = {
      WITH_LINK: '[link](http://test-link.ru)',
      WITHOUT_LINK: 'This text do not have markdown link',
    };

    test('returns link from text with attributes', () => {
      const result = parseLink(TEST_TEXTS.WITH_LINK);

      render(result);

      const link = screen.getByRole('link');
      expect(link).toHaveTextContent('link');
      expect(link).toHaveAttribute('href', 'http://test-link.ru');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('returns undefined if input text is not a markdown link', () => {
      const result = parseLink(TEST_TEXTS.WITHOUT_LINK);

      expect(result).toBe(undefined);
    });
  });

  describe('parseTag', () => {
    const TEST_TEXTS = {
      WITH_TAG: '<span>This text will be parse</span>',
      WITHOUT_TAG: 'Text without tags',
    };

    test('returns JSX span element from a string that is only a tag', () => {
      const result = parseTag(TEST_TEXTS.WITH_TAG);

      render(result);

      const spanElement = screen.getByText('This text will be parse');
      expect(spanElement).toBeInTheDocument();
      expect(spanElement.tagName).toBe('SPAN');
    });

    test('returns undefined if input text without span text', () => {
      const result = parseTag(TEST_TEXTS.WITHOUT_TAG);

      expect(result).toBe(undefined);
    });
  });

  describe('parseTextToJSX', () => {
    const TEST_TEXTS = {
      WITH_TAGS:
        'This text includes <span>span</span> and [link](http://test-link.ru) elements',
      SIMPLE: 'This is a simple text without any elements',
    };

    test('correctly parses a string with spans and links', () => {
      const result = parseTextToJSX(TEST_TEXTS.WITH_TAGS);

      render(result);

      const spanElement = screen.getByText('span');
      expect(spanElement).toBeInTheDocument();
      expect(spanElement.tagName).toBe('SPAN');

      const link = screen.getByRole('link');
      expect(link).toHaveTextContent('link');
      expect(link).toHaveAttribute('href', 'http://test-link.ru');
    });

    test('returns an array with a single string for simple text', () => {
      const result = parseTextToJSX(TEST_TEXTS.SIMPLE);

      expect(result).toEqual([TEST_TEXTS.SIMPLE]);
    });
  });
});
