import { Skeleton } from "@/components/ui/skeleton";

const NewsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
  );
};

export default NewsSkeleton;
