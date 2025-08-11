"use server";

import siteConfig from "@/richtpl.config";

import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { getProjectBySlug } from "@/src/lib/projects";
import {
  IconBrandGithub,
  IconCalendar,
  IconStopwatch,
} from "@tabler/icons-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/shadcn/breadcrumb";
import { Button } from "@/src/components/ui/shadcn/button";
import { Separator } from "@/src/components/ui/shadcn/separator";
import { Badge } from "@/src/components/ui/shadcn/badge";
import { AspectRatio } from "@/src/components/ui/shadcn/aspect-ratio";
import { Card } from "@/src/components/ui/shadcn/card";
import { MarkdownRenderer } from "@/src/components/ui/markdown/render";
import { LinkButton } from "@/src/components/custom/link-button";

import readingTime from "reading-time";

import { ProjectsProps } from "./layout";

export async function generateMetadata({ params }: ProjectsProps) {
  const { locale, slug } = await params;
  const { meta: metadata } = await getProjectBySlug(slug);
  const header = await headers();
  const pathname = header.get("x-pathname") || "";
  const isLangRoot = pathname === `/${locale}` || pathname === `/${locale}/`;

  if (isLangRoot) {
    delete metadata?.title;
  }

  const meta: Metadata = {
    openGraph: {
      type: "profile",
      ...metadata?.openGraph,
    },
    twitter: {
      card: "summary",
      ...metadata?.twitter,
    },
    ...metadata,
  };

  return meta;
}

export default async function ProjectPage({ params }: ProjectsProps) {
  const { locale, slug } = await params;
  if (!slug) return notFound();

  try {
    const { content, meta } = await getProjectBySlug(slug);
    const readStats = readingTime(content);

    return (
      <section className="py-32">
        <div className="container w-full h-full mx-auto px-5">
          <div className="mx-auto max-w-7xl">
            <Breadcrumb className="mb-6 lg:mb-10">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>projects</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{slug}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative flex-col gap-10 lg:flex lg:flex-row lg:justify-between">
              <div className="lg:max-w-[692px]">
                <div className="max lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">
                      <IconCalendar />
                      {new Date(meta?.modified).toLocaleDateString(
                        siteConfig.i18n.localeConfigs[locale].htmlLang
                      )}
                    </Badge>
                    <Badge variant="secondary">
                      <IconStopwatch />
                      {readStats.text}
                    </Badge>
                  </div>
                  <article className="markdown">
                    <MarkdownRenderer content={content} />
                  </article>
                </div>
              </div>
              <Separator className="lg:hidden my-5" />
              <div className="h-fit lg:sticky lg:top-8 lg:max-w-80">
                <div className="mb-4">
                  <AspectRatio ratio={2 / 1}>
                    <Card className="group relative flex items-center justify-center gap-0 w-full h-full py-0 overflow-hidden">
                      <img
                        alt="GitHub Repo Image"
                        src={`https://opengraph.githubassets.com/main/${meta?.repo}`}
                        className="w-full h-full dark:grayscale-75 bg-cover bg-center bg-no-repeat"
                      />
                    </Card>
                  </AspectRatio>
                </div>
                <p className="mb-1.5 text-sm font-semibold">Overview</p>
                <p className="text-muted-foreground mb-5 text-sm">
                  {meta?.description}
                </p>
                <p className="mb-1.5 text-sm font-semibold">Category</p>
                <div className="flex flex-wrap gap-1 text-muted-foreground mb-5 text-sm">
                  {(meta?.category as string)
                    .split(",")
                    .map((c: string, index: number) => {
                      return (
                        <Badge key={index} variant="secondary">
                          {c}
                        </Badge>
                      );
                    })}
                </div>
                <p className="mb-1.5 text-sm font-semibold">Topics</p>
                <div className="flex flex-wrap gap-1 text-muted-foreground mb-5 text-sm">
                  {(meta?.tags as string)
                    .split(",")
                    .map((tag: string, index: number) => {
                      return (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-500 text-white dark:bg-blue-600"
                        >
                          {tag}
                        </Badge>
                      );
                    })}
                </div>
                <p className="mb-1.5 text-sm font-semibold">Source code</p>
                <LinkButton
                  href={`https://github.com/${meta?.repo}`}
                  size="sm"
                  variant="outline"
                >
                  <IconBrandGithub className="opacity-60" />
                  GitHub
                </LinkButton>
                <Separator className="my-5" />
                <p className="mb-3 text-sm font-semibold">
                  Want to learn more?
                </p>
                <Button size="sm">Contact us</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (e) {
    console.error(e);
    return notFound();
  }
}
