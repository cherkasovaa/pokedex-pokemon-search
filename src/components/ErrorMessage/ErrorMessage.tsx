import type { ErrorMessageProps } from '@/types/interfaces';

export const ErrorMessage = ({
  message = 'An unexpected error occurred. Please try again later',
}: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full  ">
      <div className="text-center p-8 bg-neutral-600 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-2 text-gray-100">
          Something went wrong
        </h3>
        <p className="text-lg text-gray-300">{message}</p>
      </div>
    </div>
  );
};
