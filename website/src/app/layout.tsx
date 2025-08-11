import SiteProvider from "@/src/provider/site";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteProvider />
      {children}
    </>
  );
}
