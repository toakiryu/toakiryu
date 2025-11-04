import { dynamicClient } from "@/components/ui/client/dynamicClient";
import { Skeleton } from "@/components/ui/shadcn/skeleton";

// Use the project's thin dynamicClient helper for consistent client-only dynamic imports.
const BeamsClient = dynamicClient(
  () => import("./Beams"),
  <div
    role="status"
    aria-busy="true"
    className="w-full h-full flex items-center justify-center"
  >
    <Skeleton className="w-full h-full rounded-2xl" />
  </div>
);

export default function BeamsWrapper(props: any) {
  return <BeamsClient {...props} />;
}
