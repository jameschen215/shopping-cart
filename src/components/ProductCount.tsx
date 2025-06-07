import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

type ProductCountPropsType = {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function ProductCount({
  count,
  onIncrement,
  onDecrement,
}: ProductCountPropsType) {
  return (
    <div className="flex items-center">
      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        onClick={onDecrement}
        disabled={count <= 1}
        className="cursor-pointer"
      >
        <Minus />
      </Button>

      <div className="flex size-5 items-center justify-center">{count}</div>

      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        onClick={onIncrement}
        className="cursor-pointer"
      >
        <Plus />
      </Button>
    </div>
  );
}
