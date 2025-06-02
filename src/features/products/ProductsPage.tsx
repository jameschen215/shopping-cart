import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import CategoryNavigation from "./CategoryNavigation";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import type { ProductType } from "@/data/data-type";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProductsPage() {
  const { category } = useParams();
  const { data } = useLoaderData() as { data: ProductType[] };
  const navigation = useNavigation();

  let products = data.slice();

  if (category) {
    products = products.filter(
      (p) => p.category.slice(0, 2) === category.slice(0, 2),
    );
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-4 py-2 md:flex-row">
        <CategoryNavigation />

        <SearchForm />
      </div>

      {navigation.state === "loading" ? (
        <div className="flex flex-1 items-center justify-center">
          Loading ...
        </div>
      ) : (
        <ProductCards products={products} />
      )}
    </>
  );
}

function ProductCards({ products }: { products: ProductType[] }) {
  const navigate = useNavigate();

  return (
    <div className="my-6 grid w-full [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] place-items-center gap-5">
      {products.map((product) => (
        <Card key={product.id} className="gap-4 rounded-sm px-5 shadow-md">
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
      ))}
    </div>
  );
}

function SearchForm() {
  return (
    <Form
      role="search"
      id="search-form"
      className="relative w-full max-w-3xl md:max-w-3xs"
    >
      <Input
        type="search"
        name="q"
        id="q"
        aria-label="Search products"
        placeholder="Search products"
        // value={query}
        // onChange={handleSearchChange}
        className="rounded-sm pl-7 text-sm font-normal"
      />

      <div className="absolute top-1/2 left-2 -translate-y-1/2">
        <Search className="text-muted-foreground size-4" />
      </div>

      <div
        id="search-spinner"
        aria-hidden="true"
        // hidden={!searching}
      />
      <div className="sr-only" aria-live="polite" />
    </Form>
  );
}
