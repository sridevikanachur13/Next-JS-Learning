export default function AboutPage() {
  return (
    <div className="p-10 font-sans">
      <h1 className="text-3xl font-bold mb-4">📖 About Page</h1>
      <p className="text-gray-600 mb-2">This page lives at /about</p>
      <p className="text-gray-600 mb-6">
        I created it just by making a file. Zero router setup!
      </p>
      <a href="/" className="text-blue-500 hover:underline">
        ← Back Home
      </a>
    </div>
  );
}
