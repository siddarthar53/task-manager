const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-7 h-7 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full border-ink-600 border-t-accent animate-spin ${className}`}
    />
  );
};

export const FullPageLoader = () => (
  <div className="min-h-screen bg-ink-900 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Spinner size="lg" />
      <p className="text-ink-400 text-sm font-body">Loading...</p>
    </div>
  </div>
);

export default Spinner;
