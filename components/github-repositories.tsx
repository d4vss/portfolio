"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { gsap } from "gsap";

type Repository = {
  id: string;
  name: string;
  html_url: string;
  pushed_at: string;
  description?: string;
  homepage?: string;
};

export default function GitHubRepositories() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef<HTMLDivElement>(null);

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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  var animation: any = null;

  useEffect(() => {
    if (repos.length > 0 && containerRef.current) {
      const totalWidth = repos.length * 750;
      const ctx = gsap.context(() => {
        animation = gsap.fromTo(
          containerRef.current,
          { xPercent: 0 },
          {
            xPercent: -100,
            ease: "none",
            repeat: -1,
            duration: totalWidth / 100
          }
        );
        
        return () => animation.kill();
      }, containerRef);

      return () => ctx.revert();
    }
  }, [repos]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-20 max-md:hidden" ref={containerRef} 
           onMouseEnter={() => animation?.pause()} 
           onMouseLeave={() => animation?.resume()}>
        {[...repos, ...repos].map((repo: Repository, index: number) => (
          <Card key={index} className="flex flex-col justify-between rounded-sm w-[500px] flex-shrink-0">
            <div>
              <CardHeader className="p-4">
                <CardTitle className="text-xl capitalize">{repo.name.replaceAll("-", " ")}</CardTitle>
                <CardDescription>
                  Last time pushed: {new Date(repo.pushed_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p>{repo.description || 'No description provided.'}</p>
              </CardContent>
            </div>
            <CardFooter className="flex gap-2 p-4">
              <Button className="w-full self-end" asChild>
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  View repository
                </Link>
              </Button>
              {repo.homepage && 
                <Button variant="outline" className="w-full self-end" asChild>
                  <Link href={repo.homepage} target="_blank" rel="noopener noreferrer">
                    View Live
                  </Link>
                </Button>
              }
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className="md:hidden mt-10 mb-5">Public projects</h2>
      <div className="flex flex-col gap-5 md:hidden">
        {repos.map((repo: Repository) => (
          <Card key={repo.id} className="flex flex-col justify-between rounded-sm flex-shrink-0">
            <div>
              <CardHeader className="p-4">
                <CardTitle className="text-xl capitalize">{repo.name.replaceAll("-", " ")}</CardTitle>
                <CardDescription>
                  Last time pushed: {new Date(repo.pushed_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p>{repo.description || 'No description provided.'}</p>
              </CardContent>
            </div>
            <CardFooter className="flex gap-2 p-4">
              <Button className="w-full self-end" asChild>
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  View repository
                </Link>
              </Button>
              {repo.homepage && 
                <Button variant="outline" className="w-full self-end" asChild>
                  <Link href={repo.homepage} target="_blank" rel="noopener noreferrer">
                    View Live
                  </Link>
                </Button>
              }
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
