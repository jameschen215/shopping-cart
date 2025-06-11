import { Skeleton } from "../ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-10 py-10 md:flex-row">
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <Skeleton className="bg-foreground/5 aspect-square w-2/3" />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-8 px-2 md:px-5">
        <Skeleton className="bg-card-foreground/5 h-10 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="bg-card-foreground/5 h-5 w-[95%]" />
          <Skeleton className="bg-card-foreground/5 h-5 w-[90%]" />
          <Skeleton className="bg-card-foreground/5 h-5 w-[94%]" />
          <Skeleton className="bg-card-foreground/5 h-5 w-1/2" />
        </div>

        <div className="flex items-end justify-between">
          <Skeleton className="bg-card-foreground/5 h-10 w-1/3" />
          <Skeleton className="bg-card-foreground/5 h-6 w-1/3" />
        </div>

        <div className="flex items-end gap-1">
          <Skeleton className="bg-card-foreground/5 h-10 w-10" />
          <Skeleton className="bg-card-foreground/5 h-10 w-10" />
          <Skeleton className="bg-card-foreground/5 h-10 w-10" />
          <Skeleton className="bg-card-foreground/5 ml-auto h-10 w-30" />
        </div>
      </div>
    </div>
  );
}
