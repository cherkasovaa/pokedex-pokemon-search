import { ABOUT_TEXT } from '@/pages/AboutPage/about-text';
import { PAGE_TITLE } from '@/pages/AboutPage/constants';
import { parseTextToJSX } from '@/utils/parseTextToJSX';
import { useState } from 'react';

export const AboutPage = () => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const textChunks = ABOUT_TEXT.split('\n').filter(Boolean);

  return (
    <section className="py-8">
      <h1 className="text-3xl sm:text-4xl font-medium mb-10">{PAGE_TITLE}</h1>

      <div className="flex flex-col gap-10 lg:flex-row">
        {imageIsLoading && (
          <div
            role="status"
            className="absolute inset-0 flex items-center justify-center bg-primary animate-pulse z-10"
          />
        )}

        <div className="overflow-hidden rounded-lg shadow-2xl lg:w-1/3">
          <img
            src="/my-photo.jpg"
            alt="Alina's photo"
            className={`h-full w-full object-cover ${imageIsLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setImageIsLoading(false)}
            onError={() => setImageIsLoading(false)}
          />
        </div>

        {textChunks.length && (
          <div className="lg:w-2/3">
            {textChunks.map((chunk) => {
              const text = parseTextToJSX(chunk);

              return (
                <p key={chunk} className="mb-3">
                  {text}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
