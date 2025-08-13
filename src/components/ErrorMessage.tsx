interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-center py-8 text-red-600">
    <p className="text-lg font-semibold">Oops! Something went wrong</p>
    <p className="text-sm mt-2">{message}</p>
  </div>
);