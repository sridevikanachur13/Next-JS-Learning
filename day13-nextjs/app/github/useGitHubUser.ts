import { useQuery } from "@tanstack/react-query";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string;
  blog: string;
  company: string;
}

async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ["github-user", username], // unique per username
    queryFn: () => fetchGitHubUser(username),
    enabled: username.length > 0, // don't fetch if empty
    staleTime: 1000 * 60 * 10, // fresh for 10 minutes
  });
}
