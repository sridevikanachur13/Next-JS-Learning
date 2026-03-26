export default function ProductsLoading() {
  return (
    <div className="p-10">
      <div
        className="h-8 w-64 bg-gray-200 rounded-lg 
        animate-pulse mb-8"
      />
      <div
        className="grid grid-cols-1 md:grid-cols-3 
        lg:grid-cols-4 gap-6"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border rounded-xl p-4 space-y-3">
            <div
              className="h-3 bg-gray-200 rounded 
              animate-pulse w-1/3"
            />
            <div
              className="h-4 bg-gray-200 rounded 
              animate-pulse"
            />
            <div
              className="h-4 bg-gray-200 rounded 
              animate-pulse w-2/3"
            />
            <div
              className="h-6 bg-gray-200 rounded 
              animate-pulse w-1/4 mt-2"
            />
            <div
              className="h-9 bg-gray-200 rounded-lg 
              animate-pulse mt-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
