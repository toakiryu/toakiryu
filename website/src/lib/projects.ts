"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "_projects");

export async function getProjectSlugs() {
  return fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));
}

export async function getProjectBySlug(slug: string) {
  const realSlug = slug;
  const fullPath = path.join(projectsDir, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data,
    content,
  };
}
