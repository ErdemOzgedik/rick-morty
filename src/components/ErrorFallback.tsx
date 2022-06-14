import React from "react";

interface Props {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

function ErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default ErrorFallback;
