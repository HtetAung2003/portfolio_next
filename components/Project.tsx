"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ExternalLink, GitFork, Star } from "lucide-react";

const GITHUB_USERNAME = "HtetAung2003";

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics : [];
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const Project = () => {
  const [projects, setProjects] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
        );

        if (!response.ok) {
          throw new Error("Could not load GitHub projects");
        }

        const data = (await response.json()) as GithubRepo[];

        setProjects(data.filter((repo) => !repo.name.includes(".github")));

      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);


  return (
    <section className="relative mt-16 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] px-4 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        {/*<div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(89,222,202,0.18),transparent_34%,rgba(148,234,255,0.12)_68%,transparent)]" />*/}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
        {/*<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />*/}
        {/*<div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />*/}
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-martian-mono text-xs uppercase tracking-widest text-primary">
              GitHub
            </p>
            <h3 className="mt-2">Projects</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-light-200 sm:text-base">
              Recently updated repositories pulled live from my GitHub account.
            </p>
          </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-sm text-light-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition hover:border-primary/70 hover:bg-primary/10 hover:text-primary"
        >
          View profile
          <ExternalLink size={16} />
        </a>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="min-h-[230px] animate-pulse rounded-lg border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl"
            >
              <div className="mb-5 h-5 w-2/3 rounded bg-white/10" />
              <div className="mb-3 h-3 w-full rounded bg-white/10" />
              <div className="h-3 w-4/5 rounded bg-white/10" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-white/10 bg-white/[0.07] p-5 text-light-100 backdrop-blur-xl">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.html_url}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[240px] flex-col justify-between rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-white/[0.1] hover:shadow-[0_18px_50px_rgba(89,222,202,0.12)]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="break-words text-lg font-semibold text-white transition group-hover:text-primary sm:text-xl">
                    {project.name}
                  </h4>
                  <ExternalLink
                    size={18}
                    className="mt-1 shrink-0 text-light-200 transition group-hover:text-primary"
                  />
                </div>
                <p className="line-clamp-3 text-sm leading-6 text-light-200">
                  {project.description ?? "A GitHub project from my portfolio."}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3 text-sm text-light-200">
                  {project.topics && project.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.topics.slice(0, 3).map((topic : any) => (
                            <span
                                key={topic}
                                className="rounded-md border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-light-100"
                            >
                        {topic}
                      </span>
                        ))}
                      </div>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Star size={15} />
                    {project.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork size={15} />
                    {project.forks_count}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-xs text-light-200">
                  <CalendarDays size={15} />
                  Updated {formatDate(project.updated_at)}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
      </div>
    </section>
  );
};

export default Project;
