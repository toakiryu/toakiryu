import { Suspense } from "react";
import ClientContent from "./client";
import Loading from "../loading";

export default async function DashboardNewsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ClientContent />
    </Suspense>
  );
}
