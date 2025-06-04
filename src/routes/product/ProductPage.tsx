import {
  TypographyH1,
  TypographyH2,
  TypographyMuted,
} from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProductType } from "@/data/data-type";
import { formatCurrency, formatNumberToK } from "@/lib/utils";
import { Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProductPage() {
  const { product }: { product: ProductType } = useLoaderData();

  return (
    <div className="flex w-full flex-1 flex-col gap-10 py-10 md:flex-row">
      <ImageWrapper product={product} />

      <ProductDetails product={product} />
    </div>
  );
}

function ImageWrapper({ product }: { product: ProductType }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-[75%] md:w-[85%]">
        <img
          src={product.image}
          alt={product.title}
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}

function ProductDetails({ product }: { product: ProductType }) {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  function handleIncrement() {
    setCount((prev) => prev + 1);
  }

  function handleDecrement() {
    const newCount = count - 1;
    if (newCount <= 0) return;
    setCount(newCount);
  }

  function handleSubmit() {
    toast.success("Item has been added to cart.", {
      action: {
        label: "Go to Cart",
        onClick: () => navigate("/cart"),
      },
    });
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
        <TypographyH1 className="text-3xl text-blue-500 md:text-4xl lg:text-4xl">
          {formatCurrency(product.price)}
        </TypographyH1>

        <StarRating rate={product.rating.rate} count={product.rating.count} />
      </div>

      <Form className="flex justify-between" onSubmit={handleSubmit}>
        <ProductCount
          count={count}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />

        <Button
          type="submit"
          className="cursor-pointer rounded-xs bg-blue-500 hover:bg-blue-500 hover:brightness-95"
        >
          Add to Cart
        </Button>
      </Form>
    </div>
  );
}

type ProductCountPropsType = {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

function ProductCount({
  count,
  onIncrement,
  onDecrement,
}: ProductCountPropsType) {
  return (
    <div className="flex">
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={onDecrement}
        disabled={count <= 1}
        className="cursor-pointer"
      >
        <Minus />
      </Button>

      <Input
        type="text"
        value={count}
        className="aspect-square appearance-none rounded-none border-none font-medium md:text-base"
      />

      <Button
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

type StarRatingPropsType = {
  rate: number;
  count: number;
  max?: number;
};

function StarRating({ rate, count, max = 5 }: StarRatingPropsType) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-foreground mr-1 text-base">{rate.toFixed(1)}</span>

      {Array.from({ length: max }).map((_, index) => {
        const percent = Math.max(0, Math.min(1, rate - index)) * 100;

        return (
          <div key={index} className="relative size-5">
            {/* Empty Stars */}
            <div className="absolute inset-0 size-5">
              <Star
                className="text-foreground/50 h-full w-full"
                strokeWidth={1}
              />
            </div>

            {/* Yellow clipped fill */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${percent}%` }}
            >
              <Star className="size-5 text-yellow-500" fill="currentColor" />
            </div>
          </div>
        );
      })}
      <span className="ml-1 text-sm text-blue-400">
        ({formatNumberToK(count)})
      </span>
    </div>
  );
}
