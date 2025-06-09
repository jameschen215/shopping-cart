import { useLoaderData } from "react-router-dom";
import { ImageWrapper } from "@/pages/product/components/ImageWrapper";
import { ProductDetails } from "@/pages/product/components/ProductDetails";
import type { ProductType } from "@/lib/types";

export default function ProductPage() {
  const { product }: { product: ProductType } = useLoaderData();

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-10 py-10 md:flex-row">
      <ImageWrapper product={product} />

      <ProductDetails product={product} />
    </div>
  );
}
