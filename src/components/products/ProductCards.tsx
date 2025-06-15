import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatCurrency } from "@/lib/utils";
import type { ProductType } from "@/lib/types";
import StarRating from "@/components/others/StarRating";

export default function ProductCards({
  products,
}: {
  products: ProductType[];
}) {
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <div className="mt-30 flex flex-1 justify-center text-xl">
        No item found.
      </div>
    );
  }

  return (
    <div className="my-6 grid w-full [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))] place-items-center gap-5">
      {products.map((product) => (
        <Card
          key={product.id}
          aria-label={`Card of Product ${product.id}`}
          role="button"
          tabIndex={0}
          onClick={() => navigate(`/products/${product.id}`)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
              navigate(`/products/${product.id}`);
            }
          }}
          className="cursor-pointer gap-6 rounded-sm border-none px-5 shadow-lg transition-transform duration-200 hover:scale-[1.02]"
        >
          <CardContent className="p-0">
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                aria-label={`Image of ${product.title}`}
                className="h-auto w-full object-cover dark:brightness-80 dark:contrast-120"
              />
            </div>
          </CardContent>

          <CardHeader className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                <span data-testid={`price-${product.id}`}>
                  {formatCurrency(product.price)}
                </span>
              </CardTitle>
              <StarRating
                rate={product.rating.rate}
                count={product.rating.count}
                justStar={true}
                className="size-3"
              />
            </div>
            <CardDescription className="line-clamp-1">
              {product.title}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
