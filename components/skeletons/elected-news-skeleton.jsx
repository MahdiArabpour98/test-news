import { Skeleton } from "@/components/ui/skeleton";

const ElectedNewsSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-2">
        <Skeleton className="h-20 w-24 rounded-full" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
      <div className="flex w-full gap-2">
        <Skeleton className="h-20 w-24 rounded-full" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
      <div className="flex w-full gap-2">
        <Skeleton className="h-20 w-24 rounded-full" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default ElectedNewsSkeleton;
