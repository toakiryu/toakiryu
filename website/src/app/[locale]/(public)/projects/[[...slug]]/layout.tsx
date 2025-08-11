"use server";

export type ProjectsLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}>;

export type ProjectsProps = Readonly<{
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}>;

export default async function ProjectsLayout({
  children,
}: ProjectsLayoutProps) {
  return children;
}
