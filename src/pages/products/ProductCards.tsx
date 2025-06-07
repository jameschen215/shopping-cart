import { NavLink } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatCurrency } from "@/lib/utils";
import type { ProductType } from "@/data/data-type";

export default function ProductCards({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="my-6 grid w-full [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))] place-items-center gap-5">
      {products.map((product) => (
        <NavLink to={`/product/${product.id}`} key={product.id}>
          <Card className="gap-4 rounded-sm border-none px-5 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
            <CardContent className="p-0">
              <div className="flex aspect-square w-full items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-auto w-full object-cover dark:brightness-80 dark:contrast-120"
                />
              </div>
            </CardContent>

            <CardHeader className="flex flex-col">
              <div className="flex items-center justify-between">
                <CardTitle>{formatCurrency(product.price)}</CardTitle>
                <CardAction>
                  {/* <Button
                    variant="ghost"
                    className="cursor-pointer rounded-full text-blue-600 hover:text-blue-600"
                  >
                    <Plus />
                  </Button> */}
                </CardAction>
              </div>
              <CardDescription className="line-clamp-1">
                {product.title}
              </CardDescription>
            </CardHeader>
          </Card>
        </NavLink>
      ))}
    </div>
  );
}
