import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  TypographyH1,
  TypographyH2,
  TypographyMuted,
} from "@/components/typography";
import { Button } from "@/components/ui/button";

import { useCart } from "@/lib/hooks";
import { formatCurrency } from "@/lib/utils";
import StarRating from "@/pages/product/components/StarRating";
import ProductCount from "@/components/product-count";
import type { ProductType } from "@/lib/types";

export function ProductDetails({ product }: { product: ProductType }) {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  const { cartItems, setCartItems } = useCart();

  function handleCountChange(newCount: number) {
    setCount(newCount);
  }

  function handleSubmit() {
    // Add to cart, todo:
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + count }
            : item,
        );
      } else {
        return [...prev, { product, quantity: count }];
      }
    });

    // display add result
    toast.success("Item has been added to cart.", {
      action: {
        label: "Go to Cart",
        onClick: () => navigate("/cart"),
      },
    });

    console.log(cartItems);
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

      <Form className="flex justify-between" onSubmit={handleSubmit}>
        <ProductCount quantity={count} onChange={handleCountChange} />

        <Button type="submit" className="cursor-pointer rounded-xs">
          Add to Cart
        </Button>
      </Form>
    </div>
  );
}
