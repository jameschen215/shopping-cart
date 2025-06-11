import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsSkeleton() {
  return (
    <>
      <Skeleton className="h-12 w-full" />

      <div className="my-6 grid w-full [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))] place-items-center gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-2 rounded-sm border-none p-4 shadow-lg"
          >
            <Skeleton className="bg-foreground/5 aspect-square w-full" />
            <div className="flex items-center justify-between">
              <Skeleton className="bg-foreground/5 h-8 w-1/3" />
              <Skeleton className="bg-foreground/5 h-5 w-1/2" />
            </div>
            <Skeleton className="bg-foreground/5 h-6 w-full" />
          </div>
        ))}
      </div>
    </>
  );
}
