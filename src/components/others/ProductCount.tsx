import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type ProductCountPropsType = {
  productId?: number;
  quantity: number;
  onChange: (newQuantity: number, id?: number) => void;
};

export default function ProductCount({
  productId,
  quantity,
  onChange,
}: ProductCountPropsType) {
  const [count, setCount] = useState(quantity);

  function handleDecrement() {
    const newCount = count - 1;
    if (newCount <= 0) return;

    setCount(newCount);

    if (productId) {
      onChange(productId, newCount);
    } else {
      onChange(newCount);
    }
  }

  function handleIncrement() {
    const newCount = count + 1;
    setCount(newCount);

    if (productId) {
      onChange(productId, newCount);
    } else {
      onChange(newCount);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        onClick={handleDecrement}
        disabled={count <= 1}
        className="cursor-pointer"
        aria-label="Decrement by one"
      >
        <Minus aria-hidden="true" />
      </Button>

      <div
        className="flex size-5 items-center justify-center"
        aria-live="polite"
        aria-atomic="true"
        aria-label="Quantity"
        data-testid="quantity"
      >
        {count}
      </div>

      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        onClick={handleIncrement}
        className="cursor-pointer"
        aria-label="Increment by one"
      >
        <Plus aria-hidden="true" />
      </Button>
    </div>
  );
}
