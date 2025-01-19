"use server";

import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { lazyImport } from "@/components/lazyImport";

const ProjectsContentTitle = lazyImport(() => import("./title"))
const ProjectsContent = lazyImport(() => import("./projectsContent"))

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale();
  const t = await getTranslations({
    locale,
    namespace: "pages.projects.metadata",
  });
  return {
    title: t("title"),
  };
}

export default async function PageProjects() {
  return (
    <div>
      <ProjectsContentTitle />
      <div className="my-10">
        <ProjectsContent />
      </div>
    </div>
  );
}
