import { NavLink, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { formatCurrency } from "@/lib/utils";
import type { ProductType } from "@/data/data-type";

export default function ProductCards({
  products,
}: {
  products: ProductType[];
}) {
  const navigate = useNavigate();

  return (
    <div className="my-6 grid w-full [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] place-items-center gap-5">
      {products.map((product) => (
        <NavLink to={`/product/${product.id}`} key={product.id}>
          <Card className="gap-4 rounded-sm px-5 shadow-md transition-transform duration-200 hover:scale-[1.02]">
            <CardContent className="p-0">
              <div className="flex aspect-square w-full items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            </CardContent>

            <CardHeader className="flex flex-col">
              <div className="flex items-center justify-between">
                <CardTitle>{formatCurrency(product.price)}</CardTitle>
                <CardAction>
                  <Button
                    onClick={() => {
                      console.log("clicked", product.title);
                      toast.success(`Item has been added to your cart.`, {
                        action: {
                          label: "Go to Cart",
                          onClick: () => navigate("/cart"),
                        },
                      });
                    }}
                    variant="ghost"
                    className="cursor-pointer rounded-full text-blue-600 hover:text-blue-600"
                  >
                    <Plus />
                  </Button>
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
