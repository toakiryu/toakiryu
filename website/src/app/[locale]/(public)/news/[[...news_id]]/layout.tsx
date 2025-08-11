"use server";

export type NewsLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
    news_id: string;
  }>;
}>;

export type NewsPropsPromise = Readonly<{
  params: Promise<{
    locale: string;
    news_id: string;
  }>;
}>;

export type NewsProps = Readonly<{
  params: {
    locale: string;
    news_id: string;
  };
}>;

export default async function NewsLayout({ children }: NewsLayoutProps) {
  return children;
}
