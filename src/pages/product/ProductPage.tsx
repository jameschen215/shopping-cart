/** --- pages/product/index.tsx --- */

import type { ProductLoaderData } from "@/lib/types";
import { useLoaderData } from "react-router-dom";
import { ImageWrapper } from "@/components/product/ImageWrapper";
import { ProductDetails } from "@/components/product/ProductDetails";
import { useStayOnRoute } from "@/lib/hooks";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

export default function ProductPage() {
  const { product } = useLoaderData() as ProductLoaderData;

  // Prevents flashing when route is reloaded
  const isLoading = useStayOnRoute("/product/*");

  if (isLoading) return <ProductSkeleton />;

  return (
    <div
      className="flex w-full flex-1 flex-col items-center gap-10 py-10 md:flex-row"
      date-testid="product-page"
    >
      <ImageWrapper product={product} />

      <ProductDetails product={product} />
    </div>
  );
}
