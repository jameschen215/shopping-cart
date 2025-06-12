/** --- pages/product/index.tsx --- */

import { useLoaderData } from "react-router-dom";
import { ImageWrapper } from "@/components/product/ImageWrapper";
import { ProductDetails } from "@/components/product/ProductDetails";
import type { ProductType } from "@/lib/types";
import { useStayOnRoute } from "@/lib/hooks";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

export default function ProductPage() {
  const { product }: { product: ProductType } = useLoaderData();

  const stillOnProduct = useStayOnRoute("/product/*");

  if (stillOnProduct) {
    return <ProductSkeleton />;
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-10 py-10 md:flex-row">
      <ImageWrapper product={product} />

      <ProductDetails product={product} />
    </div>
  );
}
