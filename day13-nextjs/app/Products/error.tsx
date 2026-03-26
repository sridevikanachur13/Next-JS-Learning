"use client";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-10 text-center">
      <p className="text-6xl mb-4">😵</p>
      <h2 className="text-2xl font-bold text-red-500 mb-2">
        Failed to load products
      </h2>
      <p className="text-gray-500 mb-6 text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-blue-500 text-white 
          rounded-lg hover:bg-blue-600"
      >
        🔄 Try Again
      </button>
    </div>
  );
}
