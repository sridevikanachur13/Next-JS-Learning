import Counter from "./Counter";

export default function CounterPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-2">🔢 Counter Page</h1>
      <p className="text-gray-500 mb-6">
        This page is a Server Component — it has no useState. The interactive
        part below is a separate Client Component.
      </p>
      <Counter />
    </div>
  );
}
