"use server";

export async function getGithubToken() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    throw new Error("ENV に GITHUB_TOKEN を設定してください。");
  }
  return GITHUB_TOKEN;
}

export async function getGithubHeader() {
  const token = await getGithubToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}