/** --- /pages/products/index.tsx --- */

import type { ProductType } from "@/lib/types";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import CategoryNavigation from "@/pages/products/components/CategoryNavigation";
import SearchForm from "@/pages/products/components/SearchForm";
import LoadingPage from "@/components/loading-page";
import ProductCards from "@/pages/products/components/ProductCards";

export default function ProductsPage() {
  const { category } = useParams();
  const { data } = useLoaderData() as { data: ProductType[] };
  const navigation = useNavigation();

  console.log(data);

  let products = data.slice();

  if (category) {
    products = products.filter(
      (p) => p.category.slice(0, 2) === category.slice(0, 2),
    );
  }

  if (navigation.state === "loading" && category === "") {
    return <LoadingPage pageName="products" />;
  }

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
