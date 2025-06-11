import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CartSkeleton() {
  return (
    <>
      <div className="w-full">
        <Skeleton className="bg-foreground/5 my-8 ml-5 h-12 w-40 text-left" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="bg-foreground/5 h-6 w-6 rounded-xs" />
            </TableHead>
            <TableHead>
              <div className="flex w-full py-2">
                <Skeleton className="bg-foreground/5 h-8 w-20 rounded-sm" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex w-full justify-center py-2">
                <Skeleton className="bg-foreground/5 h-8 w-20 rounded-sm" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex w-full justify-center py-2">
                <Skeleton className="bg-foreground/5 h-8 w-20 rounded-sm" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex w-full justify-center py-2">
                <Skeleton className="bg-foreground/5 h-8 w-20 rounded-sm" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="bg-foreground/5 h-6 w-6 rounded-xs" />
              </TableCell>
              <TableCell className="flex items-center gap-8">
                <Skeleton className="bg-foreground/5 h-20 w-20 rounded-xs" />
                <Skeleton className="bg-foreground/5 h-8 w-40 rounded-xs" />
              </TableCell>
              <TableCell>
                <div className="flex w-full justify-center">
                  <Skeleton className="bg-foreground/5 h-8 w-20 rounded-xs" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex w-full justify-center">
                  <Skeleton className="bg-foreground/5 h-8 w-20 rounded-xs" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex w-full justify-center">
                  <Skeleton className="bg-foreground/5 h-8 w-20 rounded-xs" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={3}>
              <Skeleton className="bg-foreground/5 h-8 w-20 rounded-xs" />
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <Skeleton className="bg-foreground/5 h-8 w-20 rounded-xs" />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="mt-10 mb-10 flex w-full flex-col gap-4 sm:flex-row md:justify-end">
        <Skeleton className="bg-foreground/5 h-8 flex-1 cursor-pointer rounded-xs py-4 md:max-w-[200px]" />
        <Skeleton className="bg-foreground/5 h-8 flex-1 cursor-pointer rounded-xs py-4 md:max-w-[200px]" />
      </div>
    </>
  );
}
