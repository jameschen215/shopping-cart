import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatCurrency } from "@/lib/utils";
import type { ProductType } from "@/lib/types";
import StarRating from "@/components/product/StarRating";

export default function ProductCards({
  products,
}: {
  products: ProductType[];
}) {
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
        <Link to={`/product/${product.id}`} key={product.id}>
          <Card className="gap-6 rounded-sm border-none px-5 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
            <CardContent className="p-0">
              <div className="flex aspect-square w-full items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="h-auto w-full object-cover dark:brightness-80 dark:contrast-120"
                />
              </div>
            </CardContent>

            <CardHeader className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {formatCurrency(product.price)}
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
        </Link>
      ))}
    </div>
  );
}
