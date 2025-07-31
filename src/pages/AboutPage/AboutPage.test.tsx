import { AboutPage } from '@/pages/';
import { ABOUT_TEXT } from '@/pages/AboutPage/about-text';
import { PAGE_TITLE } from '@/pages/AboutPage/constants';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('AboutPage', () => {
  test('section a header component', () => {
    render(<AboutPage />);

    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(PAGE_TITLE);
  });

  test('renders the author image with non-empty alt', () => {
    render(<AboutPage />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt');
    expect(image.getAttribute('alt')).not.toEqual('');
  });

  test('displays a loader while the image is loading', () => {
    render(<AboutPage />);

    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();

    const image = screen.getByAltText("Alina's photo");

    fireEvent.load(image);

    expect(screen.getByRole('img')).toHaveClass('opacity-100');
  });

  test('renders text from about text', () => {
    render(<AboutPage />);

    const expectedText = ABOUT_TEXT.split('\n').filter(Boolean);
    const paragraphs = screen.getAllByRole('paragraph');

    expect(paragraphs).toHaveLength(expectedText.length);
  });
});
