import {
  BTN_ERROR_TEXT,
  BTN_SEARCH_TEXT,
} from '@/__ tests __/utils/mock-constants';
import { Button } from '@/components';
import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

type ButtonType = 'submit' | 'button';

interface ContentWithTypeObject {
  content: string;
  expectedType: ButtonType;
}

const defaultType = 'button';
const submitType = 'submit';

describe('Button component', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Renders tests', () => {
    const contentWithTypeObjectArray: ContentWithTypeObject[] = [
      { content: 'Submit', expectedType: 'submit' },
      { content: 'Click me', expectedType: 'button' },
    ];
    const buttonTexts = ['Search', 'Error', 'Submit', 'Click me'];

    test.each(contentWithTypeObjectArray)(
      'renders button element with contend $content and type $expectedType',
      ({ content, expectedType }) => {
        render(<Button content={content} type={expectedType} />);

        const element = screen.getByRole('button');

        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent(content);
        expect(element).toHaveAttribute('type', expectedType);
      }
    );

    test.each(buttonTexts)(
      'renders button with content: %s as string',
      (content) => {
        render(<Button content={content} />);

        expect(screen.getByRole('button')).toHaveTextContent(content);
      }
    );

    test('renders ReactNode as content', () => {
      const content = <span data-testid="icon">Icon</span>;

      render(<Button content={content} />);

      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    test('applies default and custom CSS classes', () => {
      const defaultClass = 'inline-block';
      const className = 'text-red-600';

      render(<Button content={BTN_ERROR_TEXT} className={className} />);

      const element = screen.getByRole('button');

      expect(element).toHaveClass(className);
      expect(element).toHaveClass(defaultClass);
    });

    describe('button type', () => {
      test('button type is default', () => {
        render(<Button content={BTN_SEARCH_TEXT} />);

        const button = screen.getByRole('button');

        expect(button).toHaveAttribute('type', defaultType);
        expect(button).not.toHaveAttribute('type', submitType);
      });

      test('button type is submit', () => {
        render(<Button content={BTN_SEARCH_TEXT} type={submitType} />);

        const button = screen.getByRole('button');

        expect(button).toHaveAttribute('type', submitType);
        expect(button).not.toHaveAttribute('type', defaultType);
      });
    });
  });

  describe('User Interaction Tests', () => {
    test('calls onClick handler times count', async () => {
      const mockOnClick = vi.fn();

      render(
        <Button
          content={BTN_SEARCH_TEXT}
          type={submitType}
          onClick={mockOnClick}
        />
      );

      const button = screen.getByRole('button');

      const count = 5;

      for (let i = 0; i < count; i++) {
        await user.click(button);
      }

      expect(mockOnClick).toBeCalledTimes(count);
    });

    test('does not throw if onClick is not provided', async () => {
      render(<Button content={BTN_SEARCH_TEXT} />);

      const button = screen.getByRole('button');

      await user.click(button);

      expect(button).toBeInTheDocument();
    });

    test('should be is focusable', () => {
      render(<Button content={BTN_SEARCH_TEXT} />);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();
    });
  });
});
