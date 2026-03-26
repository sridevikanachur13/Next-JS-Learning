export default function HomePage() {
  return (
    <div className="p-10 font-sans">
      <h1 className="text-3xl font-bold mb-4">🏠 Home Page</h1>
      <p className="text-gray-600 mb-6">Welcome to my Next.js app!</p>
      <nav className="flex gap-6">
        <a href="/about" className="text-blue-500 hover:underline">
          About
        </a>
        <a href="/users" className="text-blue-500 hover:underline">
          Users
        </a>
        <a href="/counter" className="text-blue-500 hover:underline">
          Counter
        </a>
        <a href="/Products" className="text-blue-500 hover:underline">
          Products
        </a>
        <a href="/dashboard" className="text-blue-500 hover:underline">
          Dashboard
        </a>
        <a href="/time" className="text-blue-500 hover:underline">
          Time
        </a>
      </nav>
    </div>
  );
}
