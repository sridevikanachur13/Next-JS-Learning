// We prove caching by fetching a RANDOM joke API
// If cached → same joke every refresh
// If dynamic → different joke every refresh

async function getCachedJoke() {
  const res = await fetch(
    "https://official-joke-api.appspot.com/random_joke",
    { next: { revalidate: 60 } }, // ISR — same joke for 60s
  );
  return res.json();
}

async function getDynamicJoke() {
  const res = await fetch(
    "https://official-joke-api.appspot.com/random_joke",
    { cache: "no-store" }, // Fresh joke every request
  );
  return res.json();
}

async function getStaticJoke() {
  const res = await fetch(
    "https://official-joke-api.appspot.com/random_joke",
    { cache: "force-cache" }, // ← explicitly static now
  );
  return res.json();
}

export default async function TimePage() {
  const [staticJoke, isrJoke, dynamicJoke] = await Promise.all([
    getStaticJoke(),
    getCachedJoke(),
    getDynamicJoke(),
  ]);

  return (
    <div className="p-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">🎭 Caching Strategies Demo</h1>
      <p className="text-gray-500 mb-2">
        Refresh the page rapidly and watch which jokes change.
      </p>
      <div
        className="bg-yellow-50 border border-yellow-200 
        rounded-lg p-3 mb-8 text-sm text-yellow-800"
      >
        ⚠️ Must run <code className="font-mono">npm run build</code> then{" "}
        <code className="font-mono">npm run start</code> to see real caching.
        Dev mode disables caching.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Static */}
        <div className="border-2 border-gray-300 rounded-xl p-6">
          <h2 className="font-bold text-gray-600 mb-1">⚪ Static</h2>
          <p className="text-xs text-gray-400 mb-4">
            Fetched ONCE at build time. Same joke forever until you rebuild.
          </p>
          <div className="bg-gray-50 p-3 rounded-lg min-h-24">
            <p className="text-sm font-medium mb-2">{staticJoke.setup}</p>
            <p className="text-sm text-gray-500 italic">
              {staticJoke.punchline}
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-3 font-medium">
            🔁 Refresh many times → joke NEVER changes
          </p>
        </div>

        {/* ISR */}
        <div className="border-2 border-blue-300 rounded-xl p-6">
          <h2 className="font-bold text-blue-600 mb-1">🔵 ISR (60s)</h2>
          <p className="text-xs text-gray-400 mb-4">
            Same joke for 60 seconds. Then quietly gets a new one.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg min-h-24">
            <p className="text-sm font-medium mb-2">{isrJoke.setup}</p>
            <p className="text-sm text-gray-500 italic">{isrJoke.punchline}</p>
          </div>
          <p className="text-xs text-gray-400 mt-3 font-medium">
            🔁 Refresh rapidly → same joke. Wait 60s → new joke
          </p>
        </div>

        {/* Dynamic */}
        <div className="border-2 border-green-300 rounded-xl p-6">
          <h2 className="font-bold text-green-600 mb-1">🟢 Dynamic</h2>
          <p className="text-xs text-gray-400 mb-4">
            Fresh joke on EVERY request. Never cached.
          </p>
          <div className="bg-green-50 p-3 rounded-lg min-h-24">
            <p className="text-sm font-medium mb-2">{dynamicJoke.setup}</p>
            <p className="text-sm text-gray-500 italic">
              {dynamicJoke.punchline}
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-3 font-medium">
            🔁 Refresh rapidly → joke changes EVERY time
          </p>
        </div>
      </div>

      {/* The key insight */}
      <div className="border rounded-xl p-6 bg-gray-50">
        <h2 className="font-bold mb-3">🧠 What This Proves</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            ⚪ <strong>Static</strong> — joke is baked into the HTML at build
            time. Zero fetch on each request.
          </p>
          <p>
            🔵 <strong>ISR</strong> — joke is cached. Next.js serves the cached
            version instantly, refreshes in background after 60s.
          </p>
          <p>
            🟢 <strong>Dynamic</strong> — new fetch every single request. Always
            fresh, slightly slower.
          </p>
        </div>
      </div>

      <a href="/" className="text-blue-500 hover:underline mt-8 block">
        ← Back Home
      </a>
    </div>
  );
}

//Development mode:
// → Next.js DISABLES all caching
// → Every fetch is fresh on every request
// → So Static, ISR, Dynamic all behave the same
// → Timestamps change every refresh

// Production mode:
// → Caching works correctly
// → Static = never changes
// → ISR = changes every 30s
// → Dynamic = changes every refresh
