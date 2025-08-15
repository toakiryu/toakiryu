"use server";

import axios from "axios";
import { descTimeSort } from "../sort";
import { getGithubHeader } from "@/src/lib/github";

export const githubGetRepos = async (username?: string) => {
  const res = await axios(`https://api.github.com/users/${username}/repos`, {
    headers: {
      ...(await getGithubHeader()),
    },
  });
  const repos: any[] = res.data;
  repos.filter((repo) => repo.visibility === "public");
  repos.sort((a: any, b: any) => descTimeSort(a.updated_at, b.updated_at));
  return repos;
};

export const githubGetRepoInfo = async (full_name?: string) => {
  const res = await axios(`https://api.github.com/repos/${full_name}`, {
    headers: {
      ...(await getGithubHeader()),
    },
  });
  return res.data;
};
