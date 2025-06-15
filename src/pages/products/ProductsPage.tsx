/** --- /pages/products/index.tsx --- */

import type { ProductType } from "@/lib/types";
import { useLoaderData, useParams } from "react-router-dom";
import CategoryNavigation from "@/components/products/CategoryNavigation";
import SearchForm from "@/components/products/SearchForm";
import ProductCards from "@/components/products/ProductCards";
import { useStayOnRoute } from "@/lib/hooks";
import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";
import { PRODUCTS_PAGE_CATEGORIES } from "@/lib/constants";
import { useMemo } from "react";

export default function ProductsPage() {
  const { category } = useParams();
  const { data } = useLoaderData() as { data: ProductType[] };

  // Just practice it though the list is small
  const products = useMemo(() => {
    if (!category) return data.slice();

    const isValidCategory = PRODUCTS_PAGE_CATEGORIES.some(
      (c) => c.name === category,
    );

    if (!isValidCategory) throw new Error("Category not found");

    return data.filter((p) => p.category.slice(0, 2) === category.slice(0, 2));
  }, [category, data]);

  const isLoading = useStayOnRoute("/products/*");

  if (isLoading && category === "") return <ProductsSkeleton />;

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
