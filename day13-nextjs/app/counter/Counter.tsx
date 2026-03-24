"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div
      className="border-2 border-blue-400 rounded-xl 
      p-6 inline-block text-center"
    >
      <p className="text-6xl font-bold mb-4">{count}</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="px-6 py-2 bg-red-100 rounded-lg 
            text-xl hover:bg-red-200"
        >
          −
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-6 py-2 bg-green-100 rounded-lg 
            text-xl hover:bg-green-200"
        >
          +
        </button>
      </div>
      <p className="text-gray-400 text-sm mt-4">
        Client Component — has useState + onClick
      </p>
    </div>
  );
}
