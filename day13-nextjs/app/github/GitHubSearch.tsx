"use client";

import { useState } from "react";
import { useGitHubUser } from "./useGitHubUser";
import { useGitHubRepos } from "./useGitHubRepos";
import { useDebounce } from "./useDebounce";

export default function GitHubSearch() {
  const [input, setInput] = useState("");

  // Day 9 custom hook — wait 600ms after typing stops
  const debouncedUsername = useDebounce(input, 600);

  // TanStack Query hooks — only fetch when debounced value exists
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    error: userErrorMsg,
  } = useGitHubUser(debouncedUsername);

  const { data: repos, isLoading: reposLoading } =
    useGitHubRepos(debouncedUsername);

  const isLoading = userLoading || reposLoading;
  const showResults = debouncedUsername.length > 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">🔍 GitHub User Search</h1>
      <p className="text-gray-500 mb-6 text-sm">
        Powered by TanStack Query — cached, debounced, auto-retry
      </p>

      {/* Search Input */}
      <div className="relative mb-8">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter GitHub username..."
          className="w-full px-4 py-3 border-2 border-gray-200
            rounded-xl text-lg focus:outline-none
            focus:border-blue-400 transition-colors"
        />
        {isLoading && showResults && (
          <div
            className="absolute right-4 top-4
            text-gray-400 text-sm"
          >
            Loading...
          </div>
        )}
      </div>

      {/* Error State */}
      {userError && showResults && (
        <div
          className="bg-red-50 border border-red-200
          rounded-xl p-4 mb-6 text-center"
        >
          <p className="text-red-500 font-medium">❌ {userErrorMsg?.message}</p>
          <p className="text-gray-500 text-sm mt-1">
            TanStack Query retried 2 times automatically
          </p>
        </div>
      )}

      {/* User Profile */}
      {user && (
        <div
          className="border rounded-xl p-6 mb-6 bg-white
          shadow-sm"
        >
          <div className="flex gap-4 items-start">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-20 h-20 rounded-full border-2
                border-gray-100"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-blue-500 text-sm mb-2">@{user.login}</p>
              {user.bio && (
                <p className="text-gray-600 text-sm mb-3">{user.bio}</p>
              )}
              <div className="flex gap-4 text-sm text-gray-500">
                <span>
                  <strong className="text-gray-800">{user.followers}</strong>{" "}
                  followers
                </span>
                <span>
                  <strong className="text-gray-800">{user.following}</strong>{" "}
                  following
                </span>
                <span>
                  <strong className="text-gray-800">{user.public_repos}</strong>{" "}
                  repos
                </span>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-3 mt-4
            text-sm text-gray-600"
          >
            {user.location && <span>📍 {user.location}</span>}
            {user.company && <span>🏢 {user.company}</span>}
            {user.blog && (
              <a
                href={user.blog}
                className="text-blue-500 hover:underline
                  col-span-2"
              >
                🔗 {user.blog}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Repos */}
      {repos && repos.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-3">📁 Recent Repositories</h3>
          <div className="space-y-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border rounded-xl p-4
                  hover:border-blue-300 hover:bg-blue-50
                  transition-all"
              >
                <div
                  className="flex justify-between
                  items-start"
                >
                  <h4 className="font-semibold text-blue-600">{repo.name}</h4>
                  <span className="text-yellow-500 text-sm">
                    ⭐ {repo.stargazers_count}
                  </span>
                </div>
                {repo.description && (
                  <p
                    className="text-gray-500 text-sm mt-1
                    line-clamp-1"
                  >
                    {repo.description}
                  </p>
                )}
                {repo.language && (
                  <span
                    className="inline-block mt-2 px-2 py-1
                    bg-gray-100 rounded-full text-xs
                    text-gray-600"
                  >
                    {repo.language}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!showResults && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">👆</p>
          <p>Type a GitHub username to search</p>
          <p className="text-sm mt-2">Try: torvalds, gaearon, dan_abramov</p>
        </div>
      )}

      {/* Cache Demo Box */}
      {user && (
        <div
          className="mt-6 bg-blue-50 border border-blue-200
          rounded-xl p-4 text-sm"
        >
          <p className="font-bold text-blue-700 mb-2">
            🧠 TanStack Query Cache Demo
          </p>
          <p className="text-blue-600">
            Search another username, then search
            <strong> {user.login}</strong> again. Notice it loads{" "}
            <strong>instantly</strong> — no API call! Data is cached for 10
            minutes.
          </p>
        </div>
      )}
    </div>
  );
}
