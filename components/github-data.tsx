"use client"

import { useEffect, useState } from "react";
import GitHubRepositories from "./github-repositories";
import StatsLanguages from "./stats-languages";

export type Repository = {
  id: string;
  name: string;
  html_url: string;
  pushed_at: string;
  description?: string;
  homepage?: string;
  language?: string;
};

export default function GitHubData() {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('https://api.github.com/users/d4vss/repos');
        const forzaResponse = await fetch('https://api.github.com/repos/ForzaMods/Website');
        if (!response.ok || !forzaResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        const forzaData = await forzaResponse.json();
        setRepos([...data, forzaData]);
      } catch (err) {
        console.error(err)
      }
    };

    fetchRepositories();
  }, []);

  return (
    <>
      <h2>Projects</h2>
      <GitHubRepositories repos={repos} />

      <h2>Stats</h2>
      <div className="grid grid-cols-1 gap-10 mt-8">
        <div className="border rounded p-4">
          <StatsLanguages repos={repos} />
        </div>
      </div>
    </>
  );
}