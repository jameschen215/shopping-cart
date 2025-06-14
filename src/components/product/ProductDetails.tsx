import { useState } from "react";

import {
  TypographyH1,
  TypographyH2,
  TypographyMuted,
} from "@/components/typography";
import { Button } from "@/components/ui/button";

import type { ProductType } from "@/lib/types";
import { useAddToCart } from "@/lib/hooks";
import { formatCurrency } from "@/lib/utils";
import StarRating from "@/components/others/StarRating";
import ProductCount from "@/components/others/ProductCount";

export function ProductDetails({ product }: { product: ProductType }) {
  const [count, setCount] = useState(1);
  const { addToCart } = useAddToCart();

  function handleCountChange(newCount: number) {
    setCount(newCount);
  }

  function handleAddToCart() {
    addToCart(product, count);
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-8 px-2 md:px-5">
      <TypographyH2 className="text-2xl md:text-3xl">
        {product.title}
      </TypographyH2>

      <TypographyMuted className="text-foreground/85 text-base">
        {product.description}
      </TypographyMuted>

      <div className="flex items-end justify-between">
        <TypographyH1 className="text-3xl md:text-4xl lg:text-4xl">
          {formatCurrency(product.price)}
        </TypographyH1>

        <StarRating rate={product.rating.rate} count={product.rating.count} />
      </div>

      <div className="flex justify-between">
        <ProductCount quantity={count} onChange={handleCountChange} />

        <Button
          type="submit"
          className="cursor-pointer rounded-xs"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
