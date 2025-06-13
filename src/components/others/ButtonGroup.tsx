import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TButtonGroupProps = {
  className?: string;
  children: ReactNode;
};

export default function ButtonGroup({
  className,
  children,
}: TButtonGroupProps) {
  return (
    <div
      className={cn("my-10 flex w-full flex-col gap-4 md:flex-row", className)}
    >
      {children}
    </div>
  );
}
