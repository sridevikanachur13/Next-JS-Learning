import { useQuery } from "@tanstack/react-query";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
  );
  if (!res.ok) throw new Error("Could not fetch repos");
  return res.json();
}

export function useGitHubRepos(username: string) {
  return useQuery({
    queryKey: ["github-repos", username], // separate cache from user
    queryFn: () => fetchGitHubRepos(username),
    enabled: username.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
