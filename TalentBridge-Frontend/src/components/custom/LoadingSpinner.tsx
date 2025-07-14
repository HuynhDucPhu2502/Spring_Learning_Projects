type LoadingSpinnerProps = {
  className?: string;
};

const LoadingSpinner = ({ className = "w-6 h-6" }: LoadingSpinnerProps) => {
  return (
    <div
      className={`${className} animate-spin rounded-full border-b-2 border-blue-600`}
    />
  );
};

export default LoadingSpinner;
