const ErrorMessage = ({ message }) => {
  return (
    <div className="max-w-2xl mx-auto my-8">
      <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-400 px-6 py-4 rounded-lg flex items-center">
        <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;