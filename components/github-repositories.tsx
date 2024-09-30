"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Skeleton } from "./ui/skeleton";
import { Repository } from "./github-data";

gsap.registerPlugin(TextPlugin);

const generateRandomString = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export default function GitHubRepositories({ repos } : { repos: Repository[] }) {
  const repoRefs = useRef<HTMLAnchorElement[]>([]);


  useLayoutEffect(() => {
    if (repos.length > 0) {
      repoRefs.current.forEach((repoEl, index) => {
        if (repoEl) {
          const nameEl = repoEl.querySelector('.repo-name') as HTMLElement;
          const descEl = repoEl.querySelector('.repo-desc') as HTMLElement;
          const dateEl = repoEl.querySelector('.repo-date') as HTMLElement;

          gsap.fromTo(
            nameEl,
            { text: generateRandomString(nameEl.innerText.length), duration: 1 },
            { text: nameEl.innerText, duration: 1, delay: index * 0.1 }
          );
          if (descEl) {
            gsap.fromTo(
              descEl,
              { text: generateRandomString(descEl.innerText.length), duration: 1 },
              { text: descEl.innerText, duration: 1, delay: index * 0.1 + 0.1 }
            );
          }
          gsap.fromTo(
            dateEl,
            { text: generateRandomString(dateEl.innerText.length), duration: 1 },
            { text: dateEl.innerText, duration: 1, delay: index * 0.1 + 0.2 }
          );
        }
      });
    }
  }, [repos]);

  return (
    <div className="overflow-hidden w-full mt-4">
      <div className="flex flex-col gap-3 items-stretch relative">
        {repos == null &&
          Array.from({ length: 4 }).map((_, index: number) => (
            <div key={index} className="py-2 px-3 flex gap-4 items-center">
              <Skeleton className="w-32 h-7 rounded-sm flex-shrink-0" />
              <Skeleton className="w-3/5 h-7 rounded-sm flex-shrink-0" />
              <div className="border-t border-neutral-400 w-full"></div>
              <Skeleton className=" w-10 h-7 rounded-sm flex-shrink-0" />
            </div>
          ))}
        {repos.map((repo: Repository, index: number) => (
          <a
          href={repo.html_url}
          target="_blank"
          className="flex gap-3 items-center py-2 px-3 hover:bg-accent"
          ref={(el: HTMLAnchorElement | null) => {
            if (el) {
              repoRefs.current[index] = el;
            }
          }}
          key={repo.id}
        >
            <p className="capitalize !mb-0 font-medium flex-shrink-0 repo-name">
              {repo.name.replaceAll("-", " ")}
            </p>
            <p className="muted !mb-0 large text-md font-medium flex-shrink repo-desc overflow-hidden text-ellipsis whitespace-nowrap">
              {repo.description || "No description."}
            </p>
            <div className="border-t border-neutral-400 w-full"></div>
            <p className="muted !mb-0 large text-md font-medium flex-shrink-0 repo-date">
              {new Date(repo.pushed_at).getMonth() + 1}{" "}
              {"'" + new Date(repo.pushed_at).getFullYear().toString().substring(2, 4)}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
