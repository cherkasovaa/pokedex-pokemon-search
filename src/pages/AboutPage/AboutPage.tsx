import { ABOUT_TEXT } from '@/pages/AboutPage/about-text';
import { parseTextToJSX } from '@/utils/parseTextToJSX';

export const AboutPage = () => {
  const textChunks = ABOUT_TEXT.split('\n').filter(Boolean);
  return (
    <section className="py-8">
      <h1 className="text-3xl sm:text-4xl font-medium mb-10">
        Pokédex: About the Project
      </h1>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="overflow-hidden rounded-lg shadow-2xl lg:w-1/3">
          <img
            src="/my-photo.jpg"
            alt="Alina's photo"
            className="h-full w-full object-cover"
          />
        </div>

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
      </div>
    </section>
  );
};
