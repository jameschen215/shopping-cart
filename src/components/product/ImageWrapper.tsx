import type { ProductType } from "@/lib/types";

export function ImageWrapper({ product }: { product: ProductType }) {
  return (
    <div className="flex max-h-[calc(100vh-300px)] flex-1 items-center justify-center">
      <div className="h-full w-[75%] md:w-1/2">
        <img
          src={product.image}
          alt={product.title || "Product image"}
          loading="lazy"
          className="h-full w-auto max-w-full object-cover"
        />
      </div>
    </div>
  );
}
