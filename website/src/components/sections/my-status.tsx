"use client";

import React, { useEffect, useState } from "react";

import Link from "../custom/link";

import { FlickeringGrid } from "../magicui/flickering-grid";
import { IconBrandGithub } from "@tabler/icons-react";
import { NumberTicker } from "../magicui/number-ticker";

async function fetchGitHubStats() {
  const username = "toakiryu";

  try {
    // ユーザー情報取得（フォロワー数）
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error("Failed to fetch user data");
    const userData = await userRes.json();
    const followers = userData.followers ?? "?";

    // 全リポジトリ取得（スター数合計）
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    if (!reposRes.ok) throw new Error("Failed to fetch repos");
    const repos = await reposRes.json();
    const stars = Array.isArray(repos)
      ? repos.reduce(
          (acc: number, repo: any) => acc + (repo.stargazers_count || 0),
          0
        )
      : "?";

    // メインリポジトリのコミット数（過去1年）
    const mainRepo =
      Array.isArray(repos) && repos.length > 0 ? repos[0].name : null;
    let commits: string = "?";
    if (mainRepo) {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${username}/${mainRepo}/stats/commit_activity`
      );
      if (commitsRes.ok) {
        const commitData = await commitsRes.json();
        if (Array.isArray(commitData)) {
          commits = commitData
            .reduce((acc, week) => acc + week.total, 0)
            .toString();
        }
      }
    }

    return { followers, stars, commits };
  } catch (error) {
    console.error("GitHub API fetch error:", error);
    return { followers: "?", stars: "?", commits: "?" };
  }
}

// 数字を K+, M+ 表記に変換（エラー時はそのまま）
const formatNumber = (num: number | string) => {
  if (typeof num === "string") return num;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M+`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K+`;
  return num.toString();
};

function SectionMyStatus() {
  const [stats, setStats] = useState({
    followers: "?",
    stars: "?",
    commits: "?",
  });

  useEffect(() => {
    fetchGitHubStats().then(setStats);
  }, []);

  const items = [
    {
      label: "GitHub Followers",
      value: stats.followers,
      link: "https://github.com/toakiryu?tab=followers",
    },
    {
      label: "GitHub Stars",
      value: stats.stars,
      link: "https://github.com/toakiryu?tab=repositories",
    },
    {
      label: "Commits (Last Year)",
      value: stats.commits,
      link: "https://github.com/toakiryu",
    },
  ];

  return (
    <section id="my-status">
      <div className="relative container max-w-5xl px-4">
        <div className="z-0 text-center relative mx-auto border-x border-t overflow-hidden p-2 py-8 md:p-12">
          <h2 className="text-sm text-muted-foreground text-balance font-semibold tracking-tight uppercase">
            My Status
          </h2>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full bg-gradient-to-t from-background dark:from-background -z-10 from-50%" />
          <FlickeringGrid
            className="w-full h-full -z-20 absolute inset-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        </div>
        <div className="border-x border-t bg-[radial-gradient(circle_at_bottom_center,_hsl(var(--secondary)_/_0.4),_hsl(var(--background)))]">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {items.map((item, index) => (
              <Link
                key={index}
                className="text-muted-foreground flex flex-col items-center justify-center py-8 px-4 border-b sm:border-b-0 last:border-b-0 sm:border-r sm:last:border-r-0 [&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(-n+3)]:border-t-0 relative group overflow-hidden"
                href={item.link}
              >
                <div className="text-center relative">
                  <div className="flex items-center justify-center">
                    {item.value === "?" ? (
                      <span className="relative font-mono text-center text-[6rem] font-bold leading-none">
                        ?
                      </span>
                    ) : (
                      <>
                        <NumberTicker
                          value={parseFloat(formatNumber(item.value))}
                          className="relative font-mono pointer-events-none text-center text-[6rem] font-bold leading-none"
                        />
                        <span className="text-[2rem] font-bold ml-1">
                          {formatNumber(item.value).replace(/[0-9.]/g, "")}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <IconBrandGithub />
                    <p className="text-sm">{item.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionMyStatus;
