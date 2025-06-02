import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import CategoryNavigation from "./CategoryNavigation";

import type { ProductType } from "@/data/data-type";
import ProductCards from "@/features/products/ProductCards";
import SearchForm from "@/features/products/SearchForm";
import Loading from "./Loading";

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
      {/* Category Navigation and Search Bar */}
      <div className="flex w-full flex-col items-center justify-between gap-4 py-2 md:flex-row">
        <CategoryNavigation />
        <SearchForm />
      </div>

      {/* Cards */}
      {navigation.state === "loading" ? (
        <Loading />
      ) : (
        <ProductCards products={products} />
      )}
    </>
  );
}
