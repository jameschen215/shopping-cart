/** --- /pages/products/index.tsx --- */

import type { ProductType } from "@/lib/types";
import { useLoaderData, useParams } from "react-router-dom";
import CategoryNavigation from "@/pages/products/components/CategoryNavigation";
import SearchForm from "@/pages/products/components/SearchForm";
import ProductCards from "@/pages/products/components/ProductCards";
import { useStayOnRoute } from "@/lib/hooks";
import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";
import { PRODUCTS_PAGE_CATEGORIES } from "@/lib/constants";

export default function ProductsPage() {
  const { category } = useParams();
  const { data } = useLoaderData() as { data: ProductType[] };

  let products = data.slice();

  if (category) {
    if (
      PRODUCTS_PAGE_CATEGORIES.map((c) => c.label).find(
        (c) => c === category,
      ) === undefined
    ) {
      throw new Error("Category not Found");
    }

    products = products.filter(
      (p) => p.category.slice(0, 2) === category.slice(0, 2),
    );
  }

  const stillOnProducts = useStayOnRoute("/products/*");

  if (stillOnProducts && category === "") return <ProductsSkeleton />;

  return (
    <>
      {/* Category Navigation and Search Bar */}
      <div className="flex w-full flex-col items-center justify-between gap-4 py-2 md:flex-row">
        <CategoryNavigation />
        <SearchForm />
      </div>

      {/* Cards */}
      <ProductCards products={products} />
    </>
  );
}
